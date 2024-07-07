import Product from '../Product'
import GradientButtonLink from '../UI/GradientButtonLink'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useMediaQuery } from '@/hooks'

import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

export default function SaleProduct() {
  const isMedium = useMediaQuery('(min-width:992px)')

  const [currentTime, setCurrentTime] = useState(new Date())

  const targetTime = new Date('2024-07-08')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const { data: saleProduct, isLoading } = useQuery({
    queryKey: ['saleProduct'],
    queryFn: () => productApi.GetProductByCategoryID(37, '1', '5'),
    staleTime: cacheTime.halfHours
  })

  // const { data: parentCategoryAttrRes } = useQuery({
  //   queryKey: ['categoryAttr'],
  //   queryFn: () => categoryApi.GetAttrCategoryById(saleProduct),
  //   enabled: parentCategory.length > 0,
  //   staleTime: cacheTime.halfHours
  // })

  const getRemainingTime = (): { hours: number; minutes: number; seconds: number } => {
    const totalMs = targetTime.getTime() - currentTime.getTime()
    const seconds = Math.floor((totalMs / 1000) % 60)
    const minutes = Math.floor((totalMs / (1000 * 60)) % 60)
    const hours = Math.floor(totalMs / (1000 * 60 * 60)) // Ensures maximum of 23 hours displayed

    return { hours, minutes, seconds }
  }

  const { hours, minutes, seconds } = getRemainingTime()

  const renderSection = () => {
    if (isLoading) {
      return (
        <div className='grid grid-flow-col grid-rows-1 @992:gap-[30px] gap-4 overflow-x-auto scrollbar-none @992:my-[30px] my-4'>
          {Array(isMedium ? 5 : 2)
            .fill(0)
            .map((_, index) => (
              <div className='row-span-1' key={index}>
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
      )
    }
    if (!isLoading && saleProduct) {
      if (saleProduct.data.items.length === 0) return <div className='my-4' />
      return (
        <>
          <div className='grid grid-flow-col grid-rows-1 @992:gap-[30px] gap-4 overflow-x-auto scrollbar-none @992:my-[30px] my-4'>
            {saleProduct.data.items.slice(0, 5).map((item) => {
              return (
                <div key={item.id} className=''>
                  <Product data={item} />
                </div>
              )
            })}
          </div>
          <div className='w-[194px] self-center'>
            <GradientButtonLink url={`${hrefPath.catePage}/khuyen-mai-soc-37`} btnText='XEM TẤT CẢ' />
          </div>
        </>
      )
    }
  }

  return (
    <div className='bg-[#F6F6F6]'>
      <div className='container py-7 flex flex-col'>
        <div className='flex flex-col items-center'>
          <h2 className='fs-14 text-oby-primary mb-1'>DANH MỤC</h2>
          <p className='fs-26 font-bold mb-2'>KHUYẾN MÃI SỐC</p>
          <p className='fs-14 text-black mb-2'>KẾT THÚC TRONG</p>
          <div className='flex flex-row items-center gap-2 text-oby-primary'>
            <div className='bg-oby-primary rounded-2 text-white w-[38px] h-[34px] flex justify-center flex-col items-center'>
              {hours.toString().padStart(2, '0')}
            </div>
            :
            <div className='bg-oby-primary rounded-2 text-white w-[38px] h-[34px] flex justify-center flex-col items-center'>
              {minutes.toString().padStart(2, '0')}
            </div>
            :
            <div className='bg-oby-primary rounded-2 text-white w-[38px] h-[34px] flex justify-center flex-col items-center'>
              {seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
        {renderSection()}
        {/* <div className='grid grid-flow-col grid-rows-1 @992:gap-[30px] gap-4 overflow-x-auto scrollbar-none @992:my-[30px] my-4'>
          {saleProduct && !isLoading ? (
            saleProduct.data.items.slice(0, 5).map((item) => {
              return (
                <div key={item.id} className=''>
                  <Product data={item} />
                </div>
              )
            })
          ) : (
            <>
              {Array(isMedium ? 5 : 2)
                .fill(0)
                .map((_, index) => (
                  <div className='row-span-1' key={index}>
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
        <div className='w-[194px] self-center'>
          <GradientButtonLink url={`${hrefPath.catePage}/khuyen-mai-soc-37`} btnText='XEM TẤT CẢ' />
        </div> */}
      </div>
    </div>
  )
}
