import { Category } from '@/@types/category.type'
import { CustomAttribute } from '@/@types/magento.type'

import { createSlug } from '@/helpers'

import { SITE_URL } from '@/constants/domain.constant'

export const getParentCategory = (data: Category) => {
  if (data.is_active === null) {
    return data.children_data
  }
}

export const getIDListCategoryAsString = (data: Category[]) => {
  return data.map((item) => item.id).join(',')
}

export const generateCategoryImageFromMagento = (data: CustomAttribute[]) => {
  const item = data.find((item) => item.attribute_code === 'image')
  return `${SITE_URL}${item?.value}`
}

export const generateURLWithCategory = (category: string, subcategory: string) => {
  const slugCate = createSlug(category)
  const slugSubCate = createSlug(subcategory)
  return `${slugCate}/${slugSubCate}`
}
