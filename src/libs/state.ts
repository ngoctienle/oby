import Cookies from 'js-cookie'
import { createGlobalState } from 'react-hooks-global-state'

type InitialGlobalState = {
  guestCartId: string | null
  cartId: string | null
  user: null
}

const initialState: InitialGlobalState = {
  guestCartId: Cookies.get('guestCartId') as string | null,
  cartId: null,
  user: null
}

const { useGlobalState } = createGlobalState(initialState)

export { useGlobalState }
