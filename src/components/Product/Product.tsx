import { formatCurrency, getDiscountPercent } from '@/helpers'

import { Product as ProductType } from '@/@types/product.type'

import { generateProductLink, getDiscount, isHaveDiscount } from '@/helpers/product'

import { hrefPath } from '@/constants/href.constant'

import { AddCartButton } from '@/components/UI/Button'
import { OBYImage, OBYLink } from '@/components/UI/Element'

interface ProductProps {
  data: ProductType
}

export default function Product({ data }: ProductProps) {
  if (!data) {
    return null
  }

  return (
    <div className='flex flex-col'>
      <OBYLink
        href={`${hrefPath.productDetail}/${generateProductLink(data)}`}
        className='overflow-hidden relative w-[270px] border bg-white border-oby-DFDFDF pt-[56%] rounded-tl-4 rounded-br-4'
      >
        <OBYImage src='/images/pd-img.png' alt='alt' display='responsive' className='object-cover' />
      </OBYLink>
      <p className='h-11 mt-3.5 line-clamp-2'>{data.name}</p>
      <div className='flex items-center mt-2'>
        {isHaveDiscount(data.custom_attributes) ? (
          <>
            <p className='font-bold'>{getDiscount(data.custom_attributes)}</p>
            <p className='line-through mx-3 text-oby-676869'>{formatCurrency(data.price)}</p>
            <p className='fs-14 text-oby-orange px-1.5 py-0.75 rounded-lg border border-oby-orange'>
              {getDiscountPercent(data.custom_attributes)}
            </p>
          </>
        ) : (
          <p className='font-bold'>{formatCurrency(data.price)}</p>
        )}
      </div>
      <AddCartButton className='mt-3.5' />
    </div>
  )
}
