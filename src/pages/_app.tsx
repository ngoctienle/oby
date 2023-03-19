import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'

import twclsx from '@/libs/twclsx'

import { ToTopButton } from '@/components/Button'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { HeaderAds } from '@/components/OBYAds'

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
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <HeaderAds />
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
      </QueryClientProvider>
    </Fragment>
  )
}
