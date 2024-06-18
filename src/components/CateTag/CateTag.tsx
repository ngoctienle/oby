import { OBYLink } from '../UI/Element'
import React from 'react'

export const CateTag = ({ data }: { data: { id: number; name: string } }) => {
  return (
    <OBYLink
      href={'/'}
      className='border border-[#C7C7C7] rounded-full p-3 border-dashed hover:border-none hover:bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange'
    >
      <p className='font-medium fs-14 whitespace-nowrap'>{data.name}</p>
    </OBYLink>
  )
}
