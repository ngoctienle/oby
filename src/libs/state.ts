import Cookies from 'js-cookie'
import { createGlobalState } from 'react-hooks-global-state'

type TypeUser = {
  email: string
}

type InitialGlobalState = {
  guestCartId: string | null
  cartId: string | null
  user: TypeUser | null
  jwt: string | null
}

const initialState: InitialGlobalState = {
  guestCartId: Cookies.get('guestCartId') as string | null,
  cartId: null,
  user: null,
  jwt: null
}

const { useGlobalState } = createGlobalState(initialState)

export { useGlobalState }
