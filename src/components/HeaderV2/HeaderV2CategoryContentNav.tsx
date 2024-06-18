import { OBYButton, OBYImage, OBYLink } from '../UI/Element'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'

import { CustomAttribute } from '@/@types/auth.type'
import { Category } from '@/@types/category.type'

import { cn } from '@/libs/utils'

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

export default function HeaderV2CategoryContentNav({ initializeCategory }: InitialProps) {
  return (
    <>
      {initializeCategory
        ?.filter((item) => item.is_active && item.product_count !== 0)
        .map((item) => (
          <Disclosure as='div' key={item.id} className='transition-all pb-4 relative'>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex w-full items-center justify-between outline-none'>
                  <div className='flex items-center gap-1.5'>
                    <div className='w-6 h-6 relative'>
                      <OBYImage
                        src={generateCategoryImageFromMagento(item.custom_attributes)}
                        display='responsive'
                        alt={item.name}
                        title={item.name}
                        className='object-cover'
                      />
                    </div>
                    <p className='fs-16'>{item.name}</p>
                  </div>
                  <ChevronRightIcon
                    className={`${open ? 'rotate-90' : 'rotate-0'} w-6 h-6 text-oby-676869 transition-transform`}
                  />
                </Disclosure.Button>
                <Transition
                  as={Fragment}
                  enter='transition duration-100 ease-out'
                  enterFrom='transform opacity-0'
                  enterTo='transform opacity-100 translate-y-0'
                  leave='transition duration-75 ease-out'
                  leaveFrom='transform opacity-100 translate-y-0'
                  leaveTo='transform opacity-0'
                >
                  <Disclosure.Panel>
                    {item.children_data.map((__item) => (
                      <OBYButton
                        key={__item.id}
                        variant='ghost'
                        asChild
                        className={cn('w-full justify-between group pl-8')}
                      >
                        <OBYLink
                          href={`${hrefPath.catePage}/${createSlug(__item.name)}-${__item.id}`}
                          className='fs-14 block cursor-pointer hover:text-oby-primary transition-colors'
                        >
                          {' '}
                          {__item.name}
                        </OBYLink>
                      </OBYButton>
                    ))}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          // <Dialog.Description
          //   as='div'
          //   key={item.id}
          //   className='space-y-3 mb-3 pb-3 border-b border-b-oby-DFDFDF last:mb-0 last:pb-0 last:border-b-transparent'
          // >
          //   <div className='flex items-center gap-2 cursor-pointer'>
          //     <div className='w-6 h-6 relative'>
          //       <OBYImage
          //         src={generateCategoryImageFromMagento(item.custom_attributes)}
          //         display='responsive'
          //         alt={item.name}
          //         title={item.name}
          //         className='object-cover'
          //       />
          //     </div>
          //     <OBYLink
          //       href={`${hrefPath.catePage}/${createSlug(item.name)}-${item.id}`}
          //       className='text-oby-green whitespace-nowrap hover:text-oby-primary fs-14 font-bold transition-colors'
          //     >
          //       {item.name}
          //     </OBYLink>
          //   </div>
          //   {item.children_data.map((__item) => (
          //     <OBYLink
          //       href={`${hrefPath.catePage}/${createSlug(__item.name)}-${__item.id}`}
          //       key={__item.id}
          //       className='fs-14 block cursor-pointer hover:text-oby-primary transition-colors'
          //     >
          //       {' '}
          //       {__item.name}
          //     </OBYLink>
          //   ))}
          // </Dialog.Description>
        ))}
    </>
  )
}
