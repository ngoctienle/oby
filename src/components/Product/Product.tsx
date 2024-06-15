import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { CartRequest } from '@/@types/cart.type'
import { Product as ProductType } from '@/@types/product.type'

import { useGlobalState } from '@/libs/state'

import { formatCurrency, getDiscountPercent } from '@/helpers'
import { generateProductImageFromMagento, getDiscount, isHaveDiscount } from '@/helpers/product'

import cartApi from '@/apis/magento/cart.api'

import { hrefPath } from '@/constants/href.constant'

import { AddCartButton } from '@/components/UI/Button'
import { OBYImage, OBYLink } from '@/components/UI/Element'

interface ProductProps {
  data: ProductType
  isHorizontal?: boolean
}

export default function Product({ data, isHorizontal = false }: ProductProps) {
  const [guestCartId] = useGlobalState('guestCartId')
  const [cartId] = useGlobalState('cartId')
  const [token] = useGlobalState('token')
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation((body: CartRequest) => cartApi.AddToCart(guestCartId as string, body))
  const addToCartMineMutation = useMutation((body: CartRequest) => cartApi.AddToCartMine(token as string, body))

  const handleAddToCart = () => {
    if (!token) {
      addToCartMutation.mutate(
        { cartItem: { sku: data.sku, qty: 1 } },
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
        { cartItem: { sku: data.sku, qty: 1 } },
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

  if (!data) {
    return null
  }

  return isHorizontal ? (
    <div className='border-b-[1px] border-oby-DFDFDF flex flex-row items-center gap-4 py-6 '>
      <OBYLink
        href={`${hrefPath.productDetail}/${data.sku}`}
        title={data.name}
        className='w-16 h-16 relative bg-white '
      >
        <OBYImage
          src={generateProductImageFromMagento(data.custom_attributes)}
          alt={data.name}
          title={data.name}
          display='responsive'
          className='object-cover rounded-2'
        />
      </OBYLink>
      <div className='flex-grow flex flex-col'>
        <OBYLink href={`${hrefPath.productDetail}/${data.sku}`} title={data.name} className='h-11 fs-16 font-semibold'>
          {data.name}
        </OBYLink>
        <div className='flex flex-row items-center gap-2'>
          {isHaveDiscount(data.custom_attributes) ? (
            <>
              <p className='font-bold fs-18 text-oby-primary'>{getDiscount(data.custom_attributes)}</p>
              <p className='fs-12 text-oby-676869 line-through'>{formatCurrency(data.price)}</p>
            </>
          ) : (
            <p className='font-bold fs-18 text-oby-primary'>{formatCurrency(data.price)}</p>
          )}
        </div>
      </div>
      <div className='w-12 h-9'>
        <AddCartButton
          onClick={handleAddToCart}
          isLoading={!token ? addToCartMutation.isLoading : addToCartMineMutation.isLoading}
        />
      </div>
    </div>
  ) : (
    <div className='flex group flex-col bg-white pb-3 rounded-2 border border-[#F6F6F6] max-w-[294px] max-h-[282px]'>
      <OBYLink
        href={`${hrefPath.productDetail}/${data.sku}`}
        title={data.name}
        className='overflow-hidden relative w-full bg-white @768:pt-[56%] pt-[70%] rounded-t-2'
      >
        <OBYImage
          src={generateProductImageFromMagento(data.custom_attributes)}
          alt={data.name}
          title={data.name}
          display='responsive'
          className='object-cover group-hover:scale-110 transition-all'
        />
        {isHaveDiscount(data.custom_attributes) && (
          <div className='absolute top-0 right-4'>
            <p className='text-white fs-14 bg-oby-red w-9 h-6 py-0.5 relative text-center line-br'>
              {getDiscountPercent(data.custom_attributes)}
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
      </OBYLink>
      <OBYLink
        href={`${hrefPath.productDetail}/${data.sku}`}
        title={data.name}
        className='px-4 @992:h-11 h-9 fs-14 @992:fs-16 @992:leading-[140%] leading-[18.4px] @992:mt-3.5 mt-2 line-clamp-2 @992:font-semibold font-normal'
      >
        {data.name}
      </OBYLink>
      <div className='flex items-center justify-between @992:mt-1 mt-1.5 px-4'>
        {isHaveDiscount(data.custom_attributes) ? (
          <>
            <div className='flex flex-col items-start gap-0.75'>
              <p className='font-bold fs-18 text-oby-primary'>{getDiscount(data.custom_attributes)}</p>
              <p className='fs-12 text-oby-676869 line-through'>{formatCurrency(data.price)}</p>
            </div>
            <AddCartButton
              onClick={handleAddToCart}
              isLoading={!token ? addToCartMutation.isLoading : addToCartMineMutation.isLoading}
            />
          </>
        ) : (
          <>
            <p className='font-bold fs-18 text-oby-primary'>{formatCurrency(data.price)}</p>
            <AddCartButton
              onClick={handleAddToCart}
              isLoading={!token ? addToCartMutation.isLoading : addToCartMineMutation.isLoading}
            />
          </>
        )}
      </div>
    </div>
  )
}
