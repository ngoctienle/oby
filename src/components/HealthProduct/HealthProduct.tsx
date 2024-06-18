import CateTag from '../CateTag'
import Product from '../Product'
import { AGRGradientLeftArrowIcon, AGRGradientRightArrowIcon } from '../UI/AGRIcons'
import { OBYImage } from '../UI/Element'
import GradientButton from '../UI/GradientButton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRef } from 'react'
import { EffectFade, Lazy, Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

const DUMMY_SUB_CATE = [
  { id: 1, name: 'Sữa dinh dưỡng' },
  { id: 2, name: 'Thức uống dinh dưỡng' },
  { id: 3, name: 'Ngũ cốc & hạt' },
  { id: 4, name: 'Thực phẩm bổ sung' },
  { id: 5, name: 'Vitamin & thực phẩm chức năng' }
]

export const HealthProduct = () => {
  const swiperRef = useRef<SwiperType | null>(null)

  const { data: healthProduct, isLoading } = useQuery({
    queryKey: ['healthProduct'],
    queryFn: () => productApi.GetProductByCategoryID(46, '1', '1'),
    staleTime: cacheTime.halfHours
  })

  const handleClickChangeSlide = (type: string) => {
    if (swiperRef.current) {
      if (type === 'next') {
        swiperRef.current.slideNext()
      } else {
        swiperRef.current.slidePrev()
      }
    }
  }
  return (
    <div className='bg-[#F6F6F6]'>
      <div className='container py-4 flex flex-col'>
        <h2 className='text-oby-primary fs-14 font-normal mb-2 @992:text-center'>DANH MỤC</h2>
        <p className='text-[#222324] fs-26 font-bold mb-2 @992:text-center'>SỨC KHỎE</p>
        <div className='flex flex-row gap-3 @992:justify-center overflow-x-auto scrollbar-none'>
          {DUMMY_SUB_CATE.map((item) => {
            return <CateTag key={item.id} data={item} />
          })}
        </div>
        <div className='h-[1px] w-full bg-white my-4' />
        <div className='h-[46px] w-full relative my-4'>
          <Swiper
            lazy={true}
            slidesPerView={10}
            loop={true}
            spaceBetween={16}
            modules={[Lazy, EffectFade]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            className='labelSwiper'
          >
            {Array(10)
              .fill(0)
              .map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <OBYImage src={`/images/label-${index}.svg`} display='responsive' alt={`label-${index}`} />
                  </SwiperSlide>
                )
              })}
          </Swiper>
          <div className='absolute w-full @992:flex flex-row justify-between items-center bottom-0 top-0 hidden'>
            <button className='w-8 h-8' onClick={() => handleClickChangeSlide('prev')}>
              <AGRGradientLeftArrowIcon className='' />
            </button>
            <button className='w-8 h-8' onClick={() => handleClickChangeSlide('next')}>
              <AGRGradientRightArrowIcon className='' />
            </button>
          </div>
        </div>
        <div className='flex flex-row justify-start gap-6 mt-11'>
          <div className='w-1/4 @992:flex flex-shrink-0 relative hidden h-[580px] rounded-2'>
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-6.png`}
              fill
              style={{ objectPosition: 'center', objectFit: 'contain' }}
              loader={({ src }) => src}
              unoptimized
            />
            <div className='absolute bottom-6 left-8'>
              <GradientButton btnText='XEM NGAY' url='/' isBorder={false} />
            </div>
          </div>
          <div className='flex-grow overflow-hidden max-h-[590px]'>
            <div className='grid grid-cols-3 gap-4'>
              {healthProduct &&
                !isLoading &&
                healthProduct.data.items.map((item) => {
                  return <Product data={item} key={item.id} />
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
