import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import querystring from 'querystring'

import { QueryConfigProduct } from '@/hooks'

import { cn } from '@/libs/utils'

interface Props {
  queryConfig: QueryConfigProduct
  pageSize: number
}
const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const router = useRouter()

  const renderPagination = () => {
    let dotsAfter = false
    let dotsBefore = false

    const renderDotsBefore = (index: number) => {
      if (!dotsBefore) {
        dotsBefore = true
        return (
          <span
            key={index}
            className=' flex h-7 w-7 items-center justify-center bg-transparent p-1 lg:h-8 lg:w-8 lg:p-2'
          >
            ...
          </span>
        )
      }
      return null
    }

    const renderDotsAfter = (index: number) => {
      if (!dotsAfter) {
        dotsAfter = true
        return (
          <span
            key={index}
            className=' flex h-7 w-7 items-center justify-center bg-transparent p-1 lg:h-8 lg:w-8 lg:p-2'
          >
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotsAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotsBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotsAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotsBefore(index)
        }
        return (
          <Link
            href={{
              pathname: `${router.query.cate ? router.query.cate : router.pathname}`,
              query: querystring.stringify({
                page: pageNumber,
                limit: 9
              })
            }}
            key={index}
            className={cn(' flex h-9.5 w-9.5 items-center justify-center rounded-1.5 transition-colors', {
              'bg-oby-primary text-white': pageNumber === page,
              'bg-oby-DFDFDF hover:bg-oby-primary/40 hover:text-white': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-5 flex flex-wrap items-center justify-center gap-3 lg:mt-6'>
      {page === 1 ? (
        <ChevronLeftIcon className='h-6 w-6 cursor-not-allowed' />
      ) : (
        <Link
          href={{
            pathname: `${router.query.cate ? router.query.cate : router.pathname}`,
            query: querystring.stringify({
              page: page - 1,
              limit: 9
            })
          }}
          className='flex items-center justify-center'
        >
          <ChevronLeftIcon className='h-6 w-6 hover:text-oby-primary transition-colors' />
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <ChevronRightIcon className='h-6 w-6 cursor-not-allowed' />
      ) : (
        <Link
          href={{
            pathname: `${router.query.cate ? router.query.cate : router.pathname}`,
            query: querystring.stringify({
              page: page + 1,
              limit: 9
            })
          }}
          className='flex items-center justify-center'
        >
          <ChevronRightIcon className='h-6 w-6 hover:text-oby-primary transition-colors' />
        </Link>
      )}
    </div>
  )
}
