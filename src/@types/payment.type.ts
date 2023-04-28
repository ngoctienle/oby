import { IBillingAddress } from './magento.type'

export type IPayment = IPaymentElement[]

export interface IPaymentElement {
  code: string
  title: string
}

export type AddressBody = Pick<
  IBillingAddress,
  'email' | 'firstname' | 'lastname' | 'telephone' | 'street' | 'postcode' | 'city' | 'region' | 'country_id'
>

export interface IBodyAddress {
  address: AddressBody
}

export interface IBodyShippingInformation {
  addressInformation: {
    shipping_address: AddressBody
    billing_address?: AddressBody
    shipping_carrier_code: string
    shipping_method_code: string
  }
}

export interface IBodyPaymentInformation {
  paymentMethod: {
    method: 'momo' | 'cashondelivery' | string
  }
  billingAddress: AddressBody
}

export interface ICaptureMomo {
  orderId: number
}

export interface ICaptureMomoResponse {
  success: boolean
  process3d_url?: string
  message?: string
}
