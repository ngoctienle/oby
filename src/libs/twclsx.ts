import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/* Using twMerge for implement Tailwindcss Class with JSX */

const twclsx = (...args: ClassValue[]) => twMerge(clsx(...args))

export default twclsx
