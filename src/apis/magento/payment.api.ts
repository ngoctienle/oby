import magentoAPI from '@/vendors/magento.vendor'

import { IPayment } from '@/@types/payment.type'

const paymentApi = {
  GetPaymentMethod(token: string) {
    return magentoAPI.get<IPayment>('V1/carts/mine/payment-methods', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export default paymentApi
