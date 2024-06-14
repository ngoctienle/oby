import { AGRPlusIcon, AGRShoppingBagIcon } from '../AGRIcons'
import { AsyncButton, IAsyncButtonProps } from './AsyncButton'
import { FC } from 'react'

import { cn } from '@/libs/utils'

/* interface IAddCartButton extends OBYDefaultButton {
  isloading?: boolean
}

export const AddCartButton: React.FunctionComponent<IAddCartButton> = (props) => {
  return (
    <OBYButton
      {...props}
      className={twclsx(
        props.className,
        '@992:py-2.5 p-2.25 @992:rounded-4 rounded-2.5 justify-center border border-oby-primary bg-white disabled:cursor-not-allowed'
      )}
      disabled={props.isloading}
    >
      <OBYAddCartIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary @992:mr-1.5 mr-0' />
      <p className='text-oby-primary fs-16 @992:block hidden'>Thêm vào giỏ</p>
      {props.isloading ? (
        <ArrowPathIcon className='ml-1.5 @992:h-6 @992:w-6 h-5 w-5 animate-spin text-oby-primary' />
      ) : null}
    </OBYButton>
  )
} */

type IAddCartButton = IAsyncButtonProps

export const AddCartButton: FC<IAddCartButton> = ({ isLoading, ...props }) => {
  return (
    <AsyncButton
      isLoading={isLoading}
      variant='outlinePrimary'
      className={cn('@992:h-[50px] h-10 @992:w-[50px] w-10 bg-[#EBEBEB80] relative border-none')}
      {...props}
    >
      <AGRShoppingBagIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary ' />
      <AGRPlusIcon className='w-4 h-4 absolute top-3 right-2' />
    </AsyncButton>
  )
}
