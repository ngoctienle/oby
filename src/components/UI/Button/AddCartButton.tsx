import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { OBYDefaultButton } from 'oby'

import twclsx from '@/libs/twclsx'

import { OBYButton } from '@/components/UI/Element'
import { OBYAddCartIcon } from '@/components/UI/OBYIcons'

interface IAddCartButton extends OBYDefaultButton {
  isLoading?: boolean
}

export const AddCartButton: React.FunctionComponent<IAddCartButton> = (props) => {
  return (
    <OBYButton
      {...props}
      className={twclsx(
        props.className,
        '@992:py-2.5 p-2.25 @992:rounded-4 rounded-2.5 justify-center border border-oby-primary bg-white disabled:cursor-not-allowed'
      )}
      disabled={props.isLoading}
    >
      <OBYAddCartIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary @992:mr-1.5 mr-0' />
      <p className='text-oby-primary fs-16 @992:block hidden'>Thêm vào giỏ</p>
      {props.isLoading ? (
        <ArrowPathIcon className='ml-1.5 @992:h-6 @992:w-6 h-5 w-5 animate-spin text-oby-primary' />
      ) : null}
    </OBYButton>
  )
}
