import { Cart } from '@/@types/cart.type'

import http from '@/libs/http'

const cartApi = {
  GenerateGuestCart() {
    return http.post<string>('V1/guest-carts')
  },
  AddToCart(id: string, body: { cartItem: { sku: string; qty: number } }) {
    return http.post(`V1/guest-carts/${id}/items`, body)
  },
  GetGuestCart(id: string) {
    return http.get<Cart>(`V1/guest-carts/${id}`)
  },
  UpdateGuestCart(id: string, itemId: string, body: { cartItem: { qty: number } }) {
    return http.put(`V1/guest-carts/${id}/items/${itemId}`, body)
  },
  DeleteProductInCart(id: string, itemId: string) {
    return http.delete(`V1/guest-carts/${id}/items/${itemId}`)
  }
}

export default cartApi
