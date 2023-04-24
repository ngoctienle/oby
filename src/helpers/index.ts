import { ItemInCart } from '@/@types/cart.type'
import { CustomAttribute, IBillingAddress } from '@/@types/magento.type'
import { ProductResponse } from '@/@types/product.type'

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

export function mergeArrayItems(arr1: ItemInCart[], arr2: ProductResponse) {
  return arr1.map((item) => ({
    ...item,
    custom_attributes: arr2.items.find((product) => product.sku === item.sku)?.custom_attributes ?? []
  }))
}

export function generateName(fullname: string) {
  const nameParts = fullname.split(' ')
  const lastname = nameParts.shift()
  const firstname = nameParts.join(' ')
  return [firstname, lastname]
}

export function formatAddress(address: IBillingAddress) {
  let name = ''
  if (!address.firstname && !address.lastname) {
    return null
  } else if (!address.firstname) {
    name = address.lastname
  } else if (!address.lastname) {
    name = address.firstname
  } else {
    name = `${address.lastname} ${address.firstname}`
  }

  const phone = address.telephone
  const street = address.street.join(', ')
  const region = address.region
  const city = address.city

  if (!name || !phone || !street || !region || !city) {
    return null
  }

  const nameAndPhone = `${name} | ${phone}`
  const fullAddress = `${street}, ${region}, ${city}.`

  return {
    fullname: name,
    nameAndPhone,
    address: fullAddress
  }
}
