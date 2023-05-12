import Cookies from 'js-cookie'
import { createGlobalState } from 'react-hooks-global-state'

import { Customer } from '@/@types/auth.type'

export type TypeUser = Customer

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
