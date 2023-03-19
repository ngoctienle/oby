import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import Product from '@/components/Product'
import { UnstyledLink } from '@/components/Unstyled'

interface ProductListProps {
  title: string
}

export default function ProductList({ title }: ProductListProps) {
  return (
    <div className='pt-15'>
      <div className='flex items-center mb-7.5 gap-2'>
        <h2 className='fs-26 text-oby-green font-bold'>{title}</h2>
        <ArrowLongRightIcon className='w-7 h-7 text-oby-green' />
      </div>
      <div className='flex items-center gap-3'>
        <div className='rounded-4 border border-oby-DFDFDF px-3 py-2.75'>Sữa dinh dưỡng</div>
        <div className='rounded-4 border border-oby-DFDFDF px-3 py-2.75'>Thức uống dinh dưỡng</div>
        <div className='rounded-4 border border-oby-DFDFDF px-3 py-2.75'>Ngũ cốc & hạt</div>
        <div className='rounded-4 border border-oby-DFDFDF px-3 py-2.75'>Thực phẩm bổ sung</div>
        <div className='rounded-4 border border-oby-DFDFDF px-3 py-2.75'>Vitamin & thực phẩm chức năng</div>
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
        <UnstyledLink href='/' className='text-oby-primary fs-18'>
          Xem tất cả
        </UnstyledLink>
        <ChevronRightIcon className='w-6 h-6 text-oby-primary' />
      </div>
    </div>
  )
}
