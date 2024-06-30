import { AGRGradientRightArrowIcon } from '../AGRIcons'
import { OBYButtonProps } from '../Element'
import { ArrowRightCircleIcon, Loader2 } from 'lucide-react'
import React, { FC } from 'react'

import { cn } from '@/libs/utils'

import { customClasses } from '@/constants/config.constant'

export interface IGradientButtonProps extends OBYButtonProps {
  isLoading?: boolean
  isError?: boolean
  showIcon?: boolean
  gradientType: 'full' | 'border'
}

export const GradientButton: FC<IGradientButtonProps> = ({
  isLoading,
  children,
  isError,
  showIcon = true,
  gradientType,
  ...props
}) => {
  const renderButton = () => {
    switch (gradientType) {
      case 'full':
        return (
          <button
            onClick={props.onClick}
            disabled={isLoading || isError || props.disabled}
            className={cn(
              `${customClasses.COMMON_GRADIENT} rounded-full p-[1px] flex flex-row justify-between items-center h-12 px-1 disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`
            )}
          >
            {isLoading && !isError ? (
              <div className='flex flex-row justify-center'>
                <Loader2 className='h-5 w-5 text-white animate-spin' />
              </div>
            ) : (
              <div
                className={`flex flex-row items-center ${
                  showIcon ? 'justify-between' : 'justify-center'
                } rounded-full bg-white h-full w-full p-1`}
              >
                <p className='text-white @992:fs-16 fs-14'>{children}</p>
                {showIcon && <ArrowRightCircleIcon className='w-8 h-8' color='white' />}
              </div>
            )}
          </button>
        )
      case 'border':
        return (
          <button
            onClick={props.onClick}
            disabled={isLoading || isError || props.disabled}
            className={cn(
              `${customClasses.COMMON_GRADIENT} rounded-full p-[1px] w-full flex flex-row justify-between items-center h-12 disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`
            )}
          >
            {isLoading && !isError ? (
              <div className='flex items-center rounded-full bg-white h-full w-full'>
                <Loader2 className='h-5 w-5 text-white animate-spin' />
              </div>
            ) : (
              <div
                className={`flex flex-row items-center ${
                  showIcon ? 'justify-between' : 'justify-center'
                } rounded-full bg-white h-full w-full p-1`}
              >
                <p
                  className={`${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text @992:fs-16 fs-14`}
                >
                  {children}
                </p>
                {showIcon && <AGRGradientRightArrowIcon className='w-8 h-8' />}
              </div>
            )}
          </button>
        )
      default:
        break
    }
  }
  return <>{renderButton()}</>
}
