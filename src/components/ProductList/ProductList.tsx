import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { AiFillCaretRight } from 'react-icons/ai'

import { Category } from '@/@types/category.type'

import { useMediaQuery, useQueryProductConfig } from '@/hooks'

import { createSlug } from '@/helpers'

import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import { OBYButton, OBYLink } from '@/components/UI/Element'

const DynamicProduct = dynamic(() => import('@/components/Product'), { ssr: false })

interface ProductListProps {
  categoryID: number
  category: string
  subcategory: Category[]
}

export default function ProductList({ category, subcategory, categoryID }: ProductListProps) {
  const isMedium = useMediaQuery('(min-width: 768px)')
  const queryConfig = useQueryProductConfig()

  const { data } = useQuery({
    queryKey: ['product', categoryID],
    queryFn: () => productApi.GetProductByCategoryID(categoryID, queryConfig.page, queryConfig.limit),
    staleTime: cacheTime.halfHours,
    keepPreviousData: true
  })

  const productData = data?.data

  if (!productData || (productData && productData.total_count === 0)) {
    return null
  }

  return (
    <>
      {/* Category Name */}
      <OBYButton variant='link' size='link' asChild className='flex items-center mb-4 gap-2'>
        <OBYLink href={`${hrefPath.catePage}/${createSlug(category)}-${categoryID}`}>
          <h2 className='@992:fs-26 fs-20 text-oby-green font-bold'>{category}</h2>
          <AiFillCaretRight className='w-5 h-5 text-oby-green' />
        </OBYLink>
      </OBYButton>
      {/* List Sub-Categories */}
      <div className='overflow-x-auto scrollbar-none bg-[#8BD870] py-1.5 px-4 rounded-4'>
        <div className='min-w-fit'>
          <div className='flex items-center gap-3'>
            {subcategory &&
              subcategory.map((item) => (
                <OBYLink
                  href={`${hrefPath.catePage}/${createSlug(item.name)}-${item.id}`}
                  title={item.name}
                  key={item.id}
                  className='@992:rounded-4 rounded-2.5 border border-oby-green bg-white text-oby-green px-3 py-2.5 @992:fs-14 fs-12 whitespace-nowrap'
                >
                  {item.name}
                </OBYLink>
              ))}
          </div>
        </div>
      </div>
      {/* Product List Related with Category */}
      <div className='@992:mt-5 mt-4 grid @992:grid-cols-4 @768:grid-cols-3 grid-cols-2 @992:gap-10 gap-5'>
        {isMedium
          ? productData.items.map((item) => (
              <div className='col-span-1' key={item.id}>
                <DynamicProduct data={item} />
              </div>
            ))
          : productData.items.slice(0, 6).map((item) => (
              <div className='col-span-1' key={item.id}>
                <DynamicProduct data={item} />
              </div>
            ))}
      </div>
      {productData.items.length === 8 && (
        <div className='flex items-center justify-center mt-10 gap-1.5'>
          <OBYLink
            href={`${hrefPath.catePage}/${createSlug(category)}-${categoryID}`}
            title='Xem tất cả sản phẩm'
            className='text-oby-primary @992:fs-18 fs-16'
          >
            Xem tất cả
          </OBYLink>
          <ChevronRightIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
        </div>
      )}
    </>
  )
}
