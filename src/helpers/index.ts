import { CustomAttribute } from '@/@types/magento.type'

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency) + '₫'
}
export function getDiscountPercent(data: CustomAttribute[]) {
  const originalPrice = data.find((obj: CustomAttribute) => obj.attribute_code === 'cost')
  const discountedPrice = data.find((obj: CustomAttribute) => obj.attribute_code === 'special_price')
  const originalAmout = Number(originalPrice?.value)
  const discountAmount = Number(originalPrice?.value) - Number(discountedPrice?.value)
  const discountPercent = Math.round((discountAmount / originalAmout) * 100)

  return '-' + discountPercent + '%'
}
