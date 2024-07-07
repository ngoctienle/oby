import { AGRCategoryIcon } from '../AGRIcons'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const CategoryButton: React.FunctionComponent = () => {
  return (
    <div
      className={`w-[173px] h-[44px] flex justify-between items-center bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange px-4 py-3 rounded-lg`}
    >
      <AGRCategoryIcon className='w-6 h-6' stroke='#fff' />
      <span className='fs-16 text-white font-medium '>DANH MỤC</span>
      <ChevronDownIcon className='w-4 h-4 text-white' />
    </div>
  )
}
