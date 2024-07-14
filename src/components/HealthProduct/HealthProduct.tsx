import CateTag from '../CateTag'
import Product from '../Product'
import { AGRGradientLeftArrowIcon, AGRGradientRightArrowIcon } from '../UI/AGRIcons'
import { OBYImage, OBYLink } from '../UI/Element'
import { useQueries, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EffectFade, Lazy, Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ProductResponse } from '@/@types/product.type'

import categoryApi from '@/apis/magento/category.api'
import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

export const HealthProduct = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [categoryID, setCategoryID] = useState<number>(46)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allProduct, setAllProduct] = useState<AxiosResponse<ProductResponse, any> | null>(null)

  const {
    data: healthProduct,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['healthProduct', categoryID],
    queryFn: () => productApi.GetProductByCategoryID(categoryID, '1', '0'),
    staleTime: cacheTime.halfHours,
    onSuccess: (res) => {
      if (categoryID !== 46) return
      if (allProduct) return
      setAllProduct(res)
    }
  })
  const getUniqueCategoryIds = useCallback(() => {
    const categoryIds = new Set()

    allProduct?.data.items.forEach((item) => {
      item.custom_attributes.forEach((attr) => {
        if (attr.attribute_code === 'category_ids') {
          if (!Array.isArray(attr.value)) return
          attr.value.forEach((id) => categoryIds.add(parseInt(id, 10)))
        }
      })
    })

    return Array.from(categoryIds)
  }, [allProduct?.data.items])

  useEffect(() => {
    getUniqueCategoryIds()
  }, [allProduct, getUniqueCategoryIds])

  const productHealthCate = useQueries({
    queries: [
      ...(getUniqueCategoryIds() || []).map((item) => {
        const id = item
        return {
          queryKey: ['productHealthCateCate', id],
          queryFn: () => categoryApi.GetCategoryNameById(id as string),
          enabled: true
        }
      })
    ]
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

  const onClickTag = (newId: number | undefined) => {
    if (!newId) return
    setCategoryID(newId)
    refetch({ queryKey: ['healthProduct', newId] })
  }

  const renderSection = () => {
    if (isLoading) {
      return (
        <div className='grid grid-cols-4 gap-6 @992:mt-15 mt-4 w-full @992:min-h-[580px]'>
          <OBYLink href={'/danh-muc/suc-khoe-46'} className='col-span-1 @992:block hidden relative rounded-2'>
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-6.png`}
              fill
              style={{ objectPosition: 'center', objectFit: 'cover', borderRadius: 8 }}
              loader={({ src }) => src}
            />
          </OBYLink>
          <div className='@992:col-span-3 col-span-4'>
            <div className='grid @992:grid-cols-3 grid-flow-col grid-rows-2 @992:gap-6 gap-4 overflow-x-auto scrollbar-none'>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <div key={index}>
                    <div className='flex items-center justify-center h-48 mb-4 bg-oby-primary/10 rounded'>
                      <svg
                        className='w-12 h-12 text-oby-primary/20'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 640 512'
                      >
                        <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                      </svg>
                    </div>
                    <div className='h-2.5 bg-oby-primary/10 rounded-full w-48 mb-4' />
                    <div className='h-2 bg-oby-primary/10 rounded-full mb-2.5' />
                    <span className='sr-only'>Loading...</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )
    }
    if (!isLoading && healthProduct) {
      if (healthProduct.data.items.length === 0) return <div className='mt-4' />
      return (
        <div className='grid grid-cols-4 gap-6 @992:mt-15 mt-4 w-full @992:min-h-[580px]'>
          <OBYLink href={'/danh-muc/suc-khoe-46'} className='col-span-1 @992:block hidden relative rounded-2'>
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-6.png`}
              fill
              style={{ objectPosition: 'center', objectFit: 'cover', borderRadius: 8 }}
              loader={({ src }) => src}
            />
            {/* <div className='absolute bottom-6 left-10 w-[180px]'>
              <GradientButtonLink btnText='XEM NGAY' url='/' isBorder={false} />
            </div> */}
          </OBYLink>
          <div className='@992:col-span-3 col-span-4'>
            <div className='grid @992:grid-cols-3 grid-flow-col grid-rows-2 @992:gap-6 gap-4 overflow-x-auto scrollbar-none'>
              {healthProduct.data.items.slice(0, 6).map((item) => (
                <div key={item.id} className='@992:col-span-1 row-span-1 flex'>
                  <Product data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='bg-[#F6F6F6]'>
      <div className='container py-4 flex flex-col @992:items-center'>
        <h2 className='text-oby-primary fs-14 font-normal mb-2 @992:text-center'>DANH MỤC</h2>
        <p className='text-[#222324] fs-26 font-bold mb-2 @992:text-center'>SỨC KHỎE</p>
        <div className='@992:w-[800px] w-full flex flex-row gap-3 overflow-x-auto @992:scrollbar-thin scrollbar-none'>
          {productHealthCate.map((item, index) => {
            return <CateTag key={index} data={item.data?.data} onClickTag={onClickTag} />
          })}
        </div>
        <div className='h-[1px] w-full bg-white mt-4' />
        <div className='h-[46px] w-full relative mt-4'>
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
        {renderSection()}
        {/* <div className='grid grid-cols-4 gap-6 @992:mt-15 mt-4 w-full @992:min-h-[580px]'>
          <div className='col-span-1 @992:block hidden relative rounded-2'>
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-6.png`}
              fill
              style={{ objectPosition: 'left', objectFit: 'contain' }}
              loader={({ src }) => src}
            />
            <div className='absolute bottom-6 left-10 w-[180px]'>
              <GradientButtonLink btnText='XEM NGAY' url='/' isBorder={false} />
            </div>
          </div>
          <div className='@992:col-span-3 col-span-4'>
            <div className='grid @992:grid-cols-3 grid-flow-col grid-rows-2 @992:gap-6 gap-4 overflow-x-auto scrollbar-none'>
              {healthProduct && !isLoading ? (
                healthProduct.data.items.slice(0, 6).map((item) => (
                  <div key={item.id} className='@992:col-span-1 row-span-1 flex'>
                    <Product data={item} />
                  </div>
                ))
              ) : (
                <>
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <div className='flex items-center justify-center h-48 mb-4 bg-oby-primary/10 rounded'>
                          <svg
                            className='w-12 h-12 text-oby-primary/20'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            fill='currentColor'
                            viewBox='0 0 640 512'
                          >
                            <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                          </svg>
                        </div>
                        <div className='h-2.5 bg-oby-primary/10 rounded-full w-48 mb-4' />
                        <div className='h-2 bg-oby-primary/10 rounded-full mb-2.5' />
                        <span className='sr-only'>Loading...</span>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
