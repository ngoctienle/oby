import cookie from 'cookie'
import Cookies from 'js-cookie'
import { NextPageContext } from 'next'

import { parseJwt } from '@/helpers/auth'

type UserToken = {
  id: string
  email: string
}
export const getTokenSSRAndCSR = (ctx?: NextPageContext): [string, UserToken | null] => {
  let token = ''
  let userToken = null

  if (typeof window === 'undefined') {
    const cookieStr = ctx?.req?.headers.cookie || ''

    token = cookie.parse(cookieStr).token
    userToken = parseJwt(token)
  } else {
    token = Cookies.get('jwt') || ''
  }

  return [token, userToken]
}

export const getGuestCartIdSSRAndCSR = (ctx?: NextPageContext): string | null => {
  let guestCartId = null
  if (typeof window === 'undefined') {
    const cookieHeader = ctx?.req?.headers.cookie || ''

    guestCartId = cookie.parse(cookieHeader).guestCartId
  } else {
    guestCartId = Cookies.get('guestCartId') || ''
  }

  return guestCartId
}
