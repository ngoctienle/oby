import { isUndefined, omitBy } from 'lodash'
import { useRouter } from 'next/router'

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
}

export type QueryConfigProduct = {
  [key in keyof ProductListConfig]: string
}

export const useQueryProductConfig = () => {
  const { query } = useRouter()
  const queryConfig: QueryConfigProduct = omitBy(
    {
      page: query.page || '1',
      limit: query.limit || '8'
    },
    isUndefined
  )

  return queryConfig
}
