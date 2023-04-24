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
