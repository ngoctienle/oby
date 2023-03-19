import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import Blog from '@/components/Blog'
import { UnstyledLink } from '@/components/Unstyled'

export default function BlogList() {
  return (
    <div className='pt-15'>
      <div className='flex items-center mb-7.5 gap-2'>
        <h2 className='fs-26 text-oby-green font-bold'>Blogs</h2>
        <ArrowLongRightIcon className='w-7 h-7 text-oby-green' />
      </div>
      <div className='grid grid-cols-2 gap-x-15 gap-y-7.5'>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div className='col-span-1' key={index}>
              <Blog />
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
