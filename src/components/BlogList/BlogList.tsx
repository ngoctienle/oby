import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import Blog from '@/components/Blog'
import { OBYLink } from '@/components/UI/Element'

export default function BlogList() {
  return (
    <div className='@992:pt-15 pt-10'>
      <div className='flex items-center @992:mb-7.5 mb-4 gap-2'>
        <h2 className='@992:fs-26 fs-20 text-oby-green font-bold'>Blogs</h2>
        <ArrowLongRightIcon className='@992:w-7 @992:h-7 w-6 h-6 text-oby-green' />
      </div>
      <div className='grid @992:grid-cols-2 grid-cols-1 @992:gap-x-15 @992:gap-y-7.5 gap-4'>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div className='col-span-1' key={index}>
              <Blog />
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
