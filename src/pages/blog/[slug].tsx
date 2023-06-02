import dayjs from 'dayjs'
import DOMPurify from 'isomorphic-dompurify'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { Blog } from '@/@types/blog.type'

import { generateMetaSEO } from '@/libs/seo'

import { generateBlogImage, generateCateNameById } from '@/helpers/blog'

import blogAPI from '@/apis/magento/blog.api'

import { SITE_URL } from '@/constants/domain.constant'
import { hrefPath } from '@/constants/href.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYSeo } from '@/components/UI/OBYSeo'

interface BlogDetailProps {
  blogData: Blog
  cateName?: string
}
interface IParams extends ParsedUrlQuery {
  slug: string
}

export default function BlogDetail({ blogData, cateName }: BlogDetailProps) {
  const replacedHtmlContent = blogData.post_content.replace(/{{media url=&quot;(.*?)&quot;}}/g, (match, p1) => {
    const mediaUrl = `${SITE_URL}/pub/media/${p1}` // Replace with your media URL logic
    return mediaUrl
  })

  const meta = generateMetaSEO({
    title: blogData.name,
    description: blogData.short_description,
    keywords: [blogData.name, cateName as string, 'ongbayeu.com'],
    og_image: generateBlogImage(blogData.image as string),
    og_image_alt: blogData.name,
    slug: hrefPath.blog + '/' + blogData.url_key + '-' + blogData.id
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName={'Blog'} subCateName={cateName} productName={blogData.name} />
        <div className='container'>
          <h1 className='font-bold @992:fs-24 fs-20'>{blogData.name}</h1>
          <div className='@992:my-4 my-3.5 flex items-center gap-2'>
            <div className='px-1.5 py-0.75 @992:fs-14 fs-12 border border-oby-blue leading-[130%] rounded-2 text-oby-blue max-w-max'>
              {cateName}
            </div>
            <span className='fs-14 text-oby-676869'>-</span>
            <span className='fs-14 text-oby-676869'>{dayjs(blogData.publish_date).format('DD/MM/YYYY')}</span>
          </div>
          <div
            className='@992:fs-16 fs-14 space-y-2.5 blog-desc'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(replacedHtmlContent)
            }}
          />
          {/* <div className='grid grid-cols-12 @992:gap-10'>
            <div className='@992:col-span-3 @992:order-1 order-2 col-span-12 @992:mt-0 @992:pt-0 mt-6 pt-6 border-t @992:border-t-transparent border-t-oby-primary'>
              <h3 className='fs-20 text-oby-green font-bold'>Tin tức theo danh mục</h3>
            </div>
            <div className='@992:col-span-9 @992:order-2 order-1 col-span-12'></div>
          </div> */}
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<BlogDetailProps> = async (context) => {
  const { slug } = context.params as IParams
  const match = slug.match(/\d+$/)

  let id = 0
  try {
    if (match) {
      id = parseInt(match[0])
    }
    const { data: blogData } = await blogAPI.ViewPost(id)
    const cateName = generateCateNameById(blogData.category_ids[0])

    return {
      props: {
        blogData,
        cateName: cateName
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
