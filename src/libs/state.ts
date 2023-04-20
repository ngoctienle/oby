import Cookies from 'js-cookie'
import { createGlobalState } from 'react-hooks-global-state'

export type TypeUser = {
  id: number
  group_id: number
  created_at: string
  updated_at: string
  created_in: string
  email: string
  firstname: string
  lastname: string
  store_id: number
  website_id: number
  addresses: string[]
  disable_auto_group_change: number
  extension_attributes: {
    is_subscribed: boolean
  }
}

type InitialGlobalState = {
  guestCartId: string | null
  cartId: string | null
  user: TypeUser | null
  token: string | null
}

const initialState: InitialGlobalState = {
  guestCartId: Cookies.get('guestCartId') as string | null,
  cartId: Cookies.get('cartId') as string | null,
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null,
  token: Cookies.get('token') as string | null
}

const { useGlobalState } = createGlobalState(initialState)

export { useGlobalState }
