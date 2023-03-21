import { OBYDefaultButton } from 'oby'
import { createElement } from 'react'

import twclsx from '@/libs/twclsx'

export const OBYButton: React.FunctionComponent<OBYDefaultButton> = ({ children, className, ...props }) => {
  return createElement(
    'button',
    { ...props, className: twclsx('inline-flex items-center justify-center', className) },
    children
  )
}
