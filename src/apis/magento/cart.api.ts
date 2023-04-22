import magentoAPI from '@/vendors/magento.vendor'

import { Cart, MergeCartRequestBody } from '@/@types/cart.type'

const cartApi = {
  GenerateGuestCart() {
    return magentoAPI.post<string>('V1/guest-carts')
  },
  AddToCart(id: string, body: { cartItem: { sku: string; qty: number } }) {
    return magentoAPI.post(`V1/guest-carts/${id}/items`, body)
  },
  GetGuestCart(id: string) {
    return magentoAPI.get<Cart>(`V1/guest-carts/${id}`)
  },
  UpdateGuestCart(id: string, itemId: string, body: { cartItem: { qty: number } }) {
    return magentoAPI.put(`V1/guest-carts/${id}/items/${itemId}`, body)
  },
  DeleteProductInCart(id: string, itemId: string) {
    return magentoAPI.delete(`V1/guest-carts/${id}/items/${itemId}`)
  },
  MergeCart(guestCartId: string, token: string, body: MergeCartRequestBody) {
    return magentoAPI.put(`V1/guest-carts/${guestCartId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  GetCart(token: string) {
    return magentoAPI.get<Cart>('V1/carts/mine', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  AddToCartMine(token: string, body: { cartItem: { sku: string; qty: number } }) {
    return magentoAPI.post('V1/carts/mine/items', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  UpdateMineCart(token: string, itemId: string, body: { cartItem: { qty: number } }) {
    return magentoAPI.put(`V1/carts/mine/items/${itemId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  DeleteProductInMineCart(token: string, itemId: string) {
    return magentoAPI.delete(`V1/carts/mine/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  GetPaymentMethod(token: string) {
    return magentoAPI.get('V1/carts/mine/payment-methods', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export default cartApi
