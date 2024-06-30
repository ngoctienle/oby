/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'isomorphic-dompurify'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { CartRequest } from '@/@types/cart.type'
import { CustomAttribute } from '@/@types/magento.type'
import { Product } from '@/@types/product.type'
import { ReviewRequestBody } from '@/@types/review.type'

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
import Progress from '@/components/Progress'
import QuantityController from '@/components/QuantityController'
import Review from '@/components/Review'
import { AsyncButton, BuyNowButton, GradientButton } from '@/components/UI/Button'
import { OBYButton } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

interface IProductDetailProps {
  slug: string
  productData: Product
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

type RatingStats = {
  [key: string]: {
    count: number
    percent?: number
  }
}

export default function ProductDetail({ productData, slug }: IProductDetailProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [guestCartId] = useGlobalState('guestCartId')
  const [token] = useGlobalState('token')
  const [cartId] = useGlobalState('cartId')

  const categoryIDs = useMemo(() => findIDsFromProduct(productData.custom_attributes) ?? [], [productData])
  const { data: subCategoryRes } = useQuery({
    queryKey: ['subCategory'],
    queryFn: () => categoryApi.GetCategoryNameById(categoryIDs[1]),
    keepPreviousData: true
  })
  const { data: parentCategoryRes } = useQuery({
    queryKey: ['parentCategory'],
    queryFn: () => categoryApi.GetCategoryNameById(categoryIDs[0]),
    keepPreviousData: true
  })

  const imgRef = useRef<HTMLImageElement>(null)
  const [buyCount, setBuyCount] = useState<number>(1)
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false)
  const [showFullReview, setShowFullReview] = useState<boolean>(false)
  const [loadingButton, setLoadingButton] = useState({
    addToCart: false,
    buyNow: false,
    addReview: false
  })
  const [review, setReview] = useState({
    userName: '',
    userReview: '',
    userRating: 0
  })
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [showAddReview, setShowAddReview] = useState<boolean>(false)

  /* const [curIndexImage, setCurIndexImage] = useState([0, 5]) */
  const [activeImage, setActiveImage] = useState('')

  const addToCartMutation = useMutation((body: CartRequest) => cartApi.AddToCart(guestCartId as string, body))
  const addToCartMineMutation = useMutation((body: CartRequest) => cartApi.AddToCartMine(token as string, body))
  const addReviewMutation = useMutation((body: ReviewRequestBody) => productApi.AddReview(body))

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
    setLoadingButton({ ...loadingButton, addToCart: true })
    if (!token) {
      addToCartMutation.mutate(
        { cartItem: { sku: slug, qty: buyCount } },
        {
          onSuccess: () => {
            toast.success('Đã thêm sản phẩm vào Giỏ hàng!')
            queryClient.invalidateQueries({
              queryKey: ['guestCart', guestCartId]
            })
            setLoadingButton({ ...loadingButton, addToCart: false })
          },
          onError: () => {
            toast.error('Vui lòng thử lại!')
            setLoadingButton({ ...loadingButton, addToCart: false })
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
            setLoadingButton({ ...loadingButton, addToCart: false })
          },
          onError: () => {
            toast.error('Vui lòng thử lại!')
            setLoadingButton({ ...loadingButton, addToCart: false })
          }
        }
      )
    }
  }

  const handleBuyNow = () => {
    setLoadingButton({ ...loadingButton, buyNow: true })

    if (!token) {
      addToCartMutation.mutate(
        { cartItem: { sku: slug, qty: buyCount } },
        {
          onSuccess: () => {
            toast.success('Đã thêm sản phẩm vào Giỏ hàng!')
            queryClient.invalidateQueries({
              queryKey: ['guestCart', guestCartId]
            })
            setLoadingButton({ ...loadingButton, buyNow: false })
            router.push(hrefPath.cartPage)
          },
          onError: () => {
            toast.error('Vui lòng thử lại!')
            setLoadingButton({ ...loadingButton, buyNow: false })
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
            setLoadingButton({ ...loadingButton, buyNow: false })

            router.push(hrefPath.cartPage)
          },
          onError: () => {
            toast.error('Vui lòng thử lại!')
            setLoadingButton({ ...loadingButton, buyNow: false })
          }
        }
      )
    }
  }

  /* Handle Description Show More/Less*/
  const description = getDescription(productData?.custom_attributes)
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

  const { data: reviewRes, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => productApi.GetAllProductReviews(slug),
    enabled: Boolean(slug)
  })

  const filteredReviews = useMemo(() => {
    if (reviewRes) {
      return reviewRes.data.filter((review) => {
        const rating = review.ratings[0]?.value
        return rating >= 4 && review.review_status === 1
      })
    }
    return []
  }, [reviewRes])

  const calculateAverageRating = useMemo(() => {
    if (!filteredReviews || filteredReviews.length === 0) {
      return 0
    }
    const totalRating = filteredReviews.reduce((sum, review) => {
      if (review.review_status === 1) {
        return sum + review.ratings[0]?.value
      }
      return sum
    }, 0)
    const averageRating = totalRating / filteredReviews.length

    return averageRating
  }, [filteredReviews])

  const calculateRatingStats = useMemo(() => {
    const ratingStats: RatingStats = {
      '5': { count: 0 },
      '4': { count: 0 },
      '3': { count: 0 },
      '2': { count: 0 },
      '1': { count: 0 }
    }

    filteredReviews.forEach((review) => {
      if (review.review_status === 1) {
        const ratingValue = review.ratings[0].value

        if (ratingStats[ratingValue]) {
          ratingStats[ratingValue].count++
        }
      }
    })

    const totalRatings = filteredReviews.filter((review) => review.review_status === 1).length

    for (const ratingValue in ratingStats) {
      const count = ratingStats[ratingValue].count
      const percent = (count / totalRatings) * 100
      ratingStats[ratingValue].percent = percent
    }

    const sortedStats = Object.entries(ratingStats)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([ratingValue, stats]) => ({
        ratingValue: parseInt(ratingValue),
        ...stats
      }))

    return sortedStats
  }, [filteredReviews])

  const splicedReviews = filteredReviews?.slice(0, 4)

  const toggleReview = () => {
    setShowFullReview(!showFullReview)
  }

  const toggleAddReview = () => {
    setShowAddReview(!showAddReview)
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview({ ...review, userName: e.target.value })
  }

  const handleChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value
    if (input.length <= 200) {
      setReview({ ...review, userReview: input })
    }
  }

  const handleClick = (index: number) => {
    setReview({ ...review, userRating: index + 1 })
    setHoverRating(0)
  }

  const handleHover = (index: number) => {
    setHoverRating(index + 1)
  }
  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const handleAddReview = () => {
    setLoadingButton({ ...loadingButton, addReview: true })
    const body = {
      review: {
        title: 'title',
        detail: review.userReview,
        nickname: review.userName,
        ratings: [
          {
            rating_name: 'Quality',
            value: review.userRating
          }
        ],
        review_entity: 'product',
        review_status: 2, //Pending
        entity_pk_value: productData.id
      }
    }
    addReviewMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Cảm ơn bạn đã đánh giá sản phẩm')
        setLoadingButton({ ...loadingButton, addReview: false })
        setReview({
          userName: '',
          userReview: '',
          userRating: 0
        })
        setShowAddReview(false)
      },
      onError: () => {
        toast.error('Vui lòng thử lại!')
        setLoadingButton({ ...loadingButton, addReview: false })
      }
    })
  }

  const renderReviews = () => {
    if (filteredReviews && filteredReviews.length > 4 && showFullReview === false) {
      return (
        <div className='@992:columns-2 columns-1 gap-6 space-y-7'>
          {splicedReviews?.map((item) => {
            if (item.review_status === 1)
              return (
                <Review
                  key={item.id}
                  name={item.nickname}
                  date={item.created_at}
                  rate={item.ratings[0].value}
                  description={item.detail}
                />
              )
          })}
        </div>
      )
    } else {
      return (
        <div className='@992:columns-2 columns-1 gap-6 space-y-7'>
          {filteredReviews?.map((item) => {
            if (item.review_status === 1)
              return (
                <Review
                  key={item.id}
                  name={item.nickname}
                  date={item.created_at}
                  rate={item.ratings[0].value}
                  description={item.detail}
                />
              )
          })}
        </div>
      )
    }
  }

  const renderButtonShowmoreReview = () => {
    if (filteredReviews)
      if (filteredReviews?.length === 0) {
        return
      } else {
        if (filteredReviews?.length > 4) {
          return (
            <div className='flex items-center justify-center mt-7.5 gap-1.5'>
              <OBYButton
                variant='link'
                size='link'
                onClick={toggleReview}
                className='text-oby-primary @992:fs-18 fs-16'
              >
                {!showFullReview ? 'Xem thêm' : 'Rút gọn'}
              </OBYButton>
              {!showFullReview ? (
                <ChevronDownIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
              ) : (
                <ChevronUpIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
              )}
            </div>
          )
        }
      }
  }

  const meta = generateMetaSEO({
    title: productData.name,
    description: slicedDescription,
    keywords: [subCategoryRes?.data.name || '', parentCategoryRes?.data.name || '', productData.name, 'ongbayeu.com'],
    og_image: generateProductImageFromMagento(productData?.custom_attributes),
    og_image_alt: productData.name,
    slug: hrefPath.productDetail + '/' + slug,
    noindex: true,
    nofollow: true
  })

  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3 pb-6 bg-white'>
        <Breadcrumb
          cateName={parentCategoryRes?.data.name || ''}
          subCateName={subCategoryRes?.data.name || ''}
          productName={productData.name}
        />
        <div className='container'>
          <div className='grid @768:grid-cols-12 grid-cols-1 @768:gap-10 gap-5 @768:mb-10 mb-6'>
            <div className='@768:col-span-5 col-span-1'>
              <div
                className='relative w-full pt-[56%] cursor-zoom-in overflow-hidden rounded-4'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={
                    activeImage !== ''
                      ? `${SITE_URL}/pub/media/catalog/product/${activeImage}`
                      : generateProductImageFromMagento(productData?.custom_attributes as CustomAttribute[])
                  }
                  alt='alt'
                  className='pointer-events-none absolute w-full h-full top-0 inset-0 object-cover bg-white'
                  ref={imgRef}
                />
                {isHaveDiscount(productData.custom_attributes) && (
                  <div className='absolute top-0 right-4'>
                    <p className='text-white fs-14 bg-oby-red w-9 h-6 py-0.5 relative text-center line-br'>
                      {getDiscountPercent(productData.custom_attributes)}
                    </p>
                    <svg
                      className='absolute -bottom-3'
                      width='36'
                      height='13'
                      viewBox='0 0 36 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M0 0H36V13L18.5 4.55L0 13V0Z' fill='#E43641' />
                    </svg>
                  </div>
                )}
              </div>
              <div className='relative mt-4 grid grid-cols-4 gap-1 md:gap-2 lg:mt-6 '>
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
                        className='z-1 relative w-full overflow-hidden rounded-4 pt-[56%]'
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
                          <div className='absolute inset-0 rounded-4 border-oby-orange border-[1.5px]'></div>
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
              <h1 className='font-semibold @768:fs-24 fs:18'>{productData.name}</h1>
              <div className='flex items-center gap-2 @768:mt-5 mt-4'>
                <ProductRating rating={Number(calculateAverageRating.toFixed(2))} size={7} />
                <p className='fs-14'>{filteredReviews?.length} đánh giá</p>
              </div>
              <div className='bg-oby-F6F7F8 @768:px-5 px-4 @768:py-4 py-3.5 rounded-4 @768:max-w-max flex items-center gap-4 @768:mt-6.25 mt-5'>
                {isHaveDiscount(productData?.custom_attributes) ? (
                  <>
                    <p className='@768:fs-26 fs-18 font-bold text-oby-primary'>
                      {getDiscount(productData?.custom_attributes)}
                    </p>
                    <p className='@768:fs-18 fs-14 line-through text-oby-676869'>{formatCurrency(productData.price)}</p>
                  </>
                ) : (
                  <p className='@768:fs-26 fs-18 font-bold text-oby-primary'>{formatCurrency(productData.price)}</p>
                )}
              </div>
              <div className='flex max-w-max items-center gap-4 @768:mt-6 mt-5'>
                <p className='uppercase font-semibold fs-14'>Số lượng</p>
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
                <GradientButton
                  gradientType='border'
                  showIcon={false}
                  isLoading={
                    (loadingButton.addToCart && addToCartMutation.isLoading) ||
                    (loadingButton.addToCart && addToCartMineMutation.isLoading)
                  }
                  onClick={handleAddToCart}
                  className={cn('@992:min-w-[270px] @768:min-w-[200px] w-full')}
                  variant='outlinePrimary'
                >
                  THÊM VÀO GIỎ HÀNG
                </GradientButton>
                <BuyNowButton
                  isLoading={
                    (loadingButton.buyNow && addToCartMutation.isLoading) ||
                    (loadingButton.buyNow && addToCartMineMutation.isLoading)
                  }
                  onClick={handleBuyNow}
                />
              </div>
            </div>
          </div>
          {getDescription(productData?.custom_attributes) && (
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
          <h2 className='@768:fs-26 fs-20 font-bold text-oby-green'>Đánh giá sản phẩm</h2>
          <div className='@992:my-7.5 my-5 mx-auto max-w-[538px]'>
            <div className=' flex items-center flex-col @992:flex-row'>
              <div className='@992:mr-6 mr-0'>
                <p className='fs-48 text-oby-orange font-bold leading-[58px] text-center'>
                  {calculateAverageRating.toFixed(2)}
                </p>
                <p className='fs-18 text-oby-676869 leading-[22px] text-center'>{filteredReviews?.length} Đánh giá</p>
              </div>
              <div className='@992:mt-5 mt-3 w-full'>
                {calculateRatingStats.map((item, index) => (
                  <div key={index} className='py-1.5 flex items-center space-x-4'>
                    <ProductRating rating={item.ratingValue} size={4} />
                    <Progress value={item.percent} />
                    <p className='text-oby-676869'>{item.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {showAddReview ? (
              <div className='mt-8 flex flex-col items-center'>
                <OBYButton
                  variant='default'
                  size='default'
                  onClick={toggleAddReview}
                  className='text-white fs-16 w-[44px] h-[44px] @992:rounded-full rounded-full py-0'
                >
                  X
                </OBYButton>
                <input
                  type='text'
                  placeholder='Họ và tên'
                  className='mt-4 py-4 @768:px-4 px-3 border border-oby-DFDFDF rounded-2.5 @768:rounded-4 bg-oby-F6F7F8 outline-none placeholder:fs-14 @768:placeholder:fs-16 placeholder:text-oby-9A9898 w-full h-full focus:border-oby-primary transition-colors disabled:bg-oby-F6F7F8 disabled:cursor-not-allowed @992:fs-16 fs-14'
                  value={review.userName}
                  onChange={handleChangeName}
                />
                <div className='relative w-full'>
                  <textarea
                    id='message'
                    rows={4}
                    value={review.userReview}
                    onChange={handleChangeReview}
                    className='mt-6 py-4 @768:px-4 px-3 border border-oby-DFDFDF rounded-2.5 @768:rounded-4 bg-oby-F6F7F8 outline-none placeholder:fs-14 @768:placeholder:fs-16 placeholder:text-oby-9A9898 w-full h-full focus:border-oby-primary transition-colors disabled:bg-oby-F6F7F8 disabled:cursor-not-allowed @992:fs-16 fs-14'
                    placeholder='Xin mời chia sẻ một số cảm nhận về sản phẩm'
                  ></textarea>
                  <span className='absolute bottom-0 right-0 z-10 mb-4 mr-4 fs-16 text-oby-9A9898'>
                    {review.userReview.length}/200
                  </span>
                </div>
                <div className='w-full mt-4 py-6 @768:px-4 px-3 border border-oby-DFDFDF rounded-2.5 @768:rounded-4 bg-oby-F6F7F8'>
                  <p className='fs-18 text-oby-9A9898 text-center'>Bạn đánh giá bao nhiêu sao cho sản phẩm này?</p>
                  <div className='mt-4 flex justify-center'>
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => handleMouseLeave()}
                        enableBackground='new 0 0 24 24'
                        viewBox='0 0 24 24'
                        x={0}
                        y={0}
                        className={`fill-current ${
                          index < (hoverRating || review.userRating) ? 'text-oby-yellow' : 'text-oby-DFDFDF'
                        } hover:fill-oby-yellow hover:text-oby-yellow h-9 w-9`}
                      >
                        <path
                          id='Stroke 1'
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z'
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <AsyncButton
                  isLoading={loadingButton.addReview && addReviewMutation.isLoading}
                  onClick={handleAddReview}
                  disabled={review.userReview === '' || review.userName === '' || review.userRating <= 0 ? true : false}
                  className={cn(
                    `w-[115px] mt-6 ${
                      (review.userName === '' || review.userRating <= 0 || review.userReview === '') &&
                      'bg-oby-9A9898 hover:bg-oby-9A9898'
                    }`
                  )}
                  // variant='outlinePrimary'
                >
                  <p className='text-white fs-16'>Gửi</p>
                </AsyncButton>
              </div>
            ) : (
              <div className='mt-8 flex flex-col justify-center items-center'>
                <div className='fs-16 mb-3 '>Bạn đánh giá sao về sản phẩm này</div>
                <OBYButton
                  variant='default'
                  size='default'
                  onClick={toggleAddReview}
                  className='text-white fs-16 w-[285px]'
                >
                  Đánh giá ngay
                </OBYButton>
              </div>
            )}
          </div>
          {!isLoading && renderReviews()}
          {renderButtonShowmoreReview()}
        </div>
      </section>
    </>
  )
}

/* export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await productApi.GetAllProducts()

  const slugs = data.items.map((product) => product.sku)

  const paths = slugs.map((slug) => ({ params: { slug } }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<IProductDetailProps> = async (context) => {
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
} */
/*  Generate Data as Server Side */
export const getServerSideProps: GetServerSideProps<IProductDetailProps> = async (context) => {
  const { slug } = context.params as IParams

  try {
    const { data: productData } = await productApi.GetProductDetailBySKU(slug)

    return {
      props: {
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
