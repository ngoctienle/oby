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
  const [itemId, setItemId] = useState<string>('')

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

  const productInCart = productData && productData?.data

  const initializeData = useMemo(() => {
    if (cartData && productInCart) {
      return mergeArrayItems(cartData.items, productInCart)
    }
    return null
  }, [cartData, productInCart])

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
    } else {
      router.push('dat-hang')
    }
  }

  const handleShowModal = (itemId: string) => {
    setIsOpen(true)
    setItemId(itemId)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
    setItemId('')
  }

  return (
    <div className='@992:pt-7.5 pt-2 min-h-[50%]'>
      <div className='container'>
        {!initializeData || initializeData.length === 0 ? (
          <NoProduct />
        ) : (
          <>
            <div className='flex items-center max-w-[426px] justify-between mx-auto relative'>
              <div className='absolute w-[80%] h-[1px] top-[35%] left-1/2 -translate-x-1/2 -z-10 bg-oby-DFDFDF' />
              <div className='flex flex-col items-center @768:gap-1.5 gap-1'>
                <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-E4FBDB'>
                  <ShoppingBagIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-green' />
                </div>
                <p className='@768:fs-14 fs-12 text-oby-green font-semibold'>Giỏ hàng</p>
              </div>
              <div className='flex flex-col items-center gap-1.5'>
                <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-F6F7F8'>
                  <BanknotesIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-9A9898' />
                </div>
                <p className='@768:fs-14 fs-12 text-oby-9A9898'>Tiến hành đặt hàng</p>
              </div>
              <div className='flex flex-col items-center gap-1.5'>
                <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-F6F7F8'>
                  <CheckIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-9A9898' />
                </div>
                <p className='@768:fs-14 fs-12 text-oby-9A9898'>Hoàn thành</p>
              </div>
            </div>
            <div className='@992:mt-7.5 mt-4 grid grid-cols-12 @992:gap-10 gap-5'>
              <div className='@992:col-span-8 col-span-12'>
                {initializeData.map((item) => (
                  <div
                    className='@992:p-5 py-3.5 px-4 border border-oby-DFDFDF bg-white rounded-tl-4 rounded-br-4 first:mt-0 @992:mt-5 mt-3 flex @992:gap-5 gap-3.5'
                    key={item.item_id}
                  >
                    <div className='flex-shrink-0 relative w-[150px] h-[100px] bg-white rounded-tl-4 rounded-br-4 overflow-hidden'>
                      <OBYImage
                        src={generateProductImageFromMagento(item.custom_attributes)}
                        alt={item.name}
                        title={item.name}
                        display='responsive'
                        className='object-cover'
                      />
                    </div>
                    <div className='w-full'>
                      <h2 className='@992:fs-16 fs-14 @992:line-clamp-1 line-clamp-2'>{item.name}</h2>
                      <div className='flex items-center gap-2.5 my-2'>
                        {isHaveDiscount(item.custom_attributes) ? (
                          <>
                            <p className='@992:fs-16 fs-14 font-semibold'>{getDiscount(item.custom_attributes)}</p>
                            <p className='@992:fs-14 fs-12 line-through text-oby-676869'>
                              {getCost(item.custom_attributes)}
                            </p>
                          </>
                        ) : (
                          <p className='@992:fs-16 fs-14 font-semibold'>{formatCurrency(item.price)}</p>
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
                          onClick={() => handleShowModal(item.item_id.toString())}
                          type='button'
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {/* Delete Modal */}
                <Transition show={isOpen} as={Fragment}>
                  <Dialog as='div' className='relative z-10' onClose={() => handleCloseModal()}>
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
                              <p className='fs-16 text-center text-oby-676869'>Bạn có chắc chắn muốn xóa sản phẩm?</p>
                            </div>

                            <div className='flex items-center gap-3'>
                              <OBYButton
                                type='button'
                                className='rounded-4 border border-oby-DFDFDF py-2.5 fs-16 text-oby-676869 w-full'
                                onClick={() => handleCloseModal()}
                              >
                                Hủy bỏ
                              </OBYButton>
                              <OBYButton
                                type='button'
                                className='rounded-4 border border-transparent py-2.5 fs-16 text-white w-full bg-oby-primary'
                                onClick={() => handleRemove(itemId)}
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
                {/* End Delete Modal */}
              </div>
              <div className='@992:col-span-4 col-span-12 bg-transparent'>
                <div className=' bg-white rounded-tl-4 rounded-br-4 bsd'>
                  <div className='@992:pt-5 pt-4 @992:pb-4 pb-3 border-b border-b-oby-DFDFDF'>
                    <div className='flex items-center gap-7.5 @992:px-6 px-4'>
                      <p className='@992:fs-16 fs-14 font-semibold'>Mã giảm giá</p>
                      <OBYButton
                        onClick={() => setIsPromoOpen(true)}
                        className='rounded-4 border border-oby-DFDFDF flex items-center py-2 px-3 flex-grow'
                      >
                        <div className='flex-grow'>
                          <p className='fs-14 text-oby-9A9898 text-left'>Chọn hoặc nhập mã</p>
                        </div>
                        <ChevronRightIcon className='w-6 h-6 text-oby-676869 justify-end' />
                      </OBYButton>
                      {/* Promo Modal */}
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
                      {/* End Promo Modal */}
                    </div>
                  </div>
                  <div className='@992:mt-4 mt-3 @992:px-6 px-4 @992:pb-5 pb-4'>
                    <p className='@992:fs-18 fs-16 mb-4 font-bold text-oby-primary'>Tổng giỏ hàng</p>
                    <div className='flex items-center justify-between'>
                      <p className='@992:fs-16 fs-14'>Tạm tính ({initializeData.length})</p>
                      <p className='@992:fs-16 fs-14 text-end'>{calculateTotalOriginPrice(initializeData)}</p>
                    </div>
                    {calculateTotalDiscountPrice(initializeData) && (
                      <div className='flex items-center justify-between mt-3'>
                        <p className='@992:fs-16 fs-14'>Giảm giá sản phẩm</p>
                        <p className='@992:fs-16 fs-14 text-end text-oby-orange'>
                          {calculateTotalDiscountPrice(initializeData)}
                        </p>
                      </div>
                    )}
                    <div className='mt-3 pt-3 border-t border-t-oby-DFDFDF'>
                      <div className='flex justify-between'>
                        <div className='flex flex-col'>
                          <p className='@992:fs-16 fs-14 font-semibold'>Thành tiền</p>
                          <p className='@992:fs-14 fs-12 text-oby-9A9898'>(Đã bao gồm VAT)</p>
                        </div>
                        <p className='@992:fs-18 fs-16 font-semibold'>{calculateTotalPrice(initializeData)}</p>
                      </div>
                    </div>
                    <OBYButton
                      className='@992:mt-5 mt-3 bg-oby-primary text-white w-full py-2.5 rounded-4'
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
