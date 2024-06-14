import GradientButton from '../UI/GradientButton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/swiper.min.css'

import { useMediaQuery } from '@/hooks'

/* import { getCateId } from '@/helpers/product'

import categoryApi from '@/apis/magento/category.api' */
import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

import Product from '@/components/Product'

export default function ProductSuggest() {
  const isMedium = useMediaQuery('(min-width:992px)')

  const { data: productSgRes, isLoading } = useQuery({
    queryKey: ['productSg'],
    queryFn: () => productApi.GetProductByCategoryID(20, '1', '9'),
    staleTime: cacheTime.halfHours
  })

  /* const productSgCate = useQueries({
    queries: [
      ...(productSgRes?.data.items || []).map((item) => {
        const id = getCateId(item.custom_attributes)
        return {
          queryKey: ['productSgCate', id],
          queryFn: () => categoryApi.GetCategoryNameById(id as string),
          enabled: Boolean(productSgRes)
        }
      })
    ]
  }) */

  return (
    <div className='bg-white'>
      <div className='container pt-4 py-8 flex flex-col @992:items-center relative'>
        <h2 className='text-oby-primary fs-14 font-normal mb-2'>DANH MỤC</h2>
        <p className='text-[#222324] fs-26 font-bold mb-2'>GỢI Ý HÔM NAY</p>
        <div className='h-[1px] w-full bg-oby-DFDFDF my-4' />
        <Image
          src={'/images/agr-ads.png'}
          alt='ads-2'
          width={1200}
          height={100}
          style={{
            objectPosition: 'center',
            objectFit: 'contain'
          }}
          loader={({ src }) => src}
          unoptimized
          priority
        />
        <div className='w-full grid @992:grid-cols-2 grid-cols-1 @992:gap-8 @992:my-[30px] my-4'>
          {productSgRes && !isLoading ? (
            productSgRes.data.items.map((item) => {
              return <Product data={item} key={item.id} isHorizontal />
            })
          ) : (
            <>
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
            </>
          )}
        </div>
        <GradientButton url='/' btnText='XEM TẤT CẢ' customClass='self-center' />
        {/* <Swiper
        lazy={true}
        slidesPerView={2}
        pagination={{
          clickable: true
        }}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 40
          }
        }}
        modules={[Pagination, Lazy, EffectFade, Autoplay]}
        className='suggestProduct @992:mb-[60px] mb-[40px]'
      >
        {productSgRes && !isLoading ? (
          productSgRes.data.items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Product data={item} />
              </SwiperSlide>
            )
          })
        ) : (
          <div className='grid @992:grid-cols-4 @768:grid-cols-3 grid-cols-2 @992:gap-10 gap-5'>
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
      </Swiper> */}
      </div>
    </div>
  )
}
