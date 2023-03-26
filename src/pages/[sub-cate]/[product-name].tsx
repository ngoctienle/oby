/* eslint-disable @next/next/no-img-element */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useRef } from 'react'

import Breadcrumb from '@/components/Breadcrumb'
import ProductRating from '@/components/ProductRating'
import { OBYCommentIcon } from '@/components/UI/OBYIcons'

export default function ProductDetail() {
  const imgRef = useRef<HTMLImageElement>(null)

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const img = imgRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = img
    const { offsetY, offsetX } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    img.style.width = naturalWidth + 'px'
    img.style.height = naturalHeight + 'px'
    img.style.maxWidth = 'unset'
    img.style.top = top + 'px'
    img.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imgRef.current?.removeAttribute('style')
  }

  /*  const hoverActive = (img: string) => {
    setActiveImage(img)
  }

  const nextSlide = () => {
    if (curIndexImage[1] < (productDetail as ProductType)?.images.length) {
      setCurIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevSlide = () => {
    if (curIndexImage[0] > 0) {
      setCurIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  } */

  return (
    <section className='pt-4'>
      <Breadcrumb />
      <div className='container'>
        <div className='grid grid-cols-12 gap-10'>
          <div className='col-span-5'>
            <div
              className='relative w-full pt-[56%] cursor-zoom-in overflow-hidden rounded-tl-4 rounded-br-4'
              onMouseMove={handleZoom}
              onMouseLeave={handleRemoveZoom}
            >
              <img
                src='/images/pd-img.png'
                alt='alt'
                className='pointer-events-none absolute w-full h-full top-0 inset-0 object-cover bg-white'
                ref={imgRef}
              />
            </div>
            <div className='relative mt-4 grid grid-cols-4 gap-2 md:gap-3 lg:mt-6 '>
              <button
                className='absolute -left-4 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-left-5'
                /* onClick={prevSlide} */
              >
                <ChevronLeftIcon className='h-4 w-4' />
              </button>
              {Array(4)
                .fill(0)
                .map((_, index) => {
                  /* const isActive = img === activeImage */
                  return (
                    <div
                      className='z-1 relative w-full overflow-hidden rounded-tl-4 rounded-br-4 pt-[56%]'
                      key={index}
                      /* onMouseEnter={() => hoverActive(img)} */
                    >
                      <Image src='/images/pd-img.png' alt='alt' fill className='pointer-events-none object-cover' />

                      {/*  {isActive && <div className='absolute inset-0 rounded-8 border border-primary-FFB700'></div>} */}
                    </div>
                  )
                })}
              <button
                className='absolute -right-4 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-right-5'
                /* onClick={nextSlide} */
              >
                <ChevronRightIcon className='h-4 w-4' />
              </button>
            </div>
          </div>
          <div className='col-span-7'>
            <h1 className='font-semibold fs-24'>Nước Hồng Sâm Đông Trùng Hạ Thảo Daesan Hàn Quốc 70ml x 20 gói</h1>
            <div className='flex items-center mt-5'>
              <div className='flex items-center gap-2'>
                <ProductRating rating={4.34} />
                <p className='fs-14'>101 đánh giá</p>
              </div>
              <div className='flex items-center gap-2 ml-[80px]'>
                <OBYCommentIcon className='w-6 h-6 text-oby-676869' />
                <p className='fs-14'>74 thảo luận</p>
              </div>
            </div>
            <div className='bg-oby-F6F7F8 px-5 py-4 rounded-4 max-w-max flex items-center gap-4 mt-6.25'>
              <p className='fs-26 font-semibold'>1.699.000₫</p>
              <p className='fs-18 line-through text-oby-676869'>1.999.000₫</p>
              <p className='fs-14 text-oby-orange px-1.5 py-0.75 rounded-lg border border-oby-orange'>-15%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
