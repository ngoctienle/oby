import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { CartRequest } from '@/@types/cart.type'
import { Product as ProductType } from '@/@types/product.type'

import { useGlobalState } from '@/libs/state'

import { createSlug, formatCurrency, getDiscountPercent } from '@/helpers'
import { generateProductImageFromMagento, getDiscount, isHaveDiscount } from '@/helpers/product'

import cartApi from '@/apis/magento/cart.api'

import { AddCartButton } from '@/components/UI/Button'
import { OBYImage, OBYLink } from '@/components/UI/Element'

interface ProductProps {
  data: ProductType
  cateName: string
}

export default function Product({ data, cateName }: ProductProps) {
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

  return (
    <div className='flex group flex-col'>
      <OBYLink
        href={`${createSlug(cateName)}/${data.sku}`}
        title={data.name}
        className='overflow-hidden relative w-full border bg-white border-oby-primary @768:pt-[56%] pt-[70%] @992:rounded-tl-4 @992:rounded-br-4 rounded-tl-2.5 rounded-br-2.5'
      >
        <OBYImage
          src={generateProductImageFromMagento(data.custom_attributes)}
          alt={data.name}
          title={data.name}
          display='responsive'
          className='object-cover group-hover:scale-110 transition-all'
        />
        {isHaveDiscount(data.custom_attributes) && (
          <p className='absolute bg-oby-red text-white px-1.5 py-0.5 top-4 fs-14 rounded-tr-2 rounded-br-2 left-0'>
            {getDiscountPercent(data.custom_attributes)}
          </p>
        )}
      </OBYLink>
      <OBYLink
        href={`${createSlug(cateName)}/${data.sku}`}
        title={data.name}
        className='@992:h-11 h-9 fs-14 @992:fs-16 @992:leading-[140%] leading-[18.4px] @992:mt-3.5 mt-2 line-clamp-2'
      >
        {data.name}
      </OBYLink>
      <div className='flex items-center justify-between @992:mt-1 mt-1.5'>
        {isHaveDiscount(data.custom_attributes) ? (
          <>
            <div className='flex @992:flex-row flex-col @992:items-center items-start @992:gap-2.5 gap-0.75'>
              <p className='@992:font-bold font-semibold fs-16 text-oby-primary'>
                {getDiscount(data.custom_attributes)}
              </p>
              <p className='@992:fs-16 fs-12 text-oby-676869 line-through'>{formatCurrency(data.price)}</p>
            </div>
            <AddCartButton
              onClick={handleAddToCart}
              isLoading={!token ? addToCartMutation.isLoading : addToCartMineMutation.isLoading}
            />
          </>
        ) : (
          <>
            <p className='@992:font-bold font-semibold fs-16 text-oby-primary'>{formatCurrency(data.price)}</p>
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
