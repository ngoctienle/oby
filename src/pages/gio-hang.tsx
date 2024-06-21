import { Dialog, Transition } from '@headlessui/react'
import { ArrowPathIcon, BanknotesIcon, CheckIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { Fragment, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { CartUpdateRequest } from '@/@types/cart.type'
import { ResponseError } from '@/@types/magento.type'

import { AnotherForm, ErrorMagento, anotherForm } from '@/libs/rules'
import { generateMetaSEO } from '@/libs/seo'
import { useGlobalState } from '@/libs/state'
import { cn } from '@/libs/utils'

import { formatCurrency, mergeArrayItems } from '@/helpers'
import { isAxiosError } from '@/helpers/auth'
import { calculateTotalDiscountPrice, calculateTotalOriginPrice, calculateTotalPrice } from '@/helpers/cart'
import {
  generateProductImageFromMagento,
  getCost,
  getDiscount,
  getSKUListProductAsString,
  getTotalQuantity,
  isHaveDiscount
} from '@/helpers/product'

import cartApi from '@/apis/magento/cart.api'
import productApi from '@/apis/magento/product.api'

import { MAX_PRODUCT, cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import Input from '@/components/Input'
import NoProduct from '@/components/NoProduct'
import QuantityController from '@/components/QuantityController'
import { AsyncButton } from '@/components/UI/Button'
import { OBYButton, OBYImage } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

type PromotionForm = Pick<AnotherForm, 'coupon'>
const promotionForm = anotherForm.pick(['coupon'])

export default function CartPage() {
  const [guestCartId] = useGlobalState('guestCartId')
  const [token] = useGlobalState('token')
  const [cartId] = useGlobalState('cartId')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPromoOpen, setIsPromoOpen] = useState<boolean>(false)
  const [itemId, setItemId] = useState<string>('')
  const [itemName, setItemName] = useState<string>('')

  const [isRouting, setIsRouting] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PromotionForm>({
    resolver: yupResolver(promotionForm)
  })

  const router = useRouter()

  /* Fetch CartData Guest - Mine */
  const { data: guestData, refetch: guestRefetch } = useQuery({
    queryKey: ['guestCart', guestCartId],
    queryFn: () => cartApi.GetGuestCart(guestCartId || ''),
    enabled: !token,
    keepPreviousData: true,
    staleTime: cacheTime.fiveMinutes
  })
  const { data: mineData, refetch: mineRefetch } = useQuery({
    queryKey: ['cartId', cartId],
    queryFn: () => cartApi.GetCart(token || ''),
    enabled: !!token && !!cartId,
    keepPreviousData: true,
    staleTime: cacheTime.fiveMinutes
  })

  /* Wrap cartData */
  const cartData = useMemo(() => {
    if (!token) {
      return guestData?.data
    }
    return mineData?.data
  }, [guestData?.data, mineData?.data, token])

  /* Fetch Product UI and Generate New Product Array */
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
  const initializeData = useMemo(() => {
    const productInCart = productData && productData?.data

    if (cartData && productInCart) {
      return mergeArrayItems(cartData.items, productInCart)
    }
    return null
  }, [cartData, productData])

  /* Get Coupons List */
  const { data: couponRes } = useQuery({
    queryKey: ['coupons'],
    queryFn: () => cartApi.GetListCoupons(),
    staleTime: cacheTime.halfHours
  })
  const couponList = useMemo(() => {
    return couponRes && couponRes.data.items
  }, [couponRes])

  /* Get List Rule Detail Coupon */
  const couponDetails = useQueries({
    queries:
      couponList?.map((coupon) => {
        return {
          queryKey: ['rules', coupon.rule_id],
          queryFn: () => cartApi.GetRulesCoupon(coupon.rule_id),
          enabled: Boolean(couponList)
        }
      }) || []
  })
  const ruleList = useMemo(() => {
    return couponDetails.map((item) => item.data?.data)
  }, [couponDetails])

  /* Get Cart Total Guest-Mine */
  const { data: totalRes, refetch: guestTotalRefetch } = useQuery({
    queryKey: ['totals', cartData],
    queryFn: () => cartApi.GetCartTotals(guestCartId as string),
    staleTime: cacheTime.fiveMinutes,
    enabled: Boolean(!token)
  })
  const { data: totalMineRes, refetch: mineTotalRefetch } = useQuery({
    queryKey: ['totalsMine', cartData],
    queryFn: () => cartApi.GetCartMineTotal(token as string),
    staleTime: cacheTime.fiveMinutes,
    enabled: Boolean(token)
  })

  /* Wrap Total Guest-Mine */
  const totalData = useMemo(() => {
    if (!token) {
      return totalRes?.data
    }
    return totalMineRes?.data
  }, [token, totalMineRes?.data, totalRes?.data])

  /* Apply Promotion Mutation */
  const applyGuestMutation = useMutation({
    mutationFn: (code: string) => cartApi.ApplyCoupon(guestCartId as string, code)
  })
  const applyMineMutation = useMutation({
    mutationFn: (code: string) => cartApi.ApplyCouponMine(token as string, code)
  })

  /* Update Cart API */
  const updateCartMutation = useMutation({
    mutationFn: ({ itemId, body }: { itemId: string; body: CartUpdateRequest }) =>
      cartApi.UpdateGuestCart(guestCartId as string, itemId, body),
    onSuccess: () => {
      guestRefetch()
    },
    onError: () => {
      toast.error('Vui lòng thử lại!')
    }
  })
  const updateMineCartMutation = useMutation({
    mutationFn: ({ itemId, body }: { itemId: string; body: CartUpdateRequest }) =>
      cartApi.UpdateMineCart(token as string, itemId, body),
    onSuccess: () => {
      mineRefetch()
    },
    onError: () => {
      toast.error('Vui lòng thử lại!')
    }
  })

  /* Delete Cart API */
  const deleteProductMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.DeleteProductInCart(guestCartId as string, itemId),
    onSuccess: () => {
      guestRefetch()
      setIsOpen(false)
      toast.success('Xóa sản phẩm thành công!')
    }
  })
  const deleteProductMineMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.DeleteProductInMineCart(token as string, itemId),
    onSuccess: () => {
      mineRefetch()
      setIsOpen(false)
      toast.success('Xóa sản phẩm thành công!')
    }
  })

  /* Handle Quantity (+/-) & Delete */
  const handleQuantity = (itemId: string, value: number, isValid: boolean) => {
    if (isValid) {
      const cartRequest: CartUpdateRequest = {
        cartItem: {
          qty: value
        }
      }
      if (!token) {
        updateCartMutation.mutateAsync({ itemId: itemId, body: cartRequest })
      } else {
        updateMineCartMutation.mutateAsync({ itemId: itemId, body: cartRequest })
      }
    }
  }
  const handleTypeQuantity = (itemId: string) => (value: number) => {
    const cartRequest: CartUpdateRequest = {
      cartItem: {
        qty: value
      }
    }
    if (!token) {
      updateCartMutation.mutate({ itemId: itemId, body: cartRequest })
    } else {
      updateMineCartMutation.mutateAsync({ itemId: itemId, body: cartRequest })
    }
  }
  const handleRemove = (itemId: string) => {
    if (!token) {
      deleteProductMutation.mutate(itemId)
    } else {
      deleteProductMineMutation.mutate(itemId)
    }
  }
  const handleShowModal = (itemId: string, itemName: string) => {
    setIsOpen(true)
    setItemId(itemId)
    setItemName(itemName)
  }
  const handleCloseModal = () => {
    setItemId('')
    setItemName('')
    setIsOpen(false)
  }

  /* Handle Validate Promotion Form */
  const onSubmitPromotion = handleSubmit((data) => {
    const code = data.coupon
    if (!token) {
      applyGuestMutation.mutate(code, {
        onSuccess: () => {
          guestTotalRefetch()
          setIsPromoOpen(false)
        },
        onError: (error) => {
          if (isAxiosError<ResponseError>(error)) {
            const formError = error.response?.data
            if (formError?.message === ErrorMagento.failCoupon) {
              setError('coupon', {
                message: 'Đơn hàng của bạn không thể dùng mã này. Vui lòng kiểm tra lại điều kiện áp dụng'
              })
            }
          } else {
            toast.error('Có lỗi xảy ra! Vui lòng thử lại.')
          }
          guestTotalRefetch()
        }
      })
    } else {
      applyMineMutation.mutate(code, {
        onSuccess: () => {
          mineTotalRefetch()
          setIsPromoOpen(false)
        },
        onError: (error) => {
          if (isAxiosError<ResponseError>(error)) {
            const formError = error.response?.data
            if (formError?.message === ErrorMagento.failCoupon) {
              setError('coupon', {
                message: 'Đơn hàng của bạn không thể dùng mã này. Vui lòng kiểm tra lại điều kiện áp dụng'
              })
            } else {
              setError('coupon', {
                message: 'Điều kiện áp dụng không đúng!'
              })
            }
          } else {
            toast.error('Có lỗi xảy ra! Vui lòng thử lại.')
          }
          mineTotalRefetch()
        }
      })
    }
  })

  /* Next Step Order Condition */
  const handleContinue = () => {
    setIsRouting(true)
    router.push(hrefPath.purchase)
  }

  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Giỏ Hàng',
    description:
      'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, AGRIAMAZING, ongbayeu.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/gio-hang'
  })

  return (
    <>
      <OBYSeo {...meta} />
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
                      className='@992:p-5 py-3.5 px-4 relative border border-oby-DFDFDF bg-white rounded-tl-4 rounded-br-4 first:mt-0 @992:mt-5 mt-3 flex @992:gap-5 gap-3.5'
                      key={item.item_id}
                    >
                      <div className='flex-shrink-0 relative @768:w-[150px] @768:h-[100px] w-[95px] h-[82px] bg-white rounded-tl-4 rounded-br-4 overflow-hidden'>
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
                            onIncrease={(value) => handleQuantity(item.item_id.toString(), value, value <= MAX_PRODUCT)}
                            onDecrease={(value) => handleQuantity(item.item_id.toString(), value, value >= 1)}
                            onTyping={handleTypeQuantity(item.item_id.toString())}
                            value={item.qty}
                            max={MAX_PRODUCT}
                            isLoading={updateCartMutation.isLoading || updateMineCartMutation.isLoading}
                          />
                          <p className='fs-16 @576:block hidden'>
                            Số tiền: <span className='font-semibold'>{formatCurrency(item.price * item.qty)}</span>
                          </p>
                        </div>
                      </div>
                      <OBYImage
                        src='/images/x-delete.png'
                        className='cursor-pointer absolute -top-2.25 -right-2.25'
                        width={18}
                        height={18}
                        alt='Xóa sản phẩm'
                        onClick={() => handleShowModal(item.item_id.toString(), item.name)}
                      />
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
                                <p className='fs-16 text-center text-oby-676869'>
                                  Bạn có chắc chắn muốn xóa sản phẩm {itemName}?
                                </p>
                              </div>

                              <div className='flex items-center gap-3'>
                                <OBYButton type='button' className='fs-16 w-full' onClick={() => handleCloseModal()}>
                                  Hủy bỏ
                                </OBYButton>
                                <AsyncButton
                                  variant='outline'
                                  type='button'
                                  className='fs-16 text-oby-676869 w-full'
                                  onClick={() => handleRemove(itemId)}
                                  isLoading={deleteProductMutation.isLoading || deleteProductMineMutation.isLoading}
                                >
                                  Đồng ý
                                  {deleteProductMutation.isLoading && (
                                    <ArrowPathIcon className='text-oby-676869 ml-1.5 @992:h-6 @992:w-6 h-5 w-5 animate-spin' />
                                  )}
                                  {deleteProductMineMutation.isLoading && (
                                    <ArrowPathIcon className='text-oby-676869 ml-1.5 @992:h-6 @992:w-6 h-5 w-5 animate-spin' />
                                  )}
                                </AsyncButton>
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
                          variant='outline'
                          className='justify-start h-[38px] px-3 flex-grow'
                        >
                          {totalData && totalData.coupon_code ? (
                            <p className='fs-14 bg-oby-orange text-white px-1.5 py-1.25 rounded-2'>
                              {totalData.coupon_code}
                            </p>
                          ) : (
                            <p className='fs-14 text-oby-9A9898 text-left'>Chọn hoặc nhập mã</p>
                          )}
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
                                    <OBYButton
                                      variant='ghost'
                                      asChild
                                      size='ghost'
                                      onClick={() => setIsPromoOpen(false)}
                                      className={cn('text-oby-676869 absolute top-7.5 right-6')}
                                    >
                                      <XMarkIcon className='w-6 h-6 cursor-pointer' />
                                    </OBYButton>
                                    <form
                                      className='flex items-start gap-3 my-6'
                                      onSubmit={onSubmitPromotion}
                                      noValidate
                                    >
                                      <div className='flex-grow @768:max-w-[294px] max-w-[211px]'>
                                        <Input
                                          type='text'
                                          name='coupon'
                                          placeholder='Nhập mã giảm giá'
                                          register={register}
                                          defaultValue={totalRes?.data.coupon_code}
                                          errorMessage={errors.coupon?.message}
                                        />
                                      </div>
                                      <AsyncButton
                                        type='submit'
                                        isLoading={applyGuestMutation.isLoading || applyMineMutation.isLoading}
                                        disabled={!couponList || couponList.length === 0}
                                        className='flex-grow max-h-[42px]'
                                      >
                                        Áp dụng
                                      </AsyncButton>
                                    </form>
                                    {!couponList || couponList.length === 0 ? (
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
                                    ) : (
                                      <>
                                        <p className='fs-16 mb-4'>Mã giảm giá của bạn</p>
                                        {couponList.flatMap((coupon) => {
                                          return ruleList.map((rule) => {
                                            if (coupon.rule_id === rule?.rule_id) {
                                              return (
                                                <div
                                                  className='px-4 py-3.5 space-y-2 rounded-4 border border-oby-DFDFDF first:mt-0 mt-4'
                                                  key={coupon.coupon_id}
                                                >
                                                  <p className='font-semibold fs-16 text-oby-green'>{rule.name}</p>
                                                  <p className='fs-16'>
                                                    Code: <span className='text-oby-primary'>{coupon.code}</span>
                                                  </p>
                                                  <p className='fs-16 text-oby-9A9898'>
                                                    HSD: {dayjs(rule.to_date).format('DD/MM/YYYY')}
                                                  </p>
                                                </div>
                                              )
                                            } else {
                                              return null
                                            }
                                          })
                                        })}
                                      </>
                                    )}
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
                      <p className='@992:fs-18 fs-16 mb-4 font-bold text-oby-green'>Tổng giỏ hàng</p>
                      <div className='flex items-center justify-between'>
                        <p className='@992:fs-16 fs-14'>Tạm tính ({getTotalQuantity(initializeData)})</p>
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
                      {totalData && totalData.discount_amount !== 0 && (
                        <div className='flex items-center justify-between mt-3'>
                          <p className='@992:fs-16 fs-14'>Giảm giá voucher</p>
                          <p className='@992:fs-16 fs-14 text-end text-oby-orange'>
                            {formatCurrency(totalData.discount_amount)}
                          </p>
                        </div>
                      )}
                      <div className='mt-3 pt-3 border-t border-t-oby-DFDFDF'>
                        <div className='flex justify-between'>
                          <div className='flex flex-col'>
                            <p className='@992:fs-16 fs-14 font-semibold'>Thành tiền</p>
                            <p className='@992:fs-14 fs-12 text-oby-9A9898'>(Đã bao gồm VAT)</p>
                          </div>
                          <p className='@992:fs-18 fs-16 font-semibold'>
                            {!totalData
                              ? calculateTotalPrice(initializeData)
                              : formatCurrency(totalData.subtotal_with_discount)}
                          </p>
                        </div>
                      </div>
                      <OBYButton className='@992:mt-5 mt-3 w-full' onClick={handleContinue} disabled={isRouting}>
                        {isRouting ? <Loader2 className='w-5 h-5 animate-spin' /> : <>Tiếp tục</>}
                      </OBYButton>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
