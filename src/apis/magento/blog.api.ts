import magentoAPI from '@/vendors/magento.vendor'

import { Blog, BlogCategory, BlogListResponse } from '@/@types/blog.type'

const blogAPI = {
  GetList(page?: number | string, limit?: number | string) {
    return magentoAPI.get<BlogListResponse[]>(`V1/mpblog/post?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  ViewPost(id: number) {
    return magentoAPI.get<Blog>(`V1/mpblog/post/view/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  GetListCategory() {
    return magentoAPI.get<BlogCategory[]>(`V1/mpblog/category?page=1&limit=10`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  GetListByCategoryId(id: number, page?: number | string, limit?: number | string) {
    return magentoAPI.get<BlogListResponse[]>(`/V1/mpblog/category/post/id/${id}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  }
}

export default blogAPI
