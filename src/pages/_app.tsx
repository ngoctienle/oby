import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import cookie from 'cookie'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'
import NextNProgress from 'nextjs-progressbar'
import { Fragment, useEffect, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'

import { useGlobalState } from '@/libs/state'
import twclsx from '@/libs/twclsx'

import { getGuestCartIdSSRAndCSR, getTokenSSRAndCSR } from '@/helpers/cookie'

import cartApi from '@/apis/magento/cart.api'

import Footer from '@/components/Footer'
import HeaderV2 from '@/components/HeaderV2'
import { ToTopButton } from '@/components/UI/Button'
import { OBYImage, OBYLink } from '@/components/UI/Element'

/* import { HeaderAds } from '@/components/UI/OBYAds' */

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

function OBYApp({ Component, pageProps, router }: AppProps) {
  const [, setGuestCartId] = useGlobalState('guestCartId')
  const [, setUser] = useGlobalState('user')
  const [, setToken] = useGlobalState('token')
  const [, setCartId] = useGlobalState('cartId')

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events])

  useEffect(() => {
    setGuestCartId(pageProps.guestCartId)
    setToken(pageProps.userToken)
    setUser(pageProps.userProfile)
    setCartId(pageProps.cartId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProps.cartId, pageProps.guestCartId, pageProps.userProfile, pageProps.userToken])

  const isAuth = useMemo(() => {
    const included = ['/dang-nhap', '/dang-ky']
    const currentRouter = router.pathname

    return included.indexOf(currentRouter) !== -1
  }, [router.pathname])

  return (
    <Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <NextNProgress height={2} startPosition={0.3} stopDelayMs={200} showOnShallow={true} color='#FFFFFF' />
        {/* <HeaderAds /> */}
        <HeaderV2
          font={inter}
          isFocus={isAuth}
          user={pageProps.userProfile || null}
          guestCartId={pageProps.guestCartId}
          cartId={pageProps.cartId || null}
          token={pageProps.userToken || null}
        />
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
        <OBYLink
          href='http://zalo.me/0822088079'
          title='Zalo'
          className='fixed bottom-[160px] flex items-center w-[64px] h-[64px] z-10 right-6'
        >
          <OBYImage src='/images/icons8-zalo.svg' display='responsive' alt='Zalo' />
        </OBYLink>
        <OBYLink
          href='https://m.me/104621909153569'
          title='Messenger'
          className='fixed bottom-[90px] flex items-center justify-center bg-white rounded-full w-[60px] h-[60px] z-10 right-6'
        >
          <OBYImage src='/images/icons8-facebook-messenger.svg' display='responsive' alt='Messenger' />
        </OBYLink>
        <ToTopButton />
        <Footer font={inter} />
        <Toaster
          position='top-center'
          reverseOrder={true}
          toastOptions={{
            className: twclsx('rounded-1.5'),
            duration: 2500
          }}
        />

        {/* TawkTo Extension */}
        <Script id='tawk' strategy='lazyOnload'>
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/64775a9d74285f0ec46ec085/1h1p3jukm';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
        `}
        </Script>
        <Analytics />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Fragment>
  )
}

OBYApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  let guestCartId = getGuestCartIdSSRAndCSR(appContext.ctx)
  // eslint-disable-next-line prefer-const
  let [userToken, userProfile, cartId] = getTokenSSRAndCSR(appContext.ctx)

  let setCookieHeader = ''

  if (!userToken && !guestCartId) {
    const { data: generatedGuestCartId } = await cartApi.GenerateGuestCart()
    guestCartId = generatedGuestCartId

    /* Serialize GuestCartId To Cookie */
    const cookieStr = cookie.serialize('guestCartId', guestCartId, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/'
    })
    setCookieHeader = cookieStr

    userProfile = null
    cartId = null
  }

  if (userToken) {
    // Remove previous guestCartId cookie if it exists
    if (appContext.ctx.req?.headers.cookie) {
      const parsedCookies = cookie.parse(appContext.ctx.req?.headers.cookie)
      const previousGuestCartId = parsedCookies.guestCartId

      if (previousGuestCartId) {
        const previousCookieStr = cookie.serialize('guestCartId', previousGuestCartId, {
          expires: new Date(0),
          path: '/'
        })
        setCookieHeader = previousCookieStr
      }
    }
    guestCartId = null
  } else if (cartId && userProfile && guestCartId) {
    setCookieHeader = '' // Clear cookies
    userProfile = null
    cartId = null
  }
  appContext.ctx.res?.setHeader('Set-Cookie', setCookieHeader)

  return {
    pageProps: {
      ...appProps.pageProps,
      guestCartId,
      userToken,
      userProfile,
      cartId
    },
    setCookieHeader
  }
}

export default OBYApp
