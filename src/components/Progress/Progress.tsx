import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '@/libs/utils'

import { customClasses } from '@/constants/config.constant'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-2.5 w-full overflow-hidden rounded-2 bg-oby-DFDFDF', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 ${customClasses.COMMON_GRADIENT} rounded-2 transition-all`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
