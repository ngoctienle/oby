import { AGRGradientRightArrowIcon } from '../AGRIcons'
import { OBYLink } from '../Element'
import React from 'react'

import { customClasses } from '@/constants/config.constant'

type GradientButtonProps = {
  url: string
  isBorder?: boolean
  btnText: string
  customClass?: string
  isContainIcon?: boolean
}

export default function GradientButton({
  url,
  isBorder = true,
  isContainIcon = true,
  btnText,
  customClass
}: GradientButtonProps) {
  return isBorder ? (
    <div
      className={`${customClass} ${customClasses.COMMON_GRADIENT} rounded-full p-[1px] w-full flex flex-col items-center h-12`}
    >
      <div className='flex items-center rounded-full bg-white h-12 w-full p-1'>
        <OBYLink
          href={url}
          className={`${customClasses.COMMON_GRADIENT} w-full text-center inline-block text-transparent bg-clip-text fs-16 font-semibold`}
        >
          {btnText}
        </OBYLink>
        {isContainIcon && <AGRGradientRightArrowIcon className='w-8 h-8' />}
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-between rounded-full bg-white w-full h-12 p-1'>
      <OBYLink
        href={url}
        className={`${customClass} ${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text fs-16 font-semibold ml-8`}
      >
        {btnText}
      </OBYLink>
      {isContainIcon && <AGRGradientRightArrowIcon className='w-8 h-8' />}
    </div>
  )
}
