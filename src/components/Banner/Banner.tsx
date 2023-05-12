import { EffectFade, Lazy, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useMediaQuery } from '@/hooks'

import { OBYImage } from '@/components/UI/Element'

export default function Banner() {
  const isMatch = useMediaQuery('(min-width:992px)')

  return isMatch ? (
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
      className='obyBanner !-z-10'
    >
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index} className='!-z-[9]'>
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
  ) : (
    <div className='container'>
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
        className='obyBanner !-z-10'
      >
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index} className='!-z-[9]'>
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
  )
}
