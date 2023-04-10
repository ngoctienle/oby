/* eslint-disable @next/next/no-img-element */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { CartRequest } from '@/@types/cart.type'

import { useGlobalState } from '@/libs/state'

import { formatCurrency, getDiscountPercent, getIdFromNameId, getSKUFromNameId } from '@/helpers'
import { generateProductImageFromMagento, getDescription, getDiscount, isHaveDiscount } from '@/helpers/product'

import cartApi from '@/apis/cart.api'
import categoryApi from '@/apis/category.api'
import productApi from '@/apis/product.api'

import { cacheTime } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import ProductRating from '@/components/ProductRating'
import QuantityController from '@/components/QuantityController'
import { AddCartButton, BuyNowButton } from '@/components/UI/Button'
import { OBYCommentIcon } from '@/components/UI/OBYIcons'

export default function ProductDetail() {
  const [guestCartId] = useGlobalState('guestCartId')
  const imgRef = useRef<HTMLImageElement>(null)
  const [buyCount, setBuyCount] = useState(1)

  const queryClient = useQueryClient()
  const router = useRouter()
  const { slug } = router.query

  const subId = (slug && getIdFromNameId(slug as string)) || ''
  const sku = (slug && getSKUFromNameId(slug as string)) || ''

  const { data: subCategoryRes } = useQuery({
    queryKey: ['subcategory', subId],
    queryFn: () => categoryApi.GetCategoryNameById(subId),
    enabled: !!subId,
    staleTime: cacheTime.halfHours
  })

  const parentCategoryID = (subCategoryRes && subCategoryRes.data.parent_id.toString()) || ''

  const { data: parentCategoryRes } = useQuery({
    queryKey: ['parentcategory', parentCategoryID],
    queryFn: () => categoryApi.GetCategoryNameById(parentCategoryID),
    enabled: !!parentCategoryID,
    staleTime: cacheTime.halfHours
  })

  const { data: productRes } = useQuery({
    queryKey: ['productdetail', sku],
    queryFn: () => productApi.GetProductDetailBySKU(sku),
    enabled: !!sku,
    staleTime: cacheTime.fiveMinutes
  })

  const productData = productRes && productRes.data

  const subName = useMemo(() => subCategoryRes?.data?.name, [subCategoryRes])
  const parentName = useMemo(() => parentCategoryRes?.data?.name, [parentCategoryRes])
  const productName = useMemo(() => productData?.name, [productData])

  const addToCartMutation = useMutation((body: CartRequest) => cartApi.AddToCart(guestCartId as string, body))

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { cartItem: { sku: sku, qty: buyCount } },
      {
        onSuccess: () => {
          toast.success('Thêm vào giỏ hàng thành công!')
          queryClient.invalidateQueries({
            queryKey: ['guestCart', guestCartId]
          })
        },
        onError: () => {
          toast.error('Vui lòng thử lại!')
        }
      }
    )
  }

  if (!subName || !parentName || !productData) {
    return null
  }

  /* Animation on Image */
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
      <Breadcrumb cateName={parentName as string} subCateName={subName as string} productName={productName as string} />
      <div className='container'>
        <div className='grid grid-cols-12 gap-10 mb-10'>
          <div className='col-span-5'>
            <div
              className='relative w-full pt-[56%] cursor-zoom-in overflow-hidden rounded-tl-4 rounded-br-4'
              onMouseMove={handleZoom}
              onMouseLeave={handleRemoveZoom}
            >
              <img
                src={generateProductImageFromMagento(productData.custom_attributes)}
                alt='alt'
                className='pointer-events-none absolute w-full h-full top-0 inset-0 object-cover bg-white'
                ref={imgRef}
              />
            </div>
            <div className='relative mt-4 grid grid-cols-5 gap-1 md:gap-2 lg:mt-6 '>
              <button
                className='absolute -left-1 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-left-3'
                /* onClick={prevSlide} */
              >
                <ChevronLeftIcon className='h-4 w-4' />
              </button>
              {Array(5)
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
                className='absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-right-3'
                /* onClick={nextSlide} */
              >
                <ChevronRightIcon className='h-4 w-4' />
              </button>
            </div>
          </div>
          <div className='col-span-7'>
            <h1 className='font-semibold fs-24'>{productName}</h1>
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
              {isHaveDiscount(productData.custom_attributes) ? (
                <>
                  <p className='fs-26 font-semibold'>{getDiscount(productData.custom_attributes)}</p>
                  <p className='fs-18 line-through text-oby-676869'>{formatCurrency(productData.price)}</p>
                  <p className='fs-14 text-oby-orange px-1.5 py-0.75 rounded-lg border border-oby-orange'>
                    {getDiscountPercent(productData.custom_attributes)}
                  </p>
                </>
              ) : (
                <p className='fs-26 font-semibold text-oby-orange'>{formatCurrency(productData.price)}</p>
              )}
            </div>
            <div className='flex max-w-max items-center gap-4 mt-6'>
              <p className='uppercase font-semibold fs-14'>mua</p>
              <QuantityController
                classNameWrapper='max-w-max'
                onDecrease={handleBuyCount}
                onIncrease={handleBuyCount}
                onTyping={handleBuyCount}
                value={buyCount}
                max={productData.extension_attributes.stock_item.qty}
              />
            </div>
            <div className='mt-6 flex items-center gap-5'>
              <AddCartButton
                className='min-w-[270px]'
                onClick={handleAddToCart}
                isloading={addToCartMutation.isLoading}
              />
              <BuyNowButton className='min-w-[270px]' />
            </div>
          </div>
        </div>
        <div className='pt-15 border-t border-t-oby-primary'>
          <h2 className='fs-26 font-bold text-oby-green'>Chi tiết sản phẩm</h2>
          <div
            className='fs-18 mt-7.5'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(getDescription(productData.custom_attributes) as string)
            }}
          ></div>
        </div>
      </div>
    </section>
  )
}
