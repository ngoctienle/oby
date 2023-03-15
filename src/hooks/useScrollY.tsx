import { useEffect, useState } from 'react'

/**
 * A Custom Hook `useWindowScroll` will run on side effect to observe
 * Initial value is 0 as from the top
 * This will returns the current scroll position of the window
 * @returns The scroll position of the window Y.
 */
export const useWindowScrollY = () => {
  const [position, setPosition] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setPosition(window.scrollY)
      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}
