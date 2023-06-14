import { OBYImage, OBYLink } from '../UI/Element'
import React from 'react'

import { CustomAttribute } from '@/@types/auth.type'
import { Category } from '@/@types/category.type'

import { createSlug } from '@/helpers'
import { generateCategoryImageFromMagento } from '@/helpers/category'

import { hrefPath } from '@/constants/href.constant'

interface PropTypes {
  custom_attributes: CustomAttribute[]
  id: number
  parent_id: number
  name: string
  is_active: boolean | null
  position: number
  level: number
  product_count: number
  children_data: Category[]
}

interface InitialProps {
  initializeCategory: PropTypes[]
}

export default function HeaderV2CategoryContent({ initializeCategory }: InitialProps) {
  return (
    <div className='absolute -left-24 top-0 min-w-[1000px] h-[522px] overflow-auto scrollbar-none px-6 py-5 rounded-4 bg-white bsd focus:outline-none'>
      <h2 className='fs-16 font-semibold mb-4'>Danh mục sản phẩm</h2>
      <div className='grid grid-cols-3'>
        {initializeCategory
          ?.filter((item) => item.is_active && item.product_count !== 0)
          .map((item) => (
            <div
              className='col-span-1 nth-3n:border-r-transparent nth-[n+4]:mt-10 mr-5 pr-5 nth-3n:mr-0 nth-3n:pr-0 border-r border-r-oby-DFDFDF last:border-r-transparent'
              key={item.id}
            >
              <div className='flex items-center gap-2 cursor-pointer'>
                <div className='w-6 h-6 relative'>
                  <OBYImage
                    src={generateCategoryImageFromMagento(item.custom_attributes)}
                    display='responsive'
                    alt={item.name}
                    title={item.name}
                    className='object-cover'
                  />
                </div>
                <OBYLink
                  href={`${hrefPath.catePage}/${createSlug(item.name)}-${item.id}`}
                  className='text-oby-green whitespace-nowrap hover:text-oby-primary fs-16 font-bold transition-colors'
                >
                  {item.name}
                </OBYLink>
              </div>
              <div className='space-y-3 mt-3'>
                {item.children_data.map((__item) => (
                  <OBYLink
                    href={`${hrefPath.catePage}/${createSlug(__item.name)}-${__item.id}`}
                    key={__item.id}
                    className='fs-14 block cursor-pointer hover:text-oby-primary transition-colors'
                  >
                    {' '}
                    {__item.name}
                  </OBYLink>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
