import { HomeLayout } from '@/layouts'

import Banner from '@/components/Banner'
import ProductSuggest from '@/components/ProductSuggest'

export default function Home() {
  return (
    <>
      <Banner />

      <HomeLayout>
        <ProductSuggest />
      </HomeLayout>
    </>
  )
}
