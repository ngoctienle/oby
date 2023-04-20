import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useGlobalState } from '@/libs/state'

import { hrefPath } from '@/constants/href.constant'

export const useAuthen = () => {
  const router = useRouter()
  const [token] = useGlobalState('token')

  useEffect(() => {
    if (token) {
      router.push(hrefPath.home)
    } else {
      router.push(hrefPath.login)
    }
  })
}
