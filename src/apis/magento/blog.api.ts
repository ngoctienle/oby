import magentoAPI from '@/vendors/magento.vendor'

import { Blog, BlogListConfig } from '@/@types/blog.type'

const blogAPI = {
  GetList(params: BlogListConfig) {
    return magentoAPI.get<Blog[]>(`V1/mpblog/post`, {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  }
}

export default blogAPI
