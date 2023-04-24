import magentoAPI from '@/vendors/magento.vendor'

import { IBillingAddress } from '@/@types/magento.type'
import { IBodyAddress, IPayment } from '@/@types/payment.type'

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
  }
}

export default paymentApi
