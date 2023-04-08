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

export function createSlug(str: string) {
  return removeSpecialCharacter(removeAccents(str)).replace(/\s+/g, '-')
}

export function getIdFromNameId(nameId: string) {
  const arr = nameId.split('-id-')

  return arr[arr.length - 1]
}

export function getSKUFromNameId(nameId: string) {
  const arr = nameId.split('-id-')

  return arr[0]
}