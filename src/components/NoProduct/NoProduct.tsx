import { OBYImage, OBYLink } from '../UI/Element'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { hrefPath } from '@/constants/href.constant'

export default function NoProduct() {
  return (
    <>
      <div className='flex flex-col items-center pt-[80px]'>
        <div className='relative w-[120px] h-[120px]'>
          <OBYImage
            src='/images/no-product-incart.png'
            display='responsive'
            alt='Giỏ hàng trống'
            title='Giỏ hàng trống'
            className='object-cover'
          />
        </div>
        <OBYLink
          href={hrefPath.home}
          className='flex items-center justify-center mt-12.5 gap-1.5 bg-oby-primary rounded-4 py-2.5 min-w-[300px]'
          title='Trở về trang chủ'
        >
          <span className='fs-16 text-white'>Tiếp tục mua sắm</span>
          <ChevronRightIcon className='w-6 h-6 text-white' />
        </OBYLink>
      </div>
    </>
  )
}
