import { ItemInCart } from '@/@types/cart.type'
import { CustomAttribute } from '@/@types/magento.type'

import { formatCurrency } from '@/helpers'

import { SITE_URL } from '@/constants/domain.constant'

export const isHaveDiscount = (data: CustomAttribute[]) => {
  return data.some((obj: CustomAttribute) => obj.attribute_code === 'special_price')
}

export const getSKUListProductAsString = (data: ItemInCart[]) => {
  return data.map((item) => item.sku).join(',')
}

export const getDiscount = (data: CustomAttribute[]) => {
  const item = data.find((obj: CustomAttribute) => obj.attribute_code === 'special_price')
  if (item) {
    return formatCurrency(Number(item.value))
  }
}

export const getCost = (data: CustomAttribute[]) => {
  const item = data.find((obj: CustomAttribute) => obj.attribute_code === 'cost')
  if (item) {
    return formatCurrency(Number(item.value))
  }
}

export const getDescription = (data: CustomAttribute[]) => {
  const item = data.find((item) => item.attribute_code === 'description')

  return item?.value
}

export const findIDsFromProduct = (data: CustomAttribute[]) =>
  data.find((obj: CustomAttribute) => obj.attribute_code === 'category_ids')?.value

export const generateProductImageFromMagento = (data: CustomAttribute[]) => {
  const item = data.find((item) => item.attribute_code === 'image')
  return `${SITE_URL}/pub/media/catalog/product${item?.value}`
}

export function getTotalQuantity(items: ItemInCart[]) {
  return items.reduce((total, item) => total + item.qty, 0)
}
