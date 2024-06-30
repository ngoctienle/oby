import { OBYButton, OBYButtonProps } from '../Element'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'

import { cn } from '@/libs/utils'

import { customClasses } from '@/constants/config.constant'

export interface IAsyncButtonProps extends OBYButtonProps {
  isLoading: boolean
  isError?: boolean
  isGradient?: boolean
  showIcon?: boolean
}

export const AsyncButton: FC<IAsyncButtonProps> = ({
  isLoading,
  children,
  isError,
  isGradient,
  showIcon = true,
  ...props
}) => {
  return isGradient ? (
    <button
      onClick={props.onClick}
      disabled={isLoading || isError || props.disabled}
      className={cn(
        `${customClasses.COMMON_GRADIENT} rounded-full p-[1px] w-full flex flex-row justify-between items-center h-12 px-1 disabled:opacity-50 disabled:cursor-not-allowed pl-8 ${props.className}`
      )}
    >
      {isLoading && !isError ? (
        <div className='w-full flex flex-row justify-center'>
          <Loader2 className='h-5 w-5 text-white animate-spin' />
        </div>
      ) : (
        <>
          <p className='text-white '>{children}</p>
          {showIcon && <ArrowRightCircleIcon className='w-8 h-8' color='white' />}
        </>
      )}
    </button>
  ) : (
    <OBYButton disabled={isLoading || isError} {...props}>
      {isLoading && !isError ? <Loader2 className='h-5 w-5 animate-spin' /> : children}
    </OBYButton>
  )
}
