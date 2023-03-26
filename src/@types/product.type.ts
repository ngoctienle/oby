import { CustomAttribute, ExtensionAttributes, MediaGalleryEntry, SearchCriteria } from './magento.type'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductResponse {
  items: Product[]
  search_criteria: SearchCriteria
  total_count: number
}

export interface Product {
  id: number
  sku: string
  name: string
  attribute_set_id: number
  price: number
  status: number
  visibility: number
  type_id: string
  created_at: string
  updated_at: string
  extension_attributes: ExtensionAttributes
  product_links: any[]
  options: any[]
  media_gallery_entries: MediaGalleryEntry[]
  tier_prices: any[]
  custom_attributes: CustomAttribute[]
}
