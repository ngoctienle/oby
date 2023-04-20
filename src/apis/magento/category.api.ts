import magentoAPI from '@/vendors/magento.vendor'

import { Category, CategoryResponse } from '@/@types/category.type'

const categoryApi = {
  GetCategoryList() {
    return magentoAPI.get<Category>('all/V1/categories')
  },
  GetAttrCategoryById(id: string) {
    return magentoAPI.get<CategoryResponse>(
      `V1/categories/list?searchCriteria[filterGroups][0][filters][0][field]=entity_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&searchCriteria[filterGroups][0][filters][0][conditionType]=in`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
        }
      }
    )
  },
  GetCategoryNameById(id: string) {
    return magentoAPI.get<Category>(`V1/categories/${id}`)
  }
}

export default categoryApi
