import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'

import { Category } from '@/@types/category.type'

import { generateURLWithCategory } from '@/helpers/category'

import productApi from '@/apis/product.api'

import Product from '@/components/Product'
import { OBYLink } from '@/components/UI/Element'

interface ProductListProps {
  categoryID: number
  category: string
  subcategory: Category[]
}

export default function ProductList({ category, subcategory, categoryID }: ProductListProps) {
  const { data } = useQuery({
    queryKey: ['product', categoryID],
    queryFn: () => productApi.GetProductByCategoryID(categoryID)
  })

  const productData = data?.data

  if (productData && productData.total_count === 0) {
    return null
  }

  return (
    <div className='pt-15'>
      <div className='flex items-center mb-7.5 gap-2'>
        <h2 className='fs-26 text-oby-green font-bold'>{category}</h2>
        <ArrowLongRightIcon className='w-7 h-7 text-oby-green' />
      </div>
      <div className='flex items-center gap-3'>
        {subcategory &&
          subcategory.map((item) => (
            <OBYLink
              href={generateURLWithCategory(category, item.name)}
              key={item.id}
              className='rounded-4 border border-oby-DFDFDF px-3 py-2.75'
            >
              {item.name}
            </OBYLink>
          ))}
      </div>
      <div className='mt-6 pt-6 border-t border-t-oby-DFDFDF grid grid-cols-4 gap-10'>
        {productData?.items.map((item) => (
          <div className='col-span-1' key={item.id}>
            <Product data={item} />
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center mt-10 gap-1.5'>
        <OBYLink href='/' className='text-oby-primary fs-18'>
          Xem tất cả
        </OBYLink>
        <ChevronRightIcon className='w-6 h-6 text-oby-primary' />
      </div>
    </div>
  )
}
