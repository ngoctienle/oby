import { RadioGroup } from '@headlessui/react'
import { BanknotesIcon, CheckIcon, ChevronRightIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'

import { ItemInCart } from '@/@types/cart.type'
import { IPayment, IPaymentElement } from '@/@types/payment.type'

import twclsx from '@/libs/twclsx'

import { formatCurrency, mergeArrayItems } from '@/helpers'
import { calculateTotalDiscountPrice, calculateTotalOriginPrice, calculateTotalPrice } from '@/helpers/cart'
import {
  generateProductImageFromMagento,
  getCost,
  getDiscount,
  getSKUListProductAsString,
  isHaveDiscount
} from '@/helpers/product'

import cartApi from '@/apis/magento/cart.api'
import paymentApi from '@/apis/magento/payment.api'
import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

import { OBYButton, OBYImage } from '@/components/UI/Element'

interface IOrderPage {
  cartItem: ItemInCart[]
  listSKU: string
  paymentMethod: IPayment
}

export default function OrderPage({ cartItem, listSKU, paymentMethod }: IOrderPage) {
  const [selected, setSelected] = useState<IPaymentElement | boolean>(false)

  const { data: productData } = useQuery({
    queryKey: ['productInCart'],
    queryFn: () => productApi.GetListProductByListSKU(listSKU),
    staleTime: cacheTime.halfHours
  })

  const initializeData = useMemo(() => {
    const productInCart = productData && productData.data

    if (productInCart) {
      return mergeArrayItems(cartItem, productInCart)
    }

    return null
  }, [cartItem, productData])

  return (
    <div className='@992:pt-7.5 pt-2 min-h-[50%]'>
      <div className='container'>
        {/* Processing */}
        <div className='flex items-center max-w-[426px] justify-between mx-auto relative'>
          <div className='absolute w-[80%] h-[1px] top-[35%] left-1/2 -translate-x-1/2 -z-10 bg-oby-DFDFDF' />
          <div className='absolute w-[40%] h-[1px] top-[35%] left-7 -z-9 bg-oby-primary' />
          <div className='flex flex-col items-center @768:gap-1.5 gap-1 relative z-1'>
            <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-E4FBDB'>
              <ShoppingBagIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-green' />
            </div>
            <p className='@768:fs-14 fs-12 text-oby-green font-semibold'>Giỏ hàng</p>
          </div>
          <div className='flex flex-col items-center gap-1.5 relative z-1'>
            <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-E4FBDB'>
              <BanknotesIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-green' />
            </div>
            <p className='@768:fs-14 fs-12 text-oby-green font-semibold'>Tiến hành đặt hàng</p>
          </div>
          <div className='flex flex-col items-center gap-1.5 relative z-1'>
            <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-F6F7F8'>
              <CheckIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-9A9898' />
            </div>
            <p className='@768:fs-14 fs-12 text-oby-9A9898'>Hoàn thành</p>
          </div>
        </div>

        {/* Content */}
        <div className='@992:mt-7.5 mt-4 grid grid-cols-12 @992:gap-10 gap-5'>
          <div className='@992:col-span-8 col-span-12'>
            <div className='border border-oby-DFDFDF rounded-2.5 bg-white p-4'>
              <div className='flex items-center justify-between pb-3.5 border-b border-b-oby-DFDFDF mb-3.5'>
                <p className='fs-18 font-bold text-oby-green'>Thông tin giao hàng</p>
                <OBYButton>
                  <span className='fs-16 text-oby-primary'>Thay đổi</span>
                  <ChevronRightIcon className='text-oby-primary w-5 h-5' />
                </OBYButton>
              </div>
              <p className='fs-16 text-oby-9A9898'>Vui lòng nhập thông tin giao hàng để tiếp tục</p>
            </div>
            <div className='border border-oby-DFDFDF rounded-2.5 bg-white p-4 mt-5'>
              <div className='flex items-center justify-between pb-3.5 border-b border-b-oby-DFDFDF mb-3.5'>
                <p className='fs-18 font-bold text-oby-green'>Phương thức vận chuyển</p>
                <OBYButton>
                  <span className='fs-16 text-oby-primary'>Thay đổi</span>
                  <ChevronRightIcon className='text-oby-primary w-5 h-5' />
                </OBYButton>
              </div>
              <p className='fs-16 text-oby-9A9898'>
                Vui lòng chọn Thông tin giao hàng để xem danh sách phương thức vận chuyển
              </p>
            </div>
            <div className='mt-5'>
              {initializeData &&
                initializeData.map((item) => (
                  <div
                    className='@992:p-5 py-3.5 px-4 border border-oby-DFDFDF bg-white rounded-tl-4 rounded-br-4 first:mt-0 @992:mt-4 mt-3 flex @992:gap-5 gap-3.5'
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
                      <div className='flex items-center gap-2.5 mt-2'>
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
                      <div className='flex items-center justify-between mt-5'>
                        <p className='fs-16 text-oby-primary'>x {item.qty}</p>
                        <p className='fs-16'>
                          Số tiền: <span className='font-semibold'>{formatCurrency(item.price * item.qty)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='@992:col-span-4 col-span-12 bg-transparent'>
            <div className=' bg-white rounded-tl-4 rounded-br-4 bsd'>
              <div className='@992:pt-5 pt-4 @992:pb-4 pb-3 border-b border-b-oby-DFDFDF'>
                <div className='@992:px-6 px-4'>
                  <p className='@992:fs-18 fs-16 mb-4 font-bold text-oby-green'>Phương thức thanh toán</p>
                  <RadioGroup value={selected} onChange={setSelected}>
                    <div className='flex items-center gap-4 justify-between'>
                      {paymentMethod.map((plan) => (
                        <RadioGroup.Option
                          key={plan.title}
                          value={plan.code}
                          className={({ checked }) =>
                            twclsx(
                              `rounded-4 border relative h-[50px] w-1/2 cursor-pointer flex items-center justify-center transition-colors`,
                              checked ? 'bg-oby-E4FBDB border-oby-green' : 'border-oby-DFDFDF bg-white'
                            )
                          }
                        >
                          {({ checked }) => (
                            <>
                              <RadioGroup.Label as='div'>
                                {plan.code === 'momo' && (
                                  <OBYImage
                                    src='/images/payment-momo.png'
                                    width={38}
                                    height={38}
                                    alt={plan.title}
                                    title={plan.title}
                                  />
                                )}
                                {plan.code === 'cashondelivery' && (
                                  <BanknotesIcon
                                    className={twclsx(
                                      '@768:w-9.5 @768:h-9.5 w-6 h-6',
                                      checked ? 'text-oby-green' : 'text-oby-9A9898'
                                    )}
                                  />
                                )}
                              </RadioGroup.Label>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className='@992:mt-4 mt-3 @992:px-6 px-4 @992:pb-5 pb-4'>
                <p className='@992:fs-18 fs-16 mb-4 font-bold text-oby-green'>Tổng giỏ hàng</p>
                <div className='flex items-center justify-between'>
                  <p className='@992:fs-16 fs-14'>Tạm tính ({initializeData && initializeData.length})</p>
                  <p className='@992:fs-16 fs-14 text-end'>
                    {initializeData && calculateTotalOriginPrice(initializeData)}
                  </p>
                </div>
                {initializeData && calculateTotalDiscountPrice(initializeData) && (
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
                    <p className='@992:fs-18 fs-16 font-semibold'>
                      {initializeData && calculateTotalPrice(initializeData)}
                    </p>
                  </div>
                </div>
                <OBYButton className='@992:mt-5 mt-3 bg-oby-primary text-white w-full py-2.5 rounded-4'>
                  Tiếp tục
                </OBYButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IOrderPage> = async (context) => {
  const userToken = context.req.cookies.token
  const { data } = await cartApi.GetCart(userToken as string)
  const { data: paymentMethod } = await paymentApi.GetPaymentMethod(userToken as string)

  const listSKU = getSKUListProductAsString(data.items)

  return {
    props: {
      cartItem: data.items,
      listSKU: listSKU,
      paymentMethod
    }
  }
}
