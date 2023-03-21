import NextLink from 'next/link'
import type { LinkProps } from 'next/link'
import { OBYDefaultLink } from 'oby'
import { createElement, forwardRef } from 'react'

type OBYLinkProps = OBYDefaultLink & LinkProps

export const OBYLink = forwardRef<HTMLAnchorElement, OBYLinkProps>(({ href, ...props }, ref) => {
  if (href.startsWith('http')) {
    return createElement('a', { href, rel: 'noopener noreferrer', target: '_blank', ...props, ref }, props.children)
  }

  return (
    <NextLink href={href} scroll={false} {...props} ref={ref}>
      {props.children}
    </NextLink>
  )
})

OBYLink.displayName = 'OBYLink'
