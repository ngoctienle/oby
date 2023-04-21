import { hrefPath } from './constants/href.constant'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('token')?.value

  if (
    tokenCookie &&
    (request.nextUrl.pathname.startsWith('/dang-nhap') || request.nextUrl.pathname.startsWith('/dang-ky'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = hrefPath.home
    return NextResponse.redirect(url)
  }
}
