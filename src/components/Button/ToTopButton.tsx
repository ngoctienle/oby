import { UnstyledButton } from '../Unstyled'
import { OBYDefaultButton } from 'oby'
import { useCallback } from 'react'

import twclsx from '@/libs/twclsx'

export const ToTopButton: React.FunctionComponent<OBYDefaultButton> = (props) => {
  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  return (
    <UnstyledButton
      {...props}
      onClick={toTop}
      className={twclsx(
        'justify-start text-sm md:text-base',
        'space-x-1.5 py-1 max-w-max',
        'border-b-2 border-dashed',
        'border-theme-500',
        props.className
      )}
    >
      <span>Back to top</span>
    </UnstyledButton>
  )
}
