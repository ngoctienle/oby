import { OBYAddCarIcon } from '../OBYSvg'
import { OBYDefaultButton } from 'oby'

import twclsx from '@/libs/twclsx'

import { UnstyledButton } from '@/components/Unstyled'

export const AddCartButton: React.FunctionComponent<OBYDefaultButton> = (props) => {
  return (
    <UnstyledButton
      {...props}
      className={twclsx(props.className, 'py-[10px] rounded-2xl justify-center border border-oby-primary')}
    >
      <OBYAddCarIcon className='w-6 h-6 text-oby-primary mr-[6px]' />
      <p className='text-oby-primary'>Thêm vào giỏ</p>
    </UnstyledButton>
  )
}
