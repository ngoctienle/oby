import { OBYLink } from '../UI/Element'
import React from 'react'

import { customClass } from '@/constants/config.constant'

export const CateTag = ({ data }: { data: { id: number; name: string } }) => {
  return (
    <OBYLink
      href={'/'}
      className={`border border-[#C7C7C7] rounded-full p-3 border-dashed hover:border-none hover:${customClass.COMMON_GRADIENT}`}
    >
      <p className='font-medium fs-14 whitespace-nowrap'>{data.name}</p>
    </OBYLink>
  )
}
