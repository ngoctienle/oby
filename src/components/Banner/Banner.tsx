import Image from 'next/image'
import { Autoplay, EffectFade, Lazy, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useMediaQuery } from '@/hooks'

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
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false
      }}
      modules={[EffectFade, Navigation, Pagination, Lazy, Autoplay]}
      className='obyBanner relative'
    >
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index} className='relative'>
            <div className='relative w-full aspect-[1920/600]'>
              <Image
                priority
                fill
                alt='Ông Bà Yêu Banner'
                src={`/images/oby-banner-${index + 1}.webp`}
                className='abosolute'
                style={{ objectPosition: 'center', objectFit: 'cover' }}
                loader={({ src }) => src}
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  ) : (
    <div className='container mt-4'>
      <Swiper
        effect={'fade'}
        navigation={true}
        lazy={{
          loadPrevNext: true
        }}
        pagination={{
          clickable: true
        }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        modules={[EffectFade, Navigation, Pagination, Lazy, Autoplay]}
        className='obyBanner relative'
      >
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index} className='relative'>
              <div className='relative w-full aspect-[1920/600] min-h-[170px] rounded-2.5 overflow-hidden'>
                <Image
                  priority
                  fill
                  alt='Ông Bà Yêu Banner'
                  src={`/images/oby-banner-${index + 1}.webp`}
                  className='absolute'
                  style={{ objectPosition: 'center', objectFit: 'cover' }}
                  loader={({ src }) => src}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
