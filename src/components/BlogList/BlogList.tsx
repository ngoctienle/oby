import GradientButtonLink from '../UI/GradientButtonLink'
import { useQuery } from '@tanstack/react-query'

import { useQueryBlogConfig } from '@/hooks'

import blogAPI from '@/apis/magento/blog.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import Blog from '@/components/Blog'

export default function BlogList() {
  const queryConfig = useQueryBlogConfig()

  const { data: blogsData } = useQuery({
    queryKey: ['blogs', queryConfig],
    queryFn: () => blogAPI.GetList(1, 6),
    keepPreviousData: true,
    staleTime: cacheTime.halfHours
  })
  if (!blogsData?.data || blogsData.data[0].items.length === 0) {
    return null
  }

  return (
    <div className='bg-white'>
      <div className='container py-8 flex flex-col items-center'>
        <h2 className='text-oby-primary fs-14 font-normal mb-2'>BLOG</h2>
        <p className='text-[#222324] fs-26 font-bold'>TIN TỨC HÔM NAY</p>

        <div className='w-full grid @992:grid-cols-3 grid-cols-1 @992:gap-6 gap-4 my-[30px]'>
          {blogsData.data[0].items.map((blog, index) => (
            <div className='col-span-1' key={index}>
              <Blog blog={blog} />
            </div>
          ))}
        </div>

        <div className='w-[194px]'>
          <GradientButtonLink url={`${hrefPath.blog}`} btnText='XEM TẤT CẢ' customClass='self-center' />
        </div>
      </div>
    </div>
    // <div className='@992:pt-15 pt-10'>
    //   <OBYButton variant='link' size='link' asChild className='flex items-center @992:mb-7.5 mb-4 gap-2'>
    //     <OBYLink href={hrefPath.blog}>
    //       <h2 className='@992:fs-26 fs-20 text-oby-green font-bold'>Blogs</h2>
    //       <AiFillCaretRight className='w-5 h-5 text-oby-green' />
    //     </OBYLink>
    //   </OBYButton>
    //   <div className='grid @992:grid-cols-2 grid-cols-1 @992:gap-x-15 @992:gap-y-7.5 gap-4'>
    //     {blogsData.data[0].items.map((blog) => (
    //       <div className='col-span-1' key={blog.id}>
    //         <Blog blog={blog} />
    //       </div>
    //     ))}
    //   </div>
    //   {blogsData.data.length === 6 && (
    //     <div className='flex items-center justify-center mt-10 gap-1.5'>
    //       <OBYLink href={hrefPath.blog} className='text-oby-primary fs-18'>
    //         Xem tất cả
    //       </OBYLink>
    //       <ChevronRightIcon className='w-6 h-6 text-oby-primary' />
    //     </div>
    //   )}
    // </div>
  )
}
