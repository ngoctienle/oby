import magentoAPI from '@/vendors/magento.vendor'

import { IBillingAddress, IOrder, IShippingInformation, IShippingMethod } from '@/@types/magento.type'
import {
  IBodyAddress,
  IBodyPaymentInformation,
  IBodyShippingInformation,
  ICaptureMomo,
  ICaptureMomoResponse,
  IPayment
} from '@/@types/payment.type'

const paymentApi = {
  GetPaymentMethod(token: string) {
    return magentoAPI.get<IPayment>('V1/carts/mine/payment-methods', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  GetBillingAddress(token: string) {
    return magentoAPI.get<IBillingAddress>('V1/carts/mine/billing-address', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  SetBillingAddress(token: string, body: IBodyAddress) {
    return magentoAPI.post<number>('V1/carts/mine/billing-address', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  EstimateShippingFeeByAddressId(token: string, body: IBodyAddress) {
    return magentoAPI.post<IShippingMethod[]>('V1/carts/mine/estimate-shipping-methods', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  ShippingInformation(token: string, body: IBodyShippingInformation) {
    return magentoAPI.post<IShippingInformation>('V1/carts/mine/shipping-information', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  PaymentInformation(token: string, body: IBodyPaymentInformation) {
    return magentoAPI.post<number>('V1/carts/mine/payment-information', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  CaptureMomo(body: ICaptureMomo) {
    return magentoAPI.post<ICaptureMomoResponse[]>('V1/oby/momo/capture-wallet/', body)
  },
  CaptureVNPay(body: ICaptureMomo) {
    return magentoAPI.post<ICaptureMomoResponse[]>('V1/oby/vnpay/create-order/', body)
  },
  GetOrderInfo(id: string) {
    return magentoAPI.get<IOrder>(`V1/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  CreateOrderGHTK(id: string) {
    return magentoAPI.post('V1/oby/ghtk/create-order/', { orderId: id })
  }
}

export default paymentApi
