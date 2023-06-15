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
  GetGuestPaymentMethod(guestCartId: string) {
    return magentoAPI.get<IPayment>(`V1/guest-carts/${guestCartId}/payment-methods`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
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
  GetGuestBillingAddress(guestCartId: string) {
    return magentoAPI.get<IBillingAddress>(`V1/guest-carts/${guestCartId}/billing-address`)
  },
  SetBillingAddress(token: string, body: IBodyAddress) {
    return magentoAPI.post<number>('V1/carts/mine/billing-address', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  SetGuestBillingAddress(guestCartId: string, body: IBodyAddress) {
    return magentoAPI.post<number>(`V1/guest-carts/${guestCartId}/billing-address`, body, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
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
  EstimateShippingGuestFeeByAddressId(guestCartId: string, body: IBodyAddress) {
    return magentoAPI.post<IShippingMethod[]>(`V1/guest-carts/${guestCartId}/estimate-shipping-methods`, body, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
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
  GuestShippingInformation(guestCartId: string, body: IBodyShippingInformation) {
    return magentoAPI.post<IShippingInformation>(`V1/guest-carts/${guestCartId}/shipping-information`, body, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
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
  GuestPaymentInformation(guestCartId: string, body: IBodyPaymentInformation) {
    return magentoAPI.post<number>(`V1/guest-carts/${guestCartId}/payment-information`, body, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
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
