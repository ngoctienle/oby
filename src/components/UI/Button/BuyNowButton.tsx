import { AsyncButton, IAsyncButtonProps } from './AsyncButton'
import { FC } from 'react'

import { cn } from '@/libs/utils'

type IBuyNowProps = IAsyncButtonProps

export const BuyNowButton: FC<IBuyNowProps> = ({ isLoading, ...props }) => {
  return (
    <AsyncButton isLoading={isLoading} className={cn(props.className, '@992:min-w-[270px] @768:min-w-[200px] w-full')}>
      <p className='text-white'>Mua Ngay</p>
    </AsyncButton>
  )
}
