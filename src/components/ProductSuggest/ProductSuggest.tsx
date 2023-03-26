import { Autoplay, EffectFade, Lazy, Pagination } from 'swiper'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

/* import Product from '@/components/Product' */

export default function ProductSuggest() {
  return (
    <>
      <h2 className='fs-26 text-oby-green font-bold mb-7.5'>Gợi ý hôm nay</h2>
      <Swiper
        lazy={true}
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        slidesPerView={4}
        spaceBetween={40}
        modules={[Pagination, Lazy, EffectFade, Autoplay]}
        className='suggestProduct'
      >
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index}>{/* <Product /> */}</SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
