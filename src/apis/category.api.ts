import { AttributeSearch, Category } from '@/@types/category.type'

import http from '@/libs/http'

const categoryApi = {
  GetCategoryList() {
    return http.get<Category>('V1/categories')
  },
  GetAttrCategoryById(id: string) {
    return http.get<AttributeSearch>(
      `V1/categories/list?searchCriteria[filterGroups][0][filters][0][field]=entity_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&searchCriteria[filterGroups][0][filters][0][conditionType]=in`
    )
  }
}

export default categoryApi
