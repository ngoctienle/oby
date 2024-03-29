export interface BlogListConfig {
  page?: number | string
  limit?: number | string
  name?: string
}

export interface BlogListResponse {
  items: Blog[]
  last_page: number
}
export interface Blog {
  post_id?: string
  id: number
  name: string
  short_description: string
  post_content: string
  store_ids: number
  image?: string
  enabled: number
  url_key: string
  in_rss: number
  allow_comment: number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  meta_robots: string
  created_at: string
  updated_at: string
  author_id: number
  modifier_id?: number
  publish_date: string
  layout: string
  category_ids: number[]
  tag_ids: number[]
  topic_ids: number[]
  author_name: string
  author_url: string
  view_traffic: number
}

export interface BlogCategory {
  id: number
  name: string
  description: string
  store_ids: number
  image: string
  enabled: number
  url_key: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  meta_robots: string
  created_at: string
  updated_at: string
  parent_id: number
  path: string
  position: number
  level: number
  children_count: number
}
