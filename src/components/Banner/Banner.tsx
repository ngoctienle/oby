import { EffectFade, Lazy, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { UnstyledImage } from '@/components/Unstyled'

export default function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        lazy={true}
        pagination={{
          clickable: true
        }}
        modules={[EffectFade, Navigation, Pagination, Lazy]}
        className='obyBanner'
      >
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index}>
              <UnstyledImage alt='img' src='/images/oby-banner.png' height={600} width={1920} className='select-none' />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
