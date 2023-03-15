import Product from '../Product/Product'
import { EffectFade, Lazy, Navigation, Pagination } from 'swiper'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

export default function ProductSuggest() {
  return (
    <>
      <h2 className='fs-28 text-oby-primary'>Gợi ý hôm nay</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50
          }
        }}
        modules={[Pagination, Navigation, Lazy, EffectFade]}
        className='mySwiper'
      >
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index}>
              <Product />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
