import { OBYButton, OBYButtonProps } from '../Element'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'

export interface IAsyncButtonProps extends OBYButtonProps {
  isLoading: boolean
  isError?: boolean
}

export const AsyncButton: FC<IAsyncButtonProps> = ({ isLoading, children, isError, ...props }) => {
  return (
    <OBYButton disabled={isLoading || isError} {...props}>
      {isLoading && !isError ? <Loader2 className='@992:mr-2 h-5 w-5 animate-spin' /> : children}
    </OBYButton>
  )
}
