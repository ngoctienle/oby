declare module 'oby' {
  export type OBYDefaultButton = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >

  export type OBYDefaultLink = {
    href: string
    title?: string
    className?: string
    children?: React.ReactNode
  }

  export type OBYImage = {
    display: 'responsive' | 'intrinsic'
    alt: string
  }
}
