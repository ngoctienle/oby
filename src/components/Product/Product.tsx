import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { CartRequest } from '@/@types/cart.type'
import { Product as ProductType } from '@/@types/product.type'

import { useGlobalState } from '@/libs/state'

import { formatCurrency, getDiscountPercent } from '@/helpers'
import { generateProductImageFromMagento, generateProductLink, getDiscount, isHaveDiscount } from '@/helpers/product'

import cartApi from '@/apis/cart.api'

import { hrefPath } from '@/constants/href.constant'

import { AddCartButton } from '@/components/UI/Button'
import { OBYImage, OBYLink } from '@/components/UI/Element'

interface ProductProps {
  data: ProductType
}

export default function Product({ data }: ProductProps) {
  const [guestCartId] = useGlobalState('guestCartId')
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation((body: CartRequest) => cartApi.AddToCart(guestCartId as string, body))
  const handleAddToCart = () => {
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
  }

  if (!data) {
    return null
  }

  return (
    <div className='flex flex-col'>
      <OBYLink
        href={`${hrefPath.productDetail}/${generateProductLink(data)}`}
        className='overflow-hidden relative w-full border bg-white border-oby-DFDFDF @768:pt-[56%] pt-[70%] @992:rounded-tl-4 @992:rounded-br-4 rounded-tl-2.5 rounded-br-2.5'
      >
        <OBYImage
          src={generateProductImageFromMagento(data.custom_attributes)}
          alt='alt'
          display='responsive'
          className='object-cover'
        />
      </OBYLink>
      <OBYLink
        href={`${hrefPath.productDetail}/${generateProductLink(data)}`}
        className='@992:h-11 h-9 fs-14 @992:fs-16 @992:leading-[140%] leading-[18.4px] @992:mt-3.5 mt-2 line-clamp-2'
      >
        {data.name}
      </OBYLink>
      <div className='flex @992:flex-col justify-between mt-2'>
        {isHaveDiscount(data.custom_attributes) ? (
          <>
            <div className='flex @992:flex-row flex-col @992:items-center items-start @992:gap-3 gap-0.75'>
              <p className='@992:font-bold font-semibold fs-16 leading-[22.4px]'>
                {getDiscount(data.custom_attributes)}
              </p>
              <p className='@992:fs-14 @992:leading-[18.2px] fs-10 leading-[12.1px] text-oby-orange px-1.25 py-0.5 rounded-2 border border-oby-orange'>
                {getDiscountPercent(data.custom_attributes)}
              </p>
            </div>
            <AddCartButton
              className='@992:mt-3.5 mt-0 @992:max-w-full max-w-max'
              onClick={handleAddToCart}
              isloading={addToCartMutation.isLoading}
            />
          </>
        ) : (
          <>
            <p className='font-bold'>{formatCurrency(data.price)}</p>
            <AddCartButton
              className='@992:mt-3.5 mt-0 @992:max-w-full max-w-max'
              onClick={handleAddToCart}
              isloading={addToCartMutation.isLoading}
            />
          </>
        )}
      </div>
    </div>
  )
}
