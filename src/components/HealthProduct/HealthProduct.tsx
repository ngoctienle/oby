import Product from '../Product'
import GradientButton from '../UI/GradientButton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Product as ProductType } from '@/@types/product.type'

import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

export const HealthProduct = () => {
  const [dummyData, setDummyData] = useState<ProductType[]>([])
  const { data: healthProduct, isLoading } = useQuery({
    queryKey: ['healthProduct'],
    queryFn: () => productApi.GetProductByCategoryID(20, '1', '9'),
    staleTime: cacheTime.halfHours
  })

  useEffect(() => {
    if (healthProduct && !isLoading) {
      setDummyData([...dummyData, ...healthProduct.data.items])
    }
  }, [healthProduct, isLoading])
  return (
    <div className='bg-[#F6F6F6]'>
      <div className='container py-4 flex flex-col'>
        <h2 className='text-oby-primary fs-14 font-normal mb-2 @992:text-center'>DANH MỤC</h2>
        <p className='text-[#222324] fs-26 font-bold mb-2 @992:text-center'>SỨC KHỎE</p>
        <div className='h-[1px] w-full bg-white my-4' />
        <div className='flex flex-row justify-start gap-6'>
          <div className='w-1/4 @992:flex flex-shrink-0 relative hidden'>
            <Image
              priority
              alt='Agriamazing Banner'
              src={`/images/agr-banner-6.png`}
              height={100}
              width={260}
              style={{ objectPosition: 'center', objectFit: 'cover' }}
              loader={({ src }) => src}
              unoptimized
            />
            <div className='absolute bottom-6 left-8'>
              <GradientButton btnText='XEM NGAY' url='/' isBorder={false} />
            </div>
          </div>
          <div className='flex-grow grid relative @992:grid-cols-3 grid-cols-1 gap-6'>
            {dummyData &&
              !isLoading &&
              dummyData.map((item) => {
                return <Product data={item} key={item.id} />
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
