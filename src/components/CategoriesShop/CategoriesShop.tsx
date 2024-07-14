import { AGRGradientLeftArrowIcon, AGRGradientRightArrowIcon } from '../UI/AGRIcons'
import { OBYImage, OBYLink } from '../UI/Element'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useMemo, useRef } from 'react'
import { EffectFade, Lazy, Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ItemWithAttribute } from '@/@types/category.type'

import { createSlug } from '@/helpers'
import { generateCategoryImageFromMagento, getIDListCategoryAsString, getParentCategory } from '@/helpers/category'

import categoryApi from '@/apis/magento/category.api'

import { cacheTime, customClasses } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

// import { Autoplay, EffectFade, Lazy, Navigation, Pagination } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'

export const CategoriesShop = () => {
  const swiperRef = useRef<SwiperType | null>(null)

  const { data: parentCategoryRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.GetCategoryList()
    },
    staleTime: cacheTime.halfHours
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parentCategory = (parentCategoryRes && getParentCategory(parentCategoryRes.data)) || []

  const { data: parentCategoryAttrRes } = useQuery({
    queryKey: ['categoryAttr'],
    queryFn: () => categoryApi.GetAttrCategoryById(getIDListCategoryAsString(parentCategory)),
    enabled: parentCategory.length > 0,
    staleTime: cacheTime.halfHours
  })

  const parentCategoryItem = useMemo(() => {
    return parentCategoryAttrRes?.data.items as ItemWithAttribute[]
  }, [parentCategoryAttrRes])

  const initializeCategory = useMemo(() => {
    return parentCategory.map((category) => {
      const categoryItem = parentCategoryItem?.find((item) => item.id === category.id)
      const customAttributes = categoryItem?.custom_attributes || []

      return {
        ...category,
        custom_attributes: customAttributes
      }
    })
  }, [parentCategory, parentCategoryItem])

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
    <div className='bg-white'>
      <div className='container pt-8'>
        <div className='flex @992:flex-row flex-col gap-6'>
          <div className='@992:block flex flex-col @992:w-1/3 flex-shrink-0'>
            <p className='text-oby-primary fs-14 font-normal'>MUA SẮM THEO</p>
            <p className='text-[#222324] fs-26 font-bold'>DANH MỤC SẢN PHẨM</p>
            <div className='@992:flex flex-row items-center gap-2 mt-4 hidden'>
              <button className='w-8 h-8' onClick={() => handleClickChangeSlide('prev')}>
                <AGRGradientLeftArrowIcon className='' />
              </button>
              <button className='w-8 h-8' onClick={() => handleClickChangeSlide('next')}>
                <AGRGradientRightArrowIcon className='' />
              </button>
            </div>
          </div>
          <div className='relative h-[160px]'>
            <Swiper
              lazy={true}
              slidesPerView={5}
              loop={true}
              spaceBetween={24}
              breakpoints={{
                992: {
                  slidesPerView: 5,
                  spaceBetween: 24
                }
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              modules={[Lazy, EffectFade]}
              className='categories @992:my-[30px] my-4'
            >
              {initializeCategory
                ?.filter((item) => item.is_active)
                .map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <OBYLink
                        href={`${hrefPath.catePage}/${createSlug(item.name)}-${item.id}`}
                        className={`group h-full w-[132px] rounded-xl bg-[#FAFAFA] hover:bg-[#CEFF27] flex flex-col items-center p-4 gap-3`}
                      >
                        <div className='w-[60px] h-[60px] relative overflow-hidden  flex-shrink-0'>
                          <OBYImage
                            src={generateCategoryImageFromMagento(item.custom_attributes)}
                            display='responsive'
                            alt={item.name}
                            title={item.name}
                            className='object-cover'
                          />
                        </div>
                        {/* <div className='h-[2px] w-15 bg-[#D9D9D94D] my-3'></div> */}
                        <p
                          className={`text-center ${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text fs-16 font-normal line-clamp-2 pt-3 border-t-2 border-[#D9D9D94D]`}
                        >
                          {item.name}
                        </p>
                      </OBYLink>
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          </div>
        </div>
        {/* <div className='@992:flex @992:flex-row items-center @992:gap-6 hidden'>
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
            <div className='absolute bottom-6 right-4 w-[180px]'>
              <GradientButtonLink btnText='XEM NGAY' url='/' isBorder={false} />
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
            <div className='absolute bottom-6 left-32 w-[180px]'>
              <GradientButtonLink btnText='XEM NGAY' url='/' isBorder={false} />
            </div>
          </div>
        </div> */}

        <div className='@992:grid hidden grid-cols-3 gap-6 mt-12'>
          <OBYLink
            href={'/danh-muc/goi-y-hom-nay-48'}
            className='col-span-1 w-full h-[260px] relative rounded-4 overflow-hidden'
          >
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-4.png`}
              fill
              style={{ objectPosition: 'center', objectFit: 'cover' }}
              loader={({ src }) => src}
            />
            {/* <div className='absolute bottom-6 right-4 w-[180px]'>
              <GradientButtonLink btnText='XEM NGAY' url='/' isBorder={false} />
            </div> */}
          </OBYLink>
          <OBYLink
            href={'/danh-muc/khuyen-mai-soc-37'}
            className='col-span-2 w-full  h-[260px] relative rounded-4 overflow-hidden'
          >
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-5.png`}
              fill
              style={{ objectPosition: 'center', objectFit: 'cover' }}
              loader={({ src }) => src}
            />
            {/* <div className='absolute bottom-6 left-40 w-[180px]'>
              <GradientButtonLink btnText='XEM NGAY' url='/' isBorder={false} />
            </div> */}
          </OBYLink>
        </div>
      </div>
    </div>
  )
}
