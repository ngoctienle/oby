export interface Category {
  id: number
  parent_id: number
  name: string
  is_active: boolean | null
  position: number
  level: number
  product_count: number
  children_data: Category[]
}

export interface AttributeSearch {
  items: ItemWithAttribute[]
  search_criteria: SearchCriteria
  total_count: number
}

export interface ItemWithAttribute {
  id: number
  parent_id: number
  name: string
  is_active: boolean
  position: number
  level: number
  children: string
  created_at: string
  updated_at: string
  path: string
  available_sort_by: unknown[]
  include_in_menu: boolean
  custom_attributes: CustomAttribute[]
}

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
