import { Cart } from '@/@types/cart.type'

import http from '@/libs/http'

const cartApi = {
  GenerateGuestCart() {
    return http.post<string>('V1/guest-carts')
  },
  GetGuestCart(id: string) {
    return http.get<Cart>(`V1/guest-carts/${id}`)
  }
}

export default cartApi
