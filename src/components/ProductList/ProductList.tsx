import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { Category } from '@/@types/category.type'

import Product from '@/components/Product'
import { OBYLink } from '@/components/UI/Element'

interface ProductListProps {
  category: string
  subcategory: Category[]
}

export default function ProductList({ category, subcategory }: ProductListProps) {
  return (
    <div className='pt-15'>
      <div className='flex items-center mb-7.5 gap-2'>
        <h2 className='fs-26 text-oby-green font-bold'>{category}</h2>
        <ArrowLongRightIcon className='w-7 h-7 text-oby-green' />
      </div>
      <div className='flex items-center gap-3'>
        {subcategory &&
          subcategory.map((item) => (
            <div key={item.id} className='rounded-4 border border-oby-DFDFDF px-3 py-2.75'>
              {item.name}
            </div>
          ))}
      </div>
      <div className='mt-6 pt-6 border-t border-t-oby-DFDFDF grid grid-cols-4 gap-10'>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div className='col-span-1' key={index}>
              <Product />
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
