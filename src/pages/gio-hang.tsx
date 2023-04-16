import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  BanknotesIcon,
  CheckIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Fragment, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { CartUpdateRequest } from '@/@types/cart.type'

import { useGlobalState } from '@/libs/state'

import { formatCurrency, mergeArrayItems } from '@/helpers'
import { calculateTotalDiscountPrice, calculateTotalOriginPrice, calculateTotalPrice } from '@/helpers/cart'
import {
  generateProductImageFromMagento,
  getCost,
  getDiscount,
  getSKUListProductAsString,
  isHaveDiscount
} from '@/helpers/product'

import cartApi from '@/apis/cart.api'
import productApi from '@/apis/product.api'

import { cacheTime } from '@/constants/config.constant'

import NoProduct from '@/components/NoProduct'
import QuantityController from '@/components/QuantityController'
import { OBYButton, OBYImage } from '@/components/UI/Element'

export default function CartPage() {
  const [guestCartId] = useGlobalState('guestCartId')
  const [user] = useGlobalState('user')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPromoOpen, setIsPromoOpen] = useState<boolean>(false)

  const router = useRouter()

  const { data: guestData, refetch } = useQuery({
    queryKey: ['guestCart', guestCartId],
    queryFn: () => cartApi.GetGuestCart(guestCartId || ''),
    enabled: !!guestCartId,
    staleTime: cacheTime.halfHours
  })

  const cartData = guestData && guestData?.data
  const listSKU = useMemo(() => {
    if (cartData) {
      return getSKUListProductAsString(cartData.items)
    }
  }, [cartData])

  const { data: productData } = useQuery({
    queryKey: ['productInCart'],
    queryFn: () => productApi.GetListProductByListSKU(listSKU as string),
    enabled: !!listSKU,
    staleTime: cacheTime.halfHours
  })

  const updateCartMutation = useMutation({
    mutationFn: ({ itemId, body }: { itemId: string; body: CartUpdateRequest }) =>
      cartApi.UpdateGuestCart(guestCartId as string, itemId, body),
    onSuccess: () => {
      refetch()
    },
    onError: () => {
      toast.error('Vui lòng thử lại!')
    }
  })

  const deleteProductMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.DeleteProductInCart(guestCartId as string, itemId),
    onSuccess: () => {
      refetch()
      setIsOpen(false)
      toast.success('Xóa sản phẩm thành công!')
    }
  })

  const productInCart = productData && productData?.data

  const initializeData = useMemo(() => {
    if (cartData && productInCart) {
      return mergeArrayItems(cartData.items, productInCart)
    }
    return null
  }, [cartData, productInCart])

  const handleQuantity = (itemId: string, value: number, isValid: boolean) => {
    if (isValid) {
      const cartRequest: CartUpdateRequest = {
        cartItem: {
          qty: value
        }
      }
      updateCartMutation.mutateAsync({ itemId: itemId, body: cartRequest })
    }
  }
  const handleTypeQuantity = (itemId: string) => (value: number) => {
    const cartRequest: CartUpdateRequest = {
      cartItem: {
        qty: value
      }
    }
    updateCartMutation.mutate({ itemId: itemId, body: cartRequest })
  }
  const handleRemove = (itemId: string) => {
    deleteProductMutation.mutate(itemId)
  }

  const handleContinue = () => {
    if (!user) {
      router.push('dang-nhap')
    }
  }

  return (
    <div className='pt-7.5 min-h-[50%]'>
      <div className='container'>
        {!initializeData || initializeData.length === 0 ? (
          <NoProduct />
        ) : (
          <>
            <div className='flex items-center max-w-[426px] justify-between mx-auto relative'>
              <div className='absolute w-[80%] h-[1px] top-[35%] left-1/2 -translate-x-1/2 -z-10 bg-oby-DFDFDF' />
              <div className='flex flex-col items-center gap-1.5'>
                <div className='w-[56px] flex items-center justify-center h-[56px] rounded-full bg-oby-E4FBDB'>
                  <ShoppingBagIcon className='w-8 h-8 text-oby-green' />
                </div>
                <p className='fs-14 text-oby-green font-semibold'>Giỏ hàng</p>
              </div>
              <div className='flex flex-col items-center gap-1.5'>
                <div className='w-[56px] flex items-center justify-center h-[56px] rounded-full bg-oby-F6F7F8'>
                  <BanknotesIcon className='w-8 h-8 text-oby-9A9898' />
                </div>
                <p className='fs-14 text-oby-9A9898'>Tiến hành đặt hàng</p>
              </div>
              <div className='flex flex-col items-center gap-1.5'>
                <div className='w-[56px] flex items-center justify-center h-[56px] rounded-full bg-oby-F6F7F8'>
                  <CheckIcon className='w-8 h-8 text-oby-9A9898' />
                </div>
                <p className='fs-14 text-oby-9A9898'>Hoàn thành</p>
              </div>
            </div>
            <div className='mt-7.5 grid grid-cols-12 gap-10'>
              <div className='col-span-8'>
                {initializeData.map((item) => (
                  <div
                    className='p-5 border border-oby-DFDFDF bg-white rounded-tl-4 rounded-br-4 first:mt-0 mt-5 flex gap-5'
                    key={item.item_id}
                  >
                    <div className='flex-shrink relative w-[150px] h-[100px] bg-white rounded-tl-4 rounded-br-4 overflow-hidden'>
                      <OBYImage
                        src={generateProductImageFromMagento(item.custom_attributes)}
                        alt={item.name}
                        title={item.name}
                        display='responsive'
                        className='object-cover'
                      />
                    </div>
                    <div className='flex-grow'>
                      <h2 className='fs-16 line-clamp-1'>{item.name}</h2>
                      <div className='flex items-center gap-2.5 my-2'>
                        {isHaveDiscount(item.custom_attributes) ? (
                          <>
                            <p className='fs-16 font-semibold'>{getDiscount(item.custom_attributes)}</p>
                            <p className='fs-14 line-through text-oby-676869'>{getCost(item.custom_attributes)}</p>
                          </>
                        ) : (
                          <p className='fs-16 font-semibold'>{formatCurrency(item.price)}</p>
                        )}
                      </div>
                      <div className='flex items-center justify-between'>
                        <QuantityController
                          classNameWrapper='max-w-max px-1.5 py-1.75'
                          onIncrease={(value) => handleQuantity(item.item_id.toString(), value, value <= 10000)}
                          onDecrease={(value) => handleQuantity(item.item_id.toString(), value, value >= 1)}
                          onTyping={handleTypeQuantity(item.item_id.toString())}
                          value={item.qty}
                          max={10000}
                        />
                        <TrashIcon
                          className='text-oby-9A9898 w-6 h-6 cursor-pointer'
                          onClick={() => setIsOpen(true)}
                          type='button'
                        />
                      </div>
                    </div>
                    <Transition show={isOpen} as={Fragment}>
                      <Dialog as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <div className='fixed inset-0 bg-black/30' />
                        </Transition.Child>

                        <div className='fixed inset-0 overflow-y-auto'>
                          <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                              as={Fragment}
                              enter='ease-out duration-300'
                              enterFrom='opacity-0 scale-95'
                              enterTo='opacity-100 scale-100'
                              leave='ease-in duration-200'
                              leaveFrom='opacity-100 scale-100'
                              leaveTo='opacity-0 scale-95'
                            >
                              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2.5 bg-white px-6 py-7.5 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title as='h3' className='fs-18 font-semibold text-center'>
                                  Xác nhận xóa sản phẩm
                                </Dialog.Title>
                                <div className='my-6'>
                                  <p className='fs-16 text-center text-oby-676869'>
                                    Bạn có chắc chắn muốn xóa sản phẩm?
                                  </p>
                                </div>

                                <div className='flex items-center gap-3'>
                                  <OBYButton
                                    type='button'
                                    className='rounded-4 border border-oby-DFDFDF py-2.5 fs-16 text-oby-676869 w-full'
                                    onClick={() => setIsOpen(false)}
                                  >
                                    Hủy bỏ
                                  </OBYButton>
                                  <OBYButton
                                    type='button'
                                    className='rounded-4 border border-transparent py-2.5 fs-16 text-white w-full bg-oby-primary'
                                    onClick={() => handleRemove(item.item_id.toString())}
                                    disabled={deleteProductMutation.isLoading}
                                  >
                                    Đồng ý
                                    {deleteProductMutation.isLoading && (
                                      <ArrowPathIcon className='text-white ml-1.5 @992:h-6 @992:w-6 h-5 w-5 animate-spin' />
                                    )}
                                  </OBYButton>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </div>
                ))}
              </div>
              <div className='col-span-4 bg-transparent'>
                <div className=' bg-white rounded-tl-4 rounded-br-4 bsd'>
                  <div className='pt-5 pb-4 border-b border-b-oby-DFDFDF'>
                    <div className='flex items-center gap-7.5 px-6'>
                      <p className='fs-16 font-semibold'>Mã giảm giá</p>
                      <OBYButton
                        onClick={() => setIsPromoOpen(true)}
                        className='rounded-4 border border-oby-DFDFDF flex items-center py-2 px-3 flex-grow'
                      >
                        <div className='flex-grow'>
                          <p className='fs-14 text-oby-9A9898'>Chọn hoặc nhập mã</p>
                        </div>
                        <ChevronRightIcon className='w-6 h-6 text-oby-676869 justify-end' />
                      </OBYButton>
                      <Transition show={isPromoOpen} as={Fragment}>
                        <Dialog as='div' className='relative z-10' onClose={() => setIsPromoOpen(false)}>
                          <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <div className='fixed inset-0 bg-black/30' />
                          </Transition.Child>

                          <div className='fixed inset-0 overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4 text-center'>
                              <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                              >
                                <Dialog.Panel className='w-full relative max-w-md transform overflow-hidden rounded-2.5 bg-white px-6 py-7.5 text-left align-middle shadow-xl transition-all'>
                                  <Dialog.Title as='h3' className='fs-18 font-semibold text-center'>
                                    Chọn mã giảm giá
                                  </Dialog.Title>
                                  <XMarkIcon
                                    className='w-6 h-6 text-oby-676869 absolute top-7.5 right-6 cursor-pointer'
                                    type='button'
                                    onClick={() => setIsPromoOpen(false)}
                                  />
                                  <div className='mt-6 flex flex-col items-center'>
                                    <div className='relative w-[80px] h-[80px] mb-5'>
                                      <OBYImage
                                        src='/images/no-product-incart.png'
                                        display='responsive'
                                        alt='Hiện tại bạn chưa có mã giảm giá'
                                        title='Hiện tại bạn chưa có mã giảm giá'
                                        className='object-cover'
                                      />
                                    </div>
                                    <p className='fs-16 text-oby-676869'>Hiện tại bạn chưa có mã giảm giá</p>
                                  </div>
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </Dialog>
                      </Transition>
                    </div>
                  </div>
                  <div className='mt-4 px-6 pb-5'>
                    <p className='fs-18 mb-4 font-bold text-oby-primary'>Tổng giỏ hàng</p>
                    <div className='flex items-center justify-between'>
                      <p className='fs-16'>Tạm tính ({initializeData.length})</p>
                      <p className='fs-16 text-end'>{calculateTotalOriginPrice(initializeData)}</p>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                      <p className='fs-16'>Giảm giá sản phẩm</p>
                      <p className='fs-16 text-end text-oby-orange'>{calculateTotalDiscountPrice(initializeData)}</p>
                    </div>
                    <div className='mt-3 pt-3 border-t border-t-oby-DFDFDF'>
                      <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <p className='fs-16 font-semibold'>Thành tiền</p>
                          <p className='fs-14 text-oby-9A9898'>(Đã bao gồm VAT)</p>
                        </div>
                        <p className='fs-18 font-semibold'>{calculateTotalPrice(initializeData)}</p>
                      </div>
                    </div>
                    <OBYButton
                      className='mt-5 bg-oby-primary text-white w-full py-2.5 rounded-4'
                      onClick={handleContinue}
                    >
                      Tiếp tục
                    </OBYButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
