import { InitializeCartItem } from '@/@types/cart.type'

import { formatCurrency } from '@/helpers'

export const calculateTotalOriginPrice = (items: InitializeCartItem[]) => {
  const totalPrice = items.reduce((total, item) => {
    const specialPriceAttr = item.custom_attributes.find((attr) => attr.attribute_code === 'cost')

    if (specialPriceAttr) {
      // if (Array.isArray(specialPriceAttr.value)) return
      const specialPrice = Array.isArray(specialPriceAttr.value) ? 0 : parseFloat(specialPriceAttr.value)
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
      // if (Array.isArray(specialPriceAttr.value)) return
      const specialPrice = Array.isArray(specialPriceAttr.value) ? 0 : parseFloat(specialPriceAttr.value)
      const cost = Array.isArray(costAttr.value) ? 0 : parseFloat(costAttr.value)

      return accumulator + (cost - specialPrice) * item.qty
    }

    return accumulator
  }, 0)

  if (totalDiscountPrice > 0) {
    return '-' + formatCurrency(totalDiscountPrice)
  } else {
    return false
  }
}

export const calculateTotalPrice = (items: InitializeCartItem[]) => {
  return formatCurrency(items.reduce((total, item) => total + item.qty * item.price, 0))
}
