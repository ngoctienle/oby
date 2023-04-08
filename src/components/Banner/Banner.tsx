import { EffectFade, Lazy, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { OBYImage } from '@/components/UI/Element'

export default function Banner() {
  return (
    <>
      <div className='@992:block hidden'>
        <Swiper
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
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <div className='relative w-full aspect-[16/6]'>
                  <OBYImage
                    quality={100}
                    alt='img'
                    src='/images/oby-banner.png'
                    display='responsive'
                    style={{ objectPosition: 'center', objectFit: 'cover' }}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='@992:hidden container'>
        <Swiper
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
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <div className='relative w-full aspect-[2/1] rounded-2.5 overflow-hidden'>
                  <OBYImage
                    quality={100}
                    alt='img'
                    src='/images/oby-banner.png'
                    display='responsive'
                    style={{ objectPosition: 'center', objectFit: 'cover' }}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  )
}
