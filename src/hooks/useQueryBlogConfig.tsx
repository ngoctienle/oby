import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useRouter } from 'next/router'

export interface BlogListConfig {
  page?: number | string
  limit?: number | string
  name?: string
}

type QueryConfig = {
  [key in keyof BlogListConfig]: string
}

export const useQueryBlogConfig = () => {
  const { query } = useRouter()
  const queryConfig: QueryConfig = omitBy(
    {
      page: query.page || '1',
      limit: query.limit || '6',
      name: query.name || ''
    },
    isUndefined
  )

  return queryConfig
}
