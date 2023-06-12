import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useCallback } from 'react'

import { useWindowScrollY } from '@/hooks'

import { cn } from '@/libs/utils'

import { OBYButton, OBYButtonProps } from '@/components/UI/Element'

export const ToTopButton: React.FunctionComponent<OBYButtonProps> = (props) => {
  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
  const y = useWindowScrollY()

  return (
    <OBYButton
      {...props}
      onClick={toTop}
      variant={'outlinePrimary'}
      className={cn(
        'text-oby-primary border border-oby-primary bg-white !rounded-full @992:w-12 @992:h-12 w-10 h-10 opacity-0 pointer-events-none transition-opacity fixed z-10 @992:bottom-[230px] bottom-[210px] @992:right-8 right-9',
        y > 400 && 'opacity-1 pointer-events-auto',
        props.className
      )}
    >
      <ChevronUpIcon className='w-6 h-6 text-oby-primary' />
      <span className='sr-only'>Back to top</span>
    </OBYButton>
  )
}
