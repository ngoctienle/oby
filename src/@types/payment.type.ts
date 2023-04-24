import { IBillingAddress } from './magento.type'

export type IPayment = IPaymentElement[]

export interface IPaymentElement {
  code: string
  title: string
}

type AddressBody = Pick<
  IBillingAddress,
  'email' | 'firstname' | 'lastname' | 'telephone' | 'street' | 'postcode' | 'city' | 'region' | 'country_id'
>

export interface IBodyAddress {
  address: AddressBody
}
