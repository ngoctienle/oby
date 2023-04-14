import { Product, ProductResponse } from '@/@types/product.type'

import http from '@/libs/http'

const productApi = {
  GetProductByCategoryID(id: number) {
    return http.get<ProductResponse>(
      `V1/products/?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${id}&searchCriteria[filter_groups][0][filters][0][condition_type]=in`
    )
  },
  GetProductDetailBySKU(sku: string) {
    return http.get<Product>(`V1/products/${sku}`)
  },
  GetListProductByListSKU(sku: string) {
    return http.get<ProductResponse>(
      `V1/products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=${sku}&searchCriteria[filter_groups][0][filters][0][condition_type]=in`
    )
  }
}

export default productApi
