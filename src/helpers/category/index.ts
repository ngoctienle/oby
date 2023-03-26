import { Category } from '@/@types/category.type'
import { CustomAttribute } from '@/@types/magento.type'

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

function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}
function removeSpecialCharacter(str: string) {
  return str.replace(/[^a-zA-Z0-9 ]/g, '').toLocaleLowerCase()
}

function createSlug(str: string) {
  return removeSpecialCharacter(removeAccents(str)).replace(/\s+/g, '-')
}

export const generateURLWithCategory = (category: string, subcategory: string) => {
  const slugCate = createSlug(category)
  const slugSubCate = createSlug(subcategory)
  return `${slugCate}/${slugSubCate}`
}
