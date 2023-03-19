import { useWindowScrollY } from '@/hooks'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { OBYDefaultButton } from 'oby'
import { useCallback } from 'react'

import twclsx from '@/libs/twclsx'

import { UnstyledButton } from '@/components/Unstyled'

export const ToTopButton: React.FunctionComponent<OBYDefaultButton> = (props) => {
  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
  const y = useWindowScrollY()

  return (
    <UnstyledButton
      {...props}
      onClick={toTop}
      className={twclsx(
        'text-oby-primary border border-oby-primary bg-white rounded-full w-12 h-12 opacity-0 pointer-events-none transition-opacity fixed z-10 bottom-[90px] right-8',
        y > 800 && 'opacity-1 pointer-events-auto',
        props.className
      )}
    >
      <ChevronUpIcon className='w-6 h-6 text-oby-primary' />
      <span className='sr-only'>Back to top</span>
    </UnstyledButton>
  )
}
