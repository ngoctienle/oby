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
      className='obyBanner'
    >
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <div className='relative w-full aspect-[1920/600]'>
              <OBYImage
                priority
                loading='eager'
                alt='Ông Bà Yêu Banner'
                src={`/images/oby-banner-${index + 1}.webp`}
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
        className='obyBanner'
      >
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index}>
              <div className='relative w-full aspect-[1920/600] min-h-[170px] rounded-2.5 overflow-hidden'>
                <OBYImage
                  priority
                  loading='eager'
                  alt='Ông Bà Yêu Banner'
                  src={`/images/oby-banner-${index + 1}.webp`}
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
