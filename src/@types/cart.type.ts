import { BillingAddress, Currency, Customer, ExtensionAttributes } from './magento.type'

export interface Cart {
  id: string
  created_at: string
  updated_at: string
  is_virtual: boolean
  is_active: boolean
  items: ItemInCart[]
  items_count: number
  items_qty: number
  customer: Customer
  billing_address: BillingAddress
  orig_order_id: number
  currency: Currency
  customer_is_guest: boolean
  customer_note_notify: boolean
  customer_tax_class_id: number
  store_id: number
  extension_attributes: ExtensionAttributes
}

export type CartId = Pick<Cart, 'id'>

export interface ItemInCart {
  item_id: number
  sku: string
  qty: number
  name: string
  price: number
  product_type: string
  quote_id: string
}
