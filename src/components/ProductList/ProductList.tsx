import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'

import { Category } from '@/@types/category.type'

import { createSlug } from '@/helpers'

import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

import Product from '@/components/Product'
import { OBYButton, OBYLink } from '@/components/UI/Element'

interface ProductListProps {
  categoryID: number
  category: string
  subcategory: Category[]
}

export default function ProductList({ category, subcategory, categoryID }: ProductListProps) {
  const { data } = useQuery({
    queryKey: ['product', categoryID],
    queryFn: () => productApi.GetProductByCategoryID(categoryID),
    staleTime: cacheTime.halfHours
  })

  const productData = data?.data

  if (!productData || (productData && productData.total_count === 0)) {
    return null
  }

  return (
    <div className=''>
      {/* Category Name */}
      <OBYButton variant='link' size='link' asChild>
        <OBYLink href={`${createSlug(category)}-${categoryID}`} className='flex items-center @992:mb-7.5 mb-4 gap-2'>
          <h2 className='@992:fs-26 fs-20 text-oby-green font-bold'>{category}</h2>
          <ArrowLongRightIcon className='@992:w-7 @992:h-7 h-6 w-6 text-oby-green' />
        </OBYLink>
      </OBYButton>
      {/* List Sub-Categories */}
      <div className='overflow-x-auto scrollbar-none'>
        <div className='min-w-fit'>
          <div className='flex items-center gap-3'>
            {subcategory &&
              subcategory.map((item) => (
                <OBYLink
                  href={'/'}
                  title={item.name}
                  key={item.id}
                  className='@992:rounded-4 rounded-2.5 border border-oby-DFDFDF px-3 py-2.75 @992:fs-14 fs-12 whitespace-nowrap'
                >
                  {item.name}
                </OBYLink>
              ))}
          </div>
        </div>
      </div>
      {/* Product List Related with Category */}
      <div className='@992:mt-6 mt-4 @992:pt-6 @992:border-t @992:border-t-oby-DFDFDF grid @992:grid-cols-4 @768:grid-cols-3 grid-cols-2 @992:gap-10 gap-5'>
        {productData.items.slice(0, 8).map((item) => (
          <div className='col-span-1' key={item.id}>
            <Product data={item} cateName={category} />
          </div>
        ))}
      </div>
      {productData.items.length > 8 && (
        <div className='flex items-center justify-center mt-10 gap-1.5'>
          <OBYLink
            href={`${createSlug(category)}-${categoryID}`}
            title='Xem tất cả sản phẩm'
            className='text-oby-primary @992:fs-18 fs-16'
          >
            Xem tất cả
          </OBYLink>
          <ChevronRightIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
        </div>
      )}
    </div>
  )
}
