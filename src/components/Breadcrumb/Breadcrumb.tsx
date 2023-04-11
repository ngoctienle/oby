import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { hrefPath } from '@/constants/href.constant'

import { OBYLink } from '@/components/UI/Element'

interface BreadcrumbProps {
  cateName: string
  subCateName?: string
  productName?: string
}

export default function Breadcrumb({ cateName, subCateName, productName }: BreadcrumbProps) {
  return (
    <div className='container'>
      <div className='flex items-center @768:gap-2 gap-1 fs-14 @768:mb-10 mb-5'>
        <OBYLink href={hrefPath.home} className='text-oby-676869 @992:fs-14 fs-12 min-w-fit'>
          Trang chủ
        </OBYLink>
        <ChevronRightIcon className='@992:w-4 @992:h-4 h-3 w-3 text-oby-676869' />
        <OBYLink href={hrefPath.home} className='text-oby-676869 @992:fs-14 fs-12 min-w-fit'>
          {cateName}
        </OBYLink>
        {subCateName && (
          <>
            <ChevronRightIcon className='@992:w-4 @992:h-4 h-3 w-3 text-oby-676869' />
            <OBYLink
              href={hrefPath.home}
              className='text-oby-676869 @992:fs-14 fs-12 @768:max-w-fit max-w-[80px] truncate'
            >
              {subCateName}
            </OBYLink>
          </>
        )}
        {productName && (
          <>
            <ChevronRightIcon className='@992:w-4 @992:h-4 h-3 w-3 text-oby-676869' />
            <p className='@992:fs-14 fs-12 @768:max-w-fit max-w-[80px] truncate'>{productName}</p>
          </>
        )}
      </div>
    </div>
  )
}
