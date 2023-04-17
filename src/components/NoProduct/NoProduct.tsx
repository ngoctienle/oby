import { OBYImage, OBYLink } from '../UI/Element'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { hrefPath } from '@/constants/href.constant'

export default function NoProduct() {
  return (
    <>
      <div className='flex flex-col items-center @768:pt-[80px] pt-10'>
        <div className='relative w-[120px] h-[120px]'>
          <OBYImage
            src='/images/no-product-incart.png'
            display='responsive'
            alt='Giỏ hàng trống'
            title='Giỏ hàng trống'
            className='object-cover'
          />
        </div>
        <p className='@992:fs-16 fs-14 text-center text-oby-676869 @992:mt-6 mt-5'>
          Không có sản phẩm nào trong giỏ hàng của bạn.
        </p>
        <OBYLink
          href={hrefPath.home}
          className='flex items-center justify-center mt-10 gap-1.5 bg-oby-primary rounded-4 py-2.5 @768:min-w-[300px] min-w-full'
          title='Trở về trang chủ'
        >
          <span className='fs-16 text-white'>Tiếp tục mua sắm</span>
          <ChevronRightIcon className='w-6 h-6 text-white' />
        </OBYLink>
      </div>
    </>
  )
}
