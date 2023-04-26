import cookie from 'cookie'
import Cookies from 'js-cookie'
import { NextPageContext } from 'next'

import { TypeUser } from '@/libs/state'

export const getTokenSSRAndCSR = (ctx?: NextPageContext): [string | null, TypeUser | null, string | null] => {
  let userToken = ''
  let userProfile = null
  let cartId = ''

  if (typeof window === 'undefined') {
    const cookieHeader = ctx?.req?.headers.cookie || ''
    userToken = cookie.parse(cookieHeader).token
    userProfile = cookie.parse(cookieHeader).user ? JSON.parse(cookie.parse(cookieHeader).user) : null
    cartId = cookie.parse(cookieHeader).cartId
  } else {
    userToken = Cookies.get('token') || ''
    userProfile = Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null
    cartId = Cookies.get('cartId') || ''
  }

  return [userToken, userProfile, cartId]
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
