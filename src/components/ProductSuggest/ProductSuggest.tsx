import { useQuery } from '@tanstack/react-query'
import { Autoplay, EffectFade, Lazy, Pagination } from 'swiper'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

/* import { getCateId } from '@/helpers/product'

import categoryApi from '@/apis/magento/category.api' */
import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

import Product from '@/components/Product'

export default function ProductSuggest() {
  const { data: productSgRes } = useQuery({
    queryKey: ['productSg'],
    queryFn: () => productApi.GetProductByCategoryID(82, '1', '100'),
    staleTime: cacheTime.halfHours
  })

  /* const productSgCate = useQueries({
    queries: [
      ...(productSgRes?.data.items || []).map((item) => {
        const id = getCateId(item.custom_attributes)
        return {
          queryKey: ['productSgCate', id],
          queryFn: () => categoryApi.GetCategoryNameById(id as string),
          enabled: Boolean(productSgRes)
        }
      })
    ]
  }) */

  return (
    <>
      <h2 className='@992:fs-26 fs-20 text-oby-green font-bold @992:mb-7.5 mb-4'>Gợi ý hôm nay</h2>
      <Swiper
        lazy={true}
        slidesPerView={2}
        pagination={{
          clickable: true
        }}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 40
          }
        }}
        modules={[Pagination, Lazy, EffectFade, Autoplay]}
        className='suggestProduct @992:mb-[60px] mb-[40px]'
      >
        {productSgRes &&
          productSgRes.data.items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Product data={item} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </>
  )
}
