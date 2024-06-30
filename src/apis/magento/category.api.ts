import magentoAPI from '@/vendors/magento.vendor'

import { Category, CategoryResponse, ItemWithAttribute } from '@/@types/category.type'

const categoryApi = {
  GetCategoryList() {
    return magentoAPI.get<Category>('all/V1/categories')
  },
  GetAttrCategoryById(id: string) {
    return magentoAPI.get<CategoryResponse>(
      `V1/categories/list?searchCriteria[filterGroups][0][filters][0][field]=entity_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&searchCriteria[filterGroups][0][filters][0][conditionType]=in`
    )
  },
  GetCategoryNameById(id: string) {
    return magentoAPI.get<ItemWithAttribute>(`V1/categories/${id}`)
  }
}

export default categoryApi
