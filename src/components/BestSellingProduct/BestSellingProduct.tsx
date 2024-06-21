import Product from '../Product'
import GradientButton from '../UI/GradientButton'
import { useQuery } from '@tanstack/react-query'
import { EffectFade, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useMediaQuery } from '@/hooks'

import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

export const BestSellingProduct = () => {
  const isMedium = useMediaQuery('(min-width:992px)')

  const { data: bestSellingProduct, isLoading } = useQuery({
    queryKey: ['bestSellingProduct'],
    queryFn: () => productApi.GetProductByCategoryID(45, '1', '0'),
    staleTime: cacheTime.halfHours
  })

  return (
    <div className='bg-white'>
      <div className='container pt-8 pb-4 flex flex-col @992:items-center'>
        <h2 className='text-oby-primary fs-14 font-normal'>SẢN PHẨM</h2>
        <p className='text-[#222324] fs-26 font-bold mt-2'>TOP SẢN PHẨM BÁN CHẠY</p>
        <Swiper
          lazy={true}
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
          modules={[Lazy, EffectFade]}
          className='suggestProduct @992:my-[30px] my-4'
        >
          {bestSellingProduct && !isLoading ? (
            bestSellingProduct.data.items.slice(0, 4).map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <Product data={item} />
                </SwiperSlide>
              )
            })
          ) : (
            <div className='grid @992:grid-cols-4 @768:grid-cols-3 grid-cols-2 @992:gap-10 gap-5 @992:my-[30px] my-4'>
              {Array(isMedium ? 4 : 2)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
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
          )}
        </Swiper>
        <div className='w-[194px] self-center'>
          <GradientButton url='/' btnText='XEM TẤT CẢ' />
        </div>
      </div>
    </div>
  )
}
