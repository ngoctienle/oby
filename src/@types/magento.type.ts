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
}

export interface CategoryLink {
  position: number
  category_id: string
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
