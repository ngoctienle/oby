/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'isomorphic-dompurify'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { CartRequest } from '@/@types/cart.type'
import { Product } from '@/@types/product.type'

import { generateMetaSEO } from '@/libs/seo'
import { useGlobalState } from '@/libs/state'
import { cn } from '@/libs/utils'

import { formatCurrency, getDiscountPercent } from '@/helpers'
import {
  findIDsFromProduct,
  generateProductImageFromMagento,
  getDescription,
  getDiscount,
  isHaveDiscount
} from '@/helpers/product'

import cartApi from '@/apis/magento/cart.api'
import categoryApi from '@/apis/magento/category.api'
import productApi from '@/apis/magento/product.api'

import { MAX_PRODUCT } from '@/constants/config.constant'
import { SITE_URL } from '@/constants/domain.constant'
import { hrefPath } from '@/constants/href.constant'

import Breadcrumb from '@/components/Breadcrumb'
import ProductRating from '@/components/ProductRating'
import QuantityController from '@/components/QuantityController'
import { AsyncButton, BuyNowButton } from '@/components/UI/Button'
import { OBYButton } from '@/components/UI/Element'
import { OBYAddCartIcon, OBYCommentIcon } from '@/components/UI/OBYIcons'
import { OBYSeo } from '@/components/UI/OBYSeo'

interface IProductDetailProps {
  slug: string
  subName: string
  parentName: string
  productName: string
  productData: Product
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export default function ProductDetail({ subName, productData, parentName, productName, slug }: IProductDetailProps) {
  const queryClient = useQueryClient()

  const [guestCartId] = useGlobalState('guestCartId')
  const [token] = useGlobalState('token')
  const [cartId] = useGlobalState('cartId')

  const imgRef = useRef<HTMLImageElement>(null)
  const [buyCount, setBuyCount] = useState<number>(1)
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false)

  /* const [curIndexImage, setCurIndexImage] = useState([0, 5]) */
  const [activeImage, setActiveImage] = useState('')

  const addToCartMutation = useMutation((body: CartRequest) => cartApi.AddToCart(guestCartId as string, body))
  const addToCartMineMutation = useMutation((body: CartRequest) => cartApi.AddToCartMine(token as string, body))

  /**
   * Function `handleBuyCount` được sử dụng để quản lý số lượng product được thêm vào giỏ hàng.
   * Value mặc định từ state là 1 (Mỗi lần add mặc định là 1)
   */
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  /**
   * Function `handleAddToCart` sử dụng để quản lý API thêm vào giỏ hàng.
   * Sử dụng mutate từ Tanstack Query để thực hiện action
   */
  const handleAddToCart = () => {
    if (!token) {
      addToCartMutation.mutate(
        { cartItem: { sku: slug, qty: buyCount } },
        {
          onSuccess: () => {
            toast.success('Đã thêm sản phẩm vào Giỏ hàng!')
            queryClient.invalidateQueries({
              queryKey: ['guestCart', guestCartId]
            })
          },
          onError: () => {
            toast.error('Vui lòng thử lại!')
          }
        }
      )
    } else {
      addToCartMineMutation.mutate(
        { cartItem: { sku: slug, qty: buyCount } },
        {
          onSuccess: () => {
            toast.success('Đã thêm sản phẩm vào Giỏ hàng!')
            queryClient.invalidateQueries({
              queryKey: ['cartId', cartId]
            })
          },
          onError: () => {
            toast.error('Vui lòng thử lại!')
          }
        }
      )
    }
  }

  /* Handle Description Show More/Less*/
  const description = getDescription(productData.custom_attributes)
  const sanitizedDescription = DOMPurify.sanitize(description as string)
  const slicedDescription = sanitizedDescription.slice(0, 800) + ' ...'
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  /**
   * Function handleZoom quản lý Animation khi User hover vào hình ảnh
   * @param e Đây là Mouse Event từ ReactDOM
   */
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

  const hoverActive = (img: string) => {
    setActiveImage(img)
  }

  /* const nextSlide = () => {
    if (curIndexImage[1] < (productDetail as ProductType)?.images.length) {
      setCurIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevSlide = () => {
    if (curIndexImage[0] > 0) {
      setCurIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  } */

  const meta = generateMetaSEO({
    title: productName,
    description: slicedDescription,
    keywords: [subName, parentName, productName, 'ongbayeu.com'],
    og_image: generateProductImageFromMagento(productData.custom_attributes),
    og_image_alt: productName,
    slug: hrefPath.productDetail + '/' + slug
  })

  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb
          cateName={parentName as string}
          subCateName={subName as string}
          productName={productName as string}
        />
        <div className='container'>
          <div className='grid @768:grid-cols-12 grid-cols-1 @768:gap-10 gap-5 @768:mb-10 mb-6'>
            <div className='@768:col-span-5 col-span-1'>
              <div
                className='relative w-full pt-[56%] cursor-zoom-in overflow-hidden rounded-tl-4 rounded-br-4'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={
                    activeImage !== ''
                      ? `${SITE_URL}/pub/media/catalog/product/${activeImage}`
                      : generateProductImageFromMagento(productData.custom_attributes)
                  }
                  alt='alt'
                  className='pointer-events-none absolute w-full h-full top-0 inset-0 object-cover bg-white'
                  ref={imgRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1 md:gap-2 lg:mt-6 '>
                {/* <button
                  className='absolute -left-1 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-left-3'
                  onClick={prevSlide}
                >
                  <ChevronLeftIcon className='h-4 w-4' />
                </button> */}
                {productData.media_gallery_entries.map((item, index) => {
                  const isActive = item.file === activeImage
                  if (item.types.length === 0) {
                    return (
                      <div
                        className='z-1 relative w-full overflow-hidden rounded-tl-4 rounded-br-4 pt-[56%]'
                        key={index}
                        onMouseEnter={() => hoverActive(item.file)}
                      >
                        <Image
                          src={`${SITE_URL}/pub/media/catalog/product/${item.file}`}
                          alt='alt'
                          fill
                          className='pointer-events-none object-cover'
                        />

                        {isActive && (
                          <div className='absolute inset-0 rounded-tl-4 rounded-br-4 border border-oby-primary'></div>
                        )}
                      </div>
                    )
                  }
                })}
                {/* <button
                  className='absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 bg-transparent md:-right-3'
                  onClick={nextSlide}
                >
                  <ChevronRightIcon className='h-4 w-4' />
                </button> */}
              </div>
            </div>
            <div className='@768:col-span-7 col-span-1'>
              <h1 className='font-semibold @768:fs-24 fs:18'>{productName}</h1>
              <div className='flex items-center @768:mt-5 mt-4'>
                <div className='flex items-center gap-2'>
                  <ProductRating rating={4.34} />
                  <p className='fs-14'>101 đánh giá</p>
                </div>
                <div className='flex items-center gap-2 @768:ml-[80px] ml-auto'>
                  <OBYCommentIcon className='@768:w-6 @768:h-6 w-5 h-5 text-oby-676869' />
                  <p className='fs-14'>74 thảo luận</p>
                </div>
              </div>
              <div className='bg-oby-F6F7F8 @768:px-5 px-4 @768:py-4 py-3.5 rounded-4 @768:max-w-max flex items-center gap-4 @768:mt-6.25 mt-5'>
                {isHaveDiscount(productData.custom_attributes) ? (
                  <>
                    <p className='@768:fs-26 fs-18 font-semibold'>{getDiscount(productData.custom_attributes)}</p>
                    <p className='@768:fs-18 fs-14 line-through text-oby-676869'>{formatCurrency(productData.price)}</p>
                    <p className='@768:fs-16 fs-12 text-oby-orange px-1.5 py-0.75 rounded-lg border border-oby-orange'>
                      {getDiscountPercent(productData.custom_attributes)}
                    </p>
                  </>
                ) : (
                  <p className='@768:fs-26 fs-18 font-semibold'>{formatCurrency(productData.price)}</p>
                )}
              </div>
              <div className='flex max-w-max items-center gap-4 @768:mt-6 mt-5'>
                <p className='uppercase font-semibold fs-14'>mua</p>
                <QuantityController
                  classNameWrapper='max-w-max px-4 py-2.75'
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onTyping={handleBuyCount}
                  value={buyCount}
                  max={MAX_PRODUCT}
                />
              </div>
              <div className='mt-6 flex items-center gap-5'>
                <AsyncButton
                  isLoading={addToCartMutation.isLoading || addToCartMineMutation.isLoading}
                  onClick={handleAddToCart}
                  className={cn('@992:min-w-[270px] @768:min-w-[200px] w-full')}
                  variant='outlinePrimary'
                >
                  <OBYAddCartIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary @992:mr-1.5 mr-0' />
                  <p className='text-oby-primary fs-16'>Thêm vào giỏ</p>
                </AsyncButton>
                <BuyNowButton isLoading={false} />
              </div>
            </div>
          </div>
          {getDescription(productData.custom_attributes) && (
            <div className='@768:pt-15 pt-6 border-t border-t-oby-primary'>
              <h2 className='@768:fs-26 fs-20 font-bold text-oby-green'>Chi tiết sản phẩm</h2>
              <div
                className='@768:fs-18 fs-16 @768:mt-7.5 mt-4'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(showFullDescription ? sanitizedDescription : slicedDescription)
                }}
              ></div>
              {sanitizedDescription.length > 800 && (
                <div className='flex items-center justify-center mt-7.5 gap-1.5'>
                  <OBYButton
                    variant='link'
                    size='link'
                    onClick={toggleDescription}
                    className='text-oby-primary @992:fs-18 fs-16'
                  >
                    {!showFullDescription ? 'Xem thêm' : 'Rút gọn'}
                  </OBYButton>
                  {!showFullDescription ? (
                    <ChevronDownIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
                  ) : (
                    <ChevronUpIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

/* Generate Data as Server Side */
export const getServerSideProps: GetServerSideProps<IProductDetailProps> = async (context) => {
  const { slug } = context.params as IParams

  try {
    const { data: productData } = await productApi.GetProductDetailBySKU(slug)
    const categoryIDs = findIDsFromProduct(productData.custom_attributes) ?? []

    const [subCategoryRes, parentCategoryRes] = await Promise.all([
      categoryApi.GetCategoryNameById(categoryIDs[1]),
      categoryApi.GetCategoryNameById(categoryIDs[0])
    ])

    return {
      props: {
        subName: subCategoryRes.data.name,
        parentName: parentCategoryRes.data.name,
        productName: productData.name,
        productData,
        slug
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
