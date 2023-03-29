import { createSlug, formatCurrency } from '@/helpers'

import { CustomAttribute } from '@/@types/magento.type'
import { Product } from '@/@types/product.type'

export const isHaveDiscount = (data: CustomAttribute[]) => {
  return data.some((obj: CustomAttribute) => obj.attribute_code === 'special_price')
}

export const getDiscount = (data: CustomAttribute[]) => {
  const item = data.find((obj: CustomAttribute) => obj.attribute_code === 'special_price')
  if (item) {
    return formatCurrency(Number(item.value))
  }
}

export const generateProductLink = (data: Product) => {
  const productName = data.name.trim()
  const arrData = data.custom_attributes.find((obj: CustomAttribute) => obj.attribute_code === 'category_ids')
  const arrCategoryValue = (arrData as CustomAttribute).value

  return `${createSlug(productName)}-id-${arrCategoryValue[1]}`
}
