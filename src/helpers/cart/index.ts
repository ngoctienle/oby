import { InitializeCartItem } from '@/@types/cart.type'

import { formatCurrency } from '@/helpers'

export const calculateTotalOriginPrice = (items: InitializeCartItem[]) => {
  const totalPrice = items.reduce((total, item) => {
    const specialPriceAttr = item.custom_attributes.find((attr) => attr.attribute_code === 'cost')

    if (specialPriceAttr) {
      const specialPrice = parseFloat(specialPriceAttr.value)
      const qty = item.qty

      return total + specialPrice * qty
    }

    return total + item.price * item.qty
  }, 0)

  return formatCurrency(totalPrice)
}

export const calculateTotalDiscountPrice = (items: InitializeCartItem[]) => {
  const totalDiscountPrice = items.reduce((accumulator, item) => {
    const specialPriceAttr = item.custom_attributes.find((attr) => attr.attribute_code === 'special_price')
    const costAttr = item.custom_attributes.find((attr) => attr.attribute_code === 'cost')

    if (specialPriceAttr && costAttr) {
      const specialPrice = parseFloat(specialPriceAttr.value)
      const cost = parseFloat(costAttr.value)

      return accumulator + (cost - specialPrice) * item.qty
    }

    return accumulator
  }, 0)

  return '-' + formatCurrency(totalDiscountPrice)
}

export const calculateTotalPrice = (items: InitializeCartItem[]) => {
  return formatCurrency(items.reduce((total, item) => total + item.qty * item.price, 0))
}
