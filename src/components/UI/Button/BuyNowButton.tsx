import { OBYDefaultButton } from 'oby'

import twclsx from '@/libs/twclsx'

import { OBYButton } from '@/components/UI/Element'

export const BuyNowButton: React.FunctionComponent<OBYDefaultButton> = (props) => {
  return (
    <OBYButton
      {...props}
      className={twclsx(props.className, 'py-2.5 rounded-4 justify-center border border-transparent bg-oby-primary')}
    >
      <p className='text-white'>Mua Ngay</p>
    </OBYButton>
  )
}
