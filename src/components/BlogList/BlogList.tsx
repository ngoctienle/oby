import { ArrowLongRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'

import { useQueryConfig } from '@/hooks'

import blogAPI from '@/apis/magento/blog.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import Blog from '@/components/Blog'
import { OBYLink } from '@/components/UI/Element'

export default function BlogList() {
  const queryConfig = useQueryConfig()

  const { data: blogsData } = useQuery({
    queryKey: ['blogs', queryConfig],
    queryFn: () => blogAPI.GetList(queryConfig),
    keepPreviousData: true,
    staleTime: cacheTime.halfHours
  })
  if (!blogsData?.data || blogsData.data.length === 0) {
    return null
  }

  return (
    <div className='@992:pt-15 pt-10'>
      <div className='flex items-center @992:mb-7.5 mb-4 gap-2'>
        <h2 className='@992:fs-26 fs-20 text-oby-green font-bold'>Blogs</h2>
        <ArrowLongRightIcon className='@992:w-7 @992:h-7 w-6 h-6 text-oby-green' />
      </div>
      <div className='grid @992:grid-cols-2 grid-cols-1 @992:gap-x-15 @992:gap-y-7.5 gap-4'>
        {blogsData.data.slice(0, 3).map((blog) => (
          <div className='col-span-1' key={blog.id}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
      {blogsData.data.length > 4 && (
        <div className='flex items-center justify-center mt-10 gap-1.5'>
          <OBYLink href={hrefPath.blog} className='text-oby-primary fs-18'>
            Xem tất cả
          </OBYLink>
          <ChevronRightIcon className='w-6 h-6 text-oby-primary' />
        </div>
      )}
    </div>
  )
}
