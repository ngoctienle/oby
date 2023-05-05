import { OBYImage, OBYLink } from '../UI/Element'

import { Blog as BlogType } from '@/@types/blog.type'

import { generateBlogImage, generateCateNameById } from '@/helpers/blog'

import { hrefPath } from '@/constants/href.constant'

interface BlogProps {
  blog: BlogType
}

export default function Blog({ blog }: BlogProps) {
  return (
    <OBYLink
      className='flex @992:gap-4 gap-3'
      href={hrefPath.blog + '/' + blog.url_key + '-' + blog.id}
      title={blog.name}
    >
      <div className='relative rounded-tl-4 rounded-br-4 overflow-hidden @768:w-[205px] @768:h-[140px] w-[129px] h-[88px] flex-shrink-0'>
        <OBYImage
          display='responsive'
          src={generateBlogImage(blog.image as string)}
          alt={blog.name}
          className='object-cover'
        />
      </div>
      <div className=''>
        <div className='px-1.5 py-0.75 @992:fs-14 fs-12 border border-oby-blue leading-[130%] rounded-2 text-oby-blue max-w-max'>
          {generateCateNameById(blog.category_ids[0])}
        </div>
        <h2 className='font-semibold @992:h-11 @768:line-clamp-2 @992:fs-16 fs-14 line-clamp-3 @992:my-2.5 my-1.5'>
          {blog.name}
        </h2>
        <p className='text-oby-676869 fs-14 @768:line-clamp-3 leading-[130%] hidden @768:block'>
          {blog.short_description}
        </p>
      </div>
    </OBYLink>
  )
}
