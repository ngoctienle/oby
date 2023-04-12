import '@/styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Cookies from 'js-cookie'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import Script from 'next/script'
import NextNProgress from 'nextjs-progressbar'
import { Fragment, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import { useGlobalState } from '@/libs/state'
import twclsx from '@/libs/twclsx'

import cartApi from '@/apis/cart.api'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ToTopButton } from '@/components/UI/Button'

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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [guestCartId, setGuestCartId] = useGlobalState('guestCartId')
  const [user] = useGlobalState('user')

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }

    if (!guestCartId && !user) {
      cartApi
        .GenerateGuestCart()
        .then((response) => {
          const data = response.data
          const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000) /* 1 Days from Created */
          setGuestCartId(data)
          Cookies.set('guestCartId', data, { expires: expireTime })
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events])

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <NextNProgress height={2} startPosition={0.3} stopDelayMs={200} showOnShallow={true} color='#4AA02C' />
          {/* <HeaderAds /> */}
          <Header font={inter} />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
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
          <Script id='tawk' strategy='lazyOnload'>
            {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6406b5d84247f20fefe462fa/1gqt3clk5';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();  
        `}
          </Script>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </Fragment>
  )
}
