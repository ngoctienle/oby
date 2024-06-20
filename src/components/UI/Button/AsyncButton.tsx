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
}

export const AsyncButton: FC<IAsyncButtonProps> = ({ isLoading, children, isError, isGradient, ...props }) => {
  return isGradient ? (
    <button
      disabled={isLoading || isError}
      className={cn(
        `${customClasses.COMMON_GRADIENT} ${props.className} rounded-full p-[1px] w-full flex flex-row justify-between items-center h-12 px-1 disabled:opacity-50 disabled:cursor-not-allowed`
      )}
    >
      {isLoading && !isError ? (
        <div className='w-full flex flex-row justify-center'>
          <Loader2 className='h-5 w-5 text-white animate-spin' />
        </div>
      ) : (
        <>
          <p className='text-white ml-8'>{children}</p>
          <ArrowRightCircleIcon className='w-8 h-8' color='white' />
        </>
      )}
    </button>
  ) : (
    <OBYButton disabled={isLoading || isError} {...props}>
      {isLoading && !isError ? <Loader2 className='h-5 w-5 animate-spin' /> : children}
    </OBYButton>
  )
}
