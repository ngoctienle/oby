import { ChevronLeftIcon } from '@heroicons/react/24/outline'

import { hrefPath } from '@/constants/href.constant'

import { OBYImage, OBYLink } from '@/components/UI/Element'

export default function NotFoundPage() {
  return (
    <div className='py-10'>
      <div className='container'>
        <div className='relative @768:h-[120px] @768:w-[120px] w-[100px] h-[100px] mx-auto'>
          <OBYImage src='/images/404.png' display='responsive' alt='Không tìm thấy' />
        </div>
        <p className='@768:fs-16 fs-14 mt-6 text-center text-oby-676869'>
          Rất tiếc! Chúng tôi không tìm thấy trang bạn yêu cầu.
        </p>
        <OBYLink
          href={hrefPath.home}
          className='flex items-center justify-center mt-10 gap-1.5 mx-auto bg-oby-primary rounded-4 py-2.5 @768:max-w-[300px] max-w-full'
          title='Trở về trang chủ'
        >
          <ChevronLeftIcon className='w-6 h-6 text-white' />
          <span className='fs-16 text-white'>Quay lại trang chủ</span>
        </OBYLink>
      </div>
    </div>
  )
}
