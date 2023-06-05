import { SearchCriteria } from './magento.type'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Review {
  id: number
  title: string
  detail: string
  nickname: string
  rating: any[]
  review_entity: string
  review_type: number
  review_status: number
  created_at: string
  entity_pk_value: number
  store_id: number
  stores: any[]
}

export interface ReviewRespone {
  items: Review[]
  search_criteria: SearchCriteria
  total_count: number
}
