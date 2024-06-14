import {
  AGRCherryCategory,
  AGRFisrtAidKitCategory,
  AGRFoodDeliveryCategory,
  AGRGradientLeftArrowIcon,
  AGRGradientRightArrowIcon,
  AGRHarvestCategory,
  AGRPromotionCategory
} from '../UI/AGRIcons'
import GradientButton from '../UI/GradientButton'
import Image from 'next/image'

// import { Autoplay, EffectFade, Lazy, Navigation, Pagination } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'

export const CategoriesShop = () => {
  const DUMMY_CATES = [
    { id: 1, icons: <AGRPromotionCategory className='w-[52px] h-[52px]' />, name: 'KHUYẾN MÃI SỐC' },
    { id: 2, icons: <AGRFisrtAidKitCategory className='w-[52px] h-[52px]' />, name: 'SỨC KHỎE' },
    { id: 3, icons: <AGRHarvestCategory className='w-[52px] h-[52px]' />, name: 'NÔNG SẢN SẠCH' },
    { id: 4, icons: <AGRCherryCategory className='w-[52px] h-[52px]' />, name: 'THỰC PHẨM TƯƠI' },
    { id: 5, icons: <AGRFoodDeliveryCategory className='w-[52px] h-[52px]' />, name: 'THỰC PHẨM ĐÓNG GÓI' }
  ]

  return (
    <div className='bg-white'>
      <div className='container pt-8'>
        <div className=' flex flex-row items-center gap-6'>
          <div className='w-1/3 flex-shrink-0 py-7'>
            <p className='text-oby-primary fs-14 font-normal'>MUA SẮM THEO</p>
            <p className='text-[#222324] fs-26 font-bold'>DANH MỤC SẢN PHẨM</p>
            <div className='flex flex-row items-center gap-2 mt-4'>
              <button className='w-8 h-8'>
                <AGRGradientLeftArrowIcon className='' />
              </button>
              <button className='w-8 h-8'>
                <AGRGradientRightArrowIcon className='' />
              </button>
            </div>
          </div>
          <div className='flex-grow'>
            <div className='h-[160px] flex flex-row items-center gap-6'>
              {DUMMY_CATES.map((cate, index) => {
                return (
                  <div key={index} className='h-full w-[132px] rounded-xl bg-[#FAFAFA] flex flex-col items-center py-4'>
                    {cate.icons}
                    <div className='h-[2px] w-15 bg-[#D9D9D94D] my-3'></div>
                    <p className='text-center bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange inline-block text-transparent bg-clip-text fs-16 font-normal'>
                      {cate.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className=' flex flex-row items-center gap-6'>
          <div className='w-1/3 flex-shrink-0 mt-14 relative'>
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-4.png`}
              height={242}
              width={421}
              style={{ objectPosition: 'center', objectFit: 'contain' }}
              loader={({ src }) => src}
              unoptimized
            />
            <div className='absolute bottom-6 right-4'>
              <GradientButton btnText='XEM NGAY' url='/' isBorder={false} />
            </div>
          </div>
          <div className='flex-grow mt-1 relative'>
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-5.png`}
              height={242}
              width={720}
              style={{ objectPosition: 'center', objectFit: 'contain' }}
              loader={({ src }) => src}
              unoptimized
            />
            <div className='absolute bottom-6 left-32'>
              <GradientButton btnText='XEM NGAY' url='/' isBorder={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
