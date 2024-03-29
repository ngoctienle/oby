import { Currency, CustomAttribute, Customer, ExtensionAttributes, FilterGroup, IBillingAddress } from './magento.type'

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
  billing_address: IBillingAddress
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

export interface InitializeCartItem {
  custom_attributes: CustomAttribute[]
  item_id: number
  sku: string
  qty: number
  name: string
  price: number
  product_type: string
}

export interface CartRequest {
  cartItem: CartItemRequest
}
export interface CartUpdateRequest {
  cartItem: Omit<CartItemRequest, 'sku'>
}

interface CartItemRequest {
  sku: string
  qty: number
}

export interface MergeCartRequestBody {
  customerId: number
  storeId: 1
}

export interface Coupon {
  items: ItemCoupon[]
  search_criteria: SearchCriteria
  total_count: number
}

export interface ItemCoupon {
  coupon_id: number
  rule_id: number
  code: string
  usage_limit: number
  times_used: number
  is_primary: boolean
  type: number
}

export interface SearchCriteria {
  filter_groups: FilterGroup[]
  page_size: number
}
