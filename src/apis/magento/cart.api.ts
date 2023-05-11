import magentoAPI from '@/vendors/magento.vendor'

import { Cart, Coupon, MergeCartRequestBody } from '@/@types/cart.type'
import { Rule, Totals } from '@/@types/magento.type'

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
  GetListCoupons() {
    return magentoAPI.get<Coupon>('all/V1/coupons/search?searchCriteria[pageSize]=0', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  GetRulesCoupon(id: number) {
    return magentoAPI.get<Rule>(`all/V1/salesRules/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  GetCartTotals(id: string) {
    return magentoAPI.get<Totals>(`all/V1/guest-carts/${id}/totals`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  GetCartMineTotal(token: string) {
    return magentoAPI.get<Totals>('V1/carts/mine/totals', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  ApplyCouponMine(code: string, token: string) {
    return magentoAPI.put<boolean>(`V1/carts/mine/coupons/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  ApplyCoupon(id: string, code: string) {
    return magentoAPI.put<boolean>(`all/V1/guest-carts/${id}/coupons/${code}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  }
}

export default cartApi
