import { OBYImage, OBYLink } from '../UI/Element'

import { Blog as BlogType } from '@/@types/blog.type'

import { useMediaQuery } from '@/hooks'

import { generateBlogImage } from '@/helpers/blog'

import { customClasses } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

interface BlogProps {
  blog: BlogType
}

export default function Blog({ blog }: BlogProps) {
  const isMatch = useMediaQuery('(min-width:992px)')

  return isMatch ? (
    <OBYLink
      className='flex flex-col bg-transparent gap-4 rounded-2'
      href={hrefPath.blog + '/' + blog.url_key + '-' + blog.post_id}
      title={blog.name}
    >
      <div className='w-[384px] h-[316px] relative mb-4'>
        <OBYImage
          display='responsive'
          src={generateBlogImage(blog.image as string)}
          alt={blog.name}
          className='object-cover'
        />
      </div>

      <p
        className={`text-center ${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text fs-12 font-normal`}
      >
        Thông tin bổ ích
      </p>
      <h2 className='text-center font-semibold fs-16 line-clamp-2'>{blog.name}</h2>
      <p className='text-center text-oby-676869 fs-14 font-normal line-clamp-3'>{blog.short_description}</p>
    </OBYLink>
  ) : (
    <OBYLink
      className='flex gap-3 rounded-2'
      href={hrefPath.blog + '/' + blog.url_key + '-' + blog.post_id}
      title={blog.name}
    >
      <div className='relative overflow-hidden @768:w-[205px] @768:h-[140px] w-[129px] h-[88px] flex-shrink-0'>
        <OBYImage
          display='responsive'
          src={generateBlogImage(blog.image as string)}
          alt={blog.name}
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <p className={`${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text fs-12 font-normal`}>
          Thông tin bổ ích
        </p>
        <h2 className='font-semibold fs-16  line-clamp-1'>{blog.name}</h2>
        <p className='text-oby-676869 fs-14 line-clamp-2'>{blog.short_description}</p>
      </div>
    </OBYLink>
  )
}
