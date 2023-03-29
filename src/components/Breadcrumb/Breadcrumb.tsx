import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { hrefPath } from '@/constants/href.constant'

import { OBYLink } from '@/components/UI/Element'

interface BreadcrumbProps {
  cateName: string
  subCateName: string
  productName: string
}

export default function Breadcrumb({ cateName, subCateName, productName }: BreadcrumbProps) {
  return (
    <div className='container'>
      <div className='flex items-center gap-2 fs-14 mb-10'>
        <OBYLink href={hrefPath.home} className='text-oby-676869'>
          Trang chủ
        </OBYLink>
        <ChevronRightIcon className='w-4 h-4 text-oby-676869' />
        <OBYLink href={hrefPath.home} className='text-oby-676869'>
          {cateName}
        </OBYLink>
        <ChevronRightIcon className='w-4 h-4 text-oby-676869' />
        <OBYLink href={hrefPath.home} className='text-oby-676869'>
          {subCateName}
        </OBYLink>
        <ChevronRightIcon className='w-4 h-4 text-oby-676869' />
        <p>{productName}</p>
      </div>
    </div>
  )
}
