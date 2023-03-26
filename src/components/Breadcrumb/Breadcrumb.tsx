import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

import { hrefPath } from '@/constants/href.constant'

import { OBYLink } from '@/components/UI/Element'

export default function Breadcrumb() {
  const route = useRouter()
  console.log(route.query)
  return (
    <div className='container'>
      <div className='flex items-center gap-2 fs-14 mb-10'>
        <OBYLink href={hrefPath.home} className='text-oby-676869'>
          Trang chủ
        </OBYLink>
        <ChevronRightIcon className='w-4 h-4 text-oby-676869' />
        <OBYLink href={hrefPath.home} className='text-oby-676869'>
          Dinh dưỡng
        </OBYLink>
        <ChevronRightIcon className='w-4 h-4 text-oby-676869' />
        <OBYLink href={hrefPath.home} className='text-oby-676869'>
          Sữa dinh dưỡng
        </OBYLink>
        <ChevronRightIcon className='w-4 h-4 text-oby-676869' />
        <OBYLink href={hrefPath.home}>Nước Hồng Sâm Đông Trùng Hạ Thảo Daesan Hàn Quốc 70ml x 20 gói</OBYLink>
      </div>
    </div>
  )
}
