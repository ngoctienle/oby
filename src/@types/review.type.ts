/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Review {
  id: number
  title: string
  detail: string
  nickname: string
  ratings: ReviewRating[]
  review_entity: string
  review_type: number
  review_status: number
  created_at: string
  entity_pk_value: number
  store_id: number
  stores: any[]
}

export interface ReviewRating {
  percent: number
  rating_id: number
  rating_name: string
  value: number
  vode_id: number
}
