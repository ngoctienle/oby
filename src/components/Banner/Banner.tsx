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
        lazy={{
          loadPrevNext: true
        }}
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
              <div className='relative w-full h-[600px]'>
                <UnstyledImage
                  alt='img'
                  src='/images/oby-banner.png'
                  display='responsive'
                  className='select-none object-cover'
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
