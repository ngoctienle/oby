import cookie from 'cookie'
import Cookies from 'js-cookie'
import { NextPageContext } from 'next'

import { TypeUser } from '@/libs/state'

export const getTokenSSRAndCSR = (ctx?: NextPageContext): [string, TypeUser | null] => {
  let userToken = ''
  let userProfile = null

  if (typeof window === 'undefined') {
    const cookieHeader = ctx?.req?.headers.cookie || ''

    userToken = cookie.parse(cookieHeader).token
    userProfile = cookie.parse(cookieHeader).user
  } else {
    userToken = Cookies.get('token') || ''
    userProfile = Cookies.get('user') ? JSON.parse(Cookies.get('user') as string) : null
  }

  return [userToken, userProfile]
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
