import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/libs/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center active:scale-95 rounded-full transition-all focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-oby-primary text-white hover:bg-oby-primary/90',
        outlinePrimary: 'bg-white border border-oby-primary text-oby-primary',
        outline: 'bg-white border border-oby-DFDFDF',
        ghost: 'bg-transparent',
        link: 'bg-transparent text-oby-primary hover:text-oby-primary/90'
      },
      size: {
        default: 'h-11 py-2.5',
        ghost: 'max-w-max',
        link: 'max-w-max'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface OBYButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const OBYButton = forwardRef<HTMLButtonElement, OBYButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'
    return <Component className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)

OBYButton.displayName = 'OBYButton'

export { OBYButton, buttonVariants }

/* export const OBYButton: React.FunctionComponent<OBYDefaultButton> = ({ children, className, ...props }) => {
  return createElement(
    'button',
    {
      ...props,
      className: twclsx('inline-flex items-center justify-center', className)
    },
    children
  )
} */
