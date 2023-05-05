import magentoAPI from '@/vendors/magento.vendor'

import { Blog, BlogCategory, BlogListConfig } from '@/@types/blog.type'

const blogAPI = {
  GetList(params: BlogListConfig) {
    return magentoAPI.get<Blog[]>(`V1/mpblog/post`, {
      params,
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
  GetListByCategoryId(id: number) {
    return magentoAPI.get<Blog[]>(`/V1/mpblog/category/post/id/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  }
}

export default blogAPI
