import { OBYImage, OBYLink } from '../UI/Element'
import { Dialog } from '@headlessui/react'
import React from 'react'

import { CustomAttribute } from '@/@types/auth.type'
import { Category } from '@/@types/category.type'

import { createSlug } from '@/helpers'
import { generateCategoryImageFromMagento } from '@/helpers/category'

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

export default function HeaderV2CategoryContentNav({ initializeCategory }: InitialProps) {
  return (
    <>
      {initializeCategory
        ?.filter((item) => item.is_active && item.product_count !== 0)
        .map((item) => (
          <Dialog.Description
            as='div'
            key={item.id}
            className='space-y-3 mb-3 pb-3 border-b border-b-oby-DFDFDF last:mb-0 last:pb-0 last:border-b-transparent'
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
                href={`${createSlug(item.name)}-${item.id}`}
                className='text-oby-green whitespace-nowrap hover:text-oby-primary fs-14 font-bold transition-colors'
              >
                {item.name}
              </OBYLink>
            </div>
            {item.children_data.map((__item) => (
              <OBYLink
                href={`${createSlug(__item.name)}-${__item.id}`}
                key={__item.id}
                className='fs-14 block cursor-pointer hover:text-oby-primary transition-colors'
              >
                {' '}
                {__item.name}
              </OBYLink>
            ))}
          </Dialog.Description>
        ))}
    </>
  )
}
