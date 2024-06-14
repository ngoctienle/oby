import { AGRGradientRightArrowIcon } from '../AGRIcons'
import { OBYLink } from '../Element'
import React from 'react'

type GradientButtonProps = {
  url: string
  isBorder?: boolean
  btnText: string
  customClass?: string
}

export default function GradientButton({ url, isBorder = true, btnText, customClass }: GradientButtonProps) {
  return isBorder ? (
    <div
      className={`${customClass} bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange rounded-full p-[1.5px]  w-[194px] flex flex-col items-center h-12`}
    >
      <div className='flex items-center justify-center gap-7  rounded-full bg-white  w-[191px] h-12'>
        <OBYLink
          href={url}
          className='bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange inline-block text-transparent bg-clip-text fs-16 font-semibold'
        >
          {btnText}
        </OBYLink>
        <AGRGradientRightArrowIcon className='w-8 h-8' />
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center gap-7  rounded-full bg-white w-[194px] h-12'>
      <OBYLink
        href={url}
        className={`${customClass} bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange inline-block text-transparent bg-clip-text fs-16 font-semibold`}
      >
        {btnText}
      </OBYLink>
      <AGRGradientRightArrowIcon className='w-8 h-8' />
    </div>
  )
}
