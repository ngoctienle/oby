import { BanknotesIcon, CheckIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import atob from 'atob'
import { GetServerSideProps } from 'next'
import { useMemo } from 'react'

import { MergeCartRequestBody } from '@/@types/cart.type'
import { IOrder } from '@/@types/magento.type'

import { useGlobalState } from '@/libs/state'
import twclsx from '@/libs/twclsx'

import cartApi from '@/apis/magento/cart.api'
import paymentApi from '@/apis/magento/payment.api'

import { OBYImage } from '@/components/UI/Element'

interface IPaymentResult {
  statusMessage: string
  orderId: string
  orderInfo: IOrder
  cartId: string
}

export default function PaymentResult({ statusMessage, orderId, orderInfo, cartId }: IPaymentResult) {
  const [, setCartId] = useGlobalState('cartId')

  useMemo(() => {
    setCartId(cartId)
  }, [cartId, setCartId])

  return (
    <div className='@992:pt-7.5 pt-2 min-h-[50%]'>
      <div className='container'>
        {/* Processing */}
        <div className='flex items-center max-w-[426px] justify-between mx-auto relative'>
          <div className='absolute w-[80%] h-[1px] top-[35%] left-1/2 -translate-x-1/2 -z-10 bg-oby-DFDFDF' />
          <div className='absolute w-[80%] h-[1px] top-[35%] left-7 -z-9 bg-oby-primary' />
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
            <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-E4FBDB'>
              <CheckIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-green' />
            </div>
            <p className='@768:fs-14 fs-12 text-oby-green font-semibold'>Hoàn thành</p>
          </div>
        </div>

        {/* Content */}
        <div className='mx-auto max-w-[560px] @992:mt-10 mt-5'>
          <div className='bg-white py-5 bsd rounded-tl-4 rounded-br-4 flex flex-col items-center justify-center'>
            <div className='relative @992:w-[64px] @992:h-[64px] w-[50px] h-[50px] mb-2.5'>
              <OBYImage
                src={`/images/payment-${statusMessage}.png`}
                alt={statusMessage}
                title={statusMessage}
                display='responsive'
                className='object-cover'
              />
            </div>
            <p className='@992:fs-20 fs-18 font-semibold'>
              {statusMessage === 'false' ? 'Thanh toán không thành công' : 'Đặt hàng thành công'}
            </p>
            {statusMessage !== 'false' && (
              <p className='@992:fs-16 fs-14 mt-2'>
                {statusMessage === 'success' ? 'Đã thanh toán' : 'Chờ thanh toán'}
              </p>
            )}
            <p className='mt-3.5 @992:fs-16 fs-14'>
              Mã đơn hàng <span className='font-semibold'>{orderId}</span>
            </p>
            <p className='@992:fs-16 fs-14 text-center mt-2 max-w-[350px]'>
              Chúng tôi vừa gửi một email xác nhận đến email{' '}
              <span className='text-oby-primary'>{orderInfo.billing_address.email}</span>
            </p>
            <p className='@992:fs-16 fs-14 mt-2'>Cảm ơn bạn đã mua hàng!</p>
          </div>
          <h3 className='font-semibold @992:fs-18 fs-16 mt-7.5'>Thông tin đơn hàng</h3>
          <div
            className={twclsx(
              'mt-3.5 border border-oby-DFDFDF rounded-tl-4 rounded-br-4 py-4.5 px-5',
              statusMessage === 'false' ? 'bg-oby-F6F7F8' : 'bg-white'
            )}
          >
            <div className='pb-4 mb-4 border-b border-b-oby-DFDFDF'>
              <p
                className={twclsx(
                  '@992:fs-16 fs-14 font-bold',
                  statusMessage === 'false' ? 'text-oby-676869' : 'text-oby-green'
                )}
              >
                Thông tin giao hàng
              </p>
              <p
                className={twclsx(
                  '@992:fs-16 fs-14 font-semibold flex items-center mt-2.5',
                  statusMessage === 'false' && 'text-oby-9A9898'
                )}
              >
                <span>{`${orderInfo.billing_address.lastname} ${orderInfo.billing_address.firstname} | ${orderInfo.billing_address.telephone}`}</span>
              </p>
              <p
                className={twclsx('@992:fs-16 fs-14 mt-2', statusMessage === ' false' && 'text-oby-9A9898')}
              >{`${orderInfo.billing_address.street.join(', ')}, ${orderInfo.billing_address.region}, ${
                orderInfo.billing_address.city
              } `}</p>
            </div>
            <p
              className={twclsx(
                '@992:fs-16 fs-14 font-bold',
                statusMessage === 'false' ? 'text-oby-676869' : 'text-oby-green'
              )}
            >
              Phương thức thanh toán
            </p>
            <p className={twclsx('fs-16 mt-2.5', statusMessage === 'false' && 'text-oby-9A9898')}>
              {statusMessage === 'pending'
                ? `Thanh toán khi giao hàng (${orderInfo.payment.additional_information[0]})`
                : orderInfo.payment.additional_information[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IPaymentResult> = async (context) => {
  const userToken = context.req.cookies.token
  const user = context.req.cookies.user
  const customerId = JSON.parse(user as string).id

  const bodyMerge: MergeCartRequestBody = {
    customerId,
    storeId: 1
  }

  const { orderType, orderInfo, resultCode, extraData } = context.query

  const originOrderId = JSON.parse(atob(extraData as string)).orderId
  const { data } = await paymentApi.GetOrderInfo(originOrderId)

  const { data: guestCartId } = await cartApi.GenerateGuestCart()

  await cartApi.MergeCart(guestCartId, userToken as string, bodyMerge)

  if (orderType && orderInfo && resultCode) {
    return {
      props: {
        statusMessage: resultCode && Number(resultCode) === 0 ? 'success' : 'false',
        orderId: orderInfo as string,
        orderInfo: data,
        cartId: guestCartId
      }
    }
  } else {
    return {
      props: {
        statusMessage: 'pending',
        orderId: `#DH${originOrderId.toString().padStart(9, '0')}`,
        orderInfo: data,
        cartId: guestCartId
      }
    }
  }
  return {
    notFound: true
  }
}
