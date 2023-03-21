import { OBYDefaultButton } from 'oby'

import twclsx from '@/libs/twclsx'

import { OBYButton } from '@/components/UI/Element'
import { OBYAddCartIcon } from '@/components/UI/OBYIcons'

export const AddCartButton: React.FunctionComponent<OBYDefaultButton> = (props) => {
  return (
    <OBYButton
      {...props}
      className={twclsx(props.className, 'py-2.5 rounded-4 justify-center border border-oby-primary bg-white')}
    >
      <OBYAddCartIcon className='w-6 h-6 text-oby-primary mr-1.5' />
      <p className='text-oby-primary'>Thêm vào giỏ</p>
    </OBYButton>
  )
}
