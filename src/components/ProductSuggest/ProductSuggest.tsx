import Product from '../Product/Product'
import { Autoplay, EffectFade, Lazy, Pagination } from 'swiper'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

export default function ProductSuggest() {
  return (
    <>
      <h2 className='fs-28 text-oby-green font-bold mb-[30px]'>Gợi ý hôm nay</h2>
      <Swiper
        slidesPerView={4}
        lazy={true}
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        spaceBetween={40}
        modules={[Pagination, Lazy, EffectFade, Autoplay]}
        className='suggestProduct'
      >
        {Array(8)
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
