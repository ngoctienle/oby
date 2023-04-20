import magentoAPI from '@/vendors/magento.vendor'

import { Product, ProductResponse } from '@/@types/product.type'

const productApi = {
  GetProductByCategoryID(id: number) {
    return magentoAPI.get<ProductResponse>(
      `V1/products/?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${id}&searchCriteria[filter_groups][0][filters][0][condition_type]=in`
    )
  },
  GetProductDetailBySKU(sku: string) {
    return magentoAPI.get<Product>(`all/V1/products/${sku}`)
  },
  GetListProductByListSKU(sku: string) {
    return magentoAPI.get<ProductResponse>(
      `V1/products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=${sku}&searchCriteria[filter_groups][0][filters][0][condition_type]=in`
    )
  },
  GetAllProducts() {
    return magentoAPI.get<ProductResponse>('V1/products/?searchCriteria[pageSize]=0')
  }
}

export default productApi
