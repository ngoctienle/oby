import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'

import twclsx from '@/libs/twclsx'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster
        position='top-center'
        reverseOrder={true}
        toastOptions={{
          className: twclsx('rounded-md'),
          duration: 2500
        }}
      />
    </Fragment>
  )
}
