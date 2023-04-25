/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CustomAttribute {
  attribute_code: string
  value: string
}

export interface SearchCriteria {
  filter_groups: FilterGroup[]
}

export interface FilterGroup {
  filters: Filter[]
}

export interface Filter {
  field: string
  value: string
  condition_type: string
}

export interface ExtensionAttributes {
  website_ids: number[]
  category_links: CategoryLink[]
  stock_item: StockItem
}

export interface CategoryLink {
  position: number
  category_id: string
}
interface StockItem {
  item_id: number
  product_id: number
  stock_id: number
  qty: number
  is_in_stock: boolean
  is_qty_decimal: boolean
  show_default_notification_message: boolean
  use_config_min_qty: boolean
  min_qty: number
  use_config_min_sale_qty: number
  min_sale_qty: number
  use_config_max_sale_qty: boolean
  max_sale_qty: number
  use_config_backorders: boolean
  backorders: number
  use_config_notify_stock_qty: boolean
  notify_stock_qty: number
  use_config_qty_increments: boolean
  qty_increments: number
  use_config_enable_qty_inc: boolean
  enable_qty_increments: boolean
  use_config_manage_stock: boolean
  manage_stock: boolean
  low_stock_date: any
  is_decimal_divided: boolean
  stock_status_changed_auto: number
}

export interface MediaGalleryEntry {
  id: number
  media_type: string
  label: any
  position: number
  disabled: boolean
  types: string[]
  file: string
}

export interface Customer {
  email: string
  firstname: string
  lastname: string
}

export interface IBillingAddress {
  id: number
  region: string
  region_id: number
  region_code: string
  country_id: string
  street: string[]
  telephone: string
  postcode: string
  city: string
  firstname: string
  lastname: string
  email: string
  same_as_billing: number
  save_in_address_book: number
}

export interface Currency {
  global_currency_code: string
  base_currency_code: string
  store_currency_code: string
  quote_currency_code: string
  store_to_base_rate: number
  store_to_quote_rate: number
  base_to_global_rate: number
  base_to_quote_rate: number
}

export interface ExtensionAttributes {
  shipping_assignments: any[]
}

export interface ResponseError {
  message: string
  parameters?: string[]
  trace: string
}

export interface IShippingMethod {
  amount: number
  available: boolean
  base_amount: number
  carrier_code: string
  carrier_title?: string
  error_message: string
  method_code: string
  method_title?: string
  price_excl_tax: number
  price_incl_tax: number
}

export interface IShippingInformation {
  payment_methods: PaymentMethod[]
  totals: Totals
  extension_attributes?: any
}

export interface PaymentMethod {
  code: string
  title: string
}

export interface Totals {
  grand_total: number
  base_grand_total: number
  subtotal: number
  base_subtotal: number
  discount_amount: number
  base_discount_amount: number
  subtotal_with_discount: number
  base_subtotal_with_discount: number
  shipping_amount: number
  base_shipping_amount: number
  shipping_discount_amount: number
  base_shipping_discount_amount: number
  tax_amount: number
  base_tax_amount: number
  weee_tax_applied_amount: number
  shipping_tax_amount: number
  base_shipping_tax_amount: number
  subtotal_incl_tax: number
  base_subtotal_incl_tax: number
  shipping_incl_tax: number
  base_shipping_incl_tax: number
  base_currency_code: string
  quote_currency_code: string
  coupon_code: string
  items_qty: number
  items: Item[]
  total_segments: TotalSegment[]
  extension_attributes: ExtensionAttributes4
}

export interface Item {
  item_id: number
  price: number
  base_price: number
  qty: number
  row_total: number
  base_row_total: number
  row_total_with_discount: number
  tax_amount: number
  base_tax_amount: number
  tax_percent: number
  discount_amount: number
  base_discount_amount: number
  discount_percent: number
  price_incl_tax: number
  base_price_incl_tax: number
  row_total_incl_tax: number
  base_row_total_incl_tax: number
  options: string
  weee_tax_applied_amount: number
  weee_tax_applied: string
  extension_attributes: ExtensionAttributes
  name: string
}

export interface ExtensionAttributes {
  negotiable_quote_item_totals: NegotiableQuoteItemTotals
}

export interface NegotiableQuoteItemTotals {
  cost: number
  catalog_price: number
  base_catalog_price: number
  catalog_price_incl_tax: number
  base_catalog_price_incl_tax: number
  cart_price: number
  base_cart_price: number
  cart_tax: number
  base_cart_tax: number
  cart_price_incl_tax: number
  base_cart_price_incl_tax: number
  extension_attributes: any
}

export interface TotalSegment {
  code: string
  title: string
  value: number
  area: string
  extension_attributes: any
}

export interface ExtensionAttributes3 {
  tax_grandtotal_details: TaxGrandtotalDetail[]
  gift_cards: string
  gw_order_id: string
  gw_item_ids: string[]
  gw_allow_gift_receipt: string
  gw_add_card: string
  gw_price: string
  gw_base_price: string
  gw_items_price: string
  gw_items_base_price: string
  gw_card_price: string
  gw_card_base_price: string
  gw_base_tax_amount: string
  gw_tax_amount: string
  gw_items_base_tax_amount: string
  gw_items_tax_amount: string
  gw_card_base_tax_amount: string
  gw_card_tax_amount: string
  gw_price_incl_tax: string
  gw_base_price_incl_tax: string
  gw_card_price_incl_tax: string
  gw_card_base_price_incl_tax: string
  gw_items_price_incl_tax: string
  gw_items_base_price_incl_tax: string
}

export interface TaxGrandtotalDetail {
  amount: number
  rates: any[]
  group_id: number
}

export interface ExtensionAttributes4 {
  coupon_label: string
  negotiable_quote_totals: NegotiableQuoteTotals
  base_customer_balance_amount: number
  customer_balance_amount: number
  reward_points_balance: number
  reward_currency_amount: number
  base_reward_currency_amount: number
}

export interface NegotiableQuoteTotals {
  items_count: number
  quote_status: string
  created_at: string
  updated_at: string
  customer_group: number
  base_to_quote_rate: number
  cost_total: number
  base_cost_total: number
  original_total: number
  base_original_total: number
  original_tax: number
  base_original_tax: number
  original_price_incl_tax: number
  base_original_price_incl_tax: number
  negotiated_price_type: number
  negotiated_price_value: number
}
