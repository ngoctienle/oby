import { isUndefined, omitBy } from 'lodash'
import { useRouter } from 'next/router'

import { BlogListConfig } from '@/@types/blog.type'

type QueryConfig = {
  [key in keyof BlogListConfig]: string
}

export const useQueryConfig = () => {
  const { query } = useRouter()
  const queryConfig: QueryConfig = omitBy(
    {
      page: query.page || '1',
      limit: query.limit || '9'
    },
    isUndefined
  )

  return queryConfig
}
