import { formatCurrency } from '@/helpers'

import { CustomAttribute } from '@/@types/magento.type'

export const isHaveDiscount = (data: CustomAttribute[]) => {
  return data.some((obj: CustomAttribute) => obj.attribute_code === 'special_price')
}

export const getDiscount = (data: CustomAttribute[]) => {
  const item = data.find((obj: CustomAttribute) => obj.attribute_code === 'special_price')
  if (item) {
    return formatCurrency(Number(item.value))
  }
}
