import { Category, CustomAttribute } from '@/@types/category.type'

import { SITE_URL } from '@/constants/domain.constant'

export const getParentCategory = (data: Category) => {
  if (data.is_active === null) {
    return data.children_data
  }
}

export const getIDListCategoryAsString = (data: Category[]) => {
  return data.map((item) => item.id).join(',')
}

export const generateImageFromMagento = (data: CustomAttribute[]) => {
  const item = data.find((item) => item.attribute_code === 'image')
  return `${SITE_URL}${item?.value}`
}
