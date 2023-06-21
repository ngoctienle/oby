import { RadioGroup } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'

import { BlogCategory } from '@/@types/blog.type'

import { useQueryConfig } from '@/hooks'

import { generateMetaSEO } from '@/libs/seo'

import { generateBlogImage, generateCateNameById } from '@/helpers/blog'

import blogAPI from '@/apis/magento/blog.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import Breadcrumb from '@/components/Breadcrumb'
import Pagination from '@/components/Pagination'
import { OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

interface BlogPageProps {
  categories: BlogCategory[]
}

export default function BlogPage({ categories }: BlogPageProps) {
  const [selectedCate, setSelectedCate] = useState<number | null>(null)
  const queryConfig = useQueryConfig()

  const { data: blogsData } = useQuery({
    queryKey: ['blogsRoute', queryConfig],
    queryFn: () => blogAPI.GetList(queryConfig.page, (queryConfig.limit = '9')),
    keepPreviousData: true,
    staleTime: cacheTime.halfHours
  })

  const { data: blogRes } = useQuery({
    queryKey: ['blogs', selectedCate, queryConfig],
    queryFn: () => blogAPI.GetListByCategoryId(selectedCate as number, queryConfig.page, (queryConfig.limit = '9')),
    enabled: !!selectedCate,
    staleTime: cacheTime.fiveMinutes
  })

  const initializedBlogs = useMemo(() => {
    if (blogRes?.data) {
      return blogRes.data[0]
    } else return blogsData?.data[0]
  }, [blogRes?.data, blogsData?.data])

  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Blogs',
    description: 'Blogs',
    keywords: [`OBY, Blogs, Tin tức, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: hrefPath.blog
  })

  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName={'Blog'} />
        <div className='container'>
          <div className='grid @992:grid-cols-12 grid-cols-1  gap-10 min-h-[300px]'>
            <div className='@992:col-span-3 col-span-1'>
              <h2 className='text-oby-green fs-18 font-bold'>Danh mục Blog</h2>
              <RadioGroup
                value={selectedCate}
                onChange={setSelectedCate}
                className='@992:p-0 mt-4 py-2 px-4 bg-[#BCF0AA] @992:bg-transparent rounded-4'
              >
                <div className='overflow-auto scrollbar-none'>
                  <div className='@992:space-y-3.5 @992:space-x-0 space-x-2 @992:block flex items-center'>
                    {categories.map((category) => {
                      if (category.id !== 1) {
                        return (
                          <RadioGroup.Option
                            key={category.name}
                            value={category.id}
                            className={({ checked }) =>
                              `${checked ? 'bg-oby-primary' : 'bg-white'}
                                relative flex cursor-pointer rounded-4 border border-oby-primary px-4 py-2.5 focus:outline-none`
                            }
                          >
                            {({ checked }) => (
                              <div className='flex items-center justify-between w-full'>
                                <RadioGroup.Label
                                  as='p'
                                  className={`font-semibold fs-16 whitespace-nowrap  ${
                                    checked ? 'text-white' : 'text-oby-primary'
                                  }`}
                                >
                                  {category.name}
                                </RadioGroup.Label>
                                <ChevronRightIcon
                                  className={`@992:block hidden w-6 h-6  ${
                                    checked ? 'text-white' : 'text-oby-primary'
                                  }`}
                                />
                              </div>
                            )}
                          </RadioGroup.Option>
                        )
                      }
                    })}
                  </div>
                  {/* <div className='@992:w-auto w-[992px]'></div> */}
                </div>
              </RadioGroup>
            </div>
            <div className='@992:col-span-9 col-span-1'>
              <div className='grid @992:grid-cols-3 @768:grid-cols-2 @992:gap-10 gap-6'>
                {initializedBlogs && initializedBlogs.items.length > 0 ? (
                  initializedBlogs.items.map((item) => (
                    <div className='col-span-1' key={item.id}>
                      <OBYLink
                        className='flex flex-col'
                        href={hrefPath.blog + '/' + item.url_key + '-' + item.id}
                        title={item.name}
                      >
                        <div className='relative rounded-4 border border-oby-green overflow-hidden w-full @768:h-[142px] h-[180px]'>
                          <OBYImage
                            display='responsive'
                            src={generateBlogImage(item.image as string)}
                            alt={item.name}
                            className='object-cover'
                          />
                        </div>
                        <div className='mt-3'>
                          <div className='flex items-center gap-2'>
                            <div className='px-1.5 py-0.75 @992:fs-14 fs-12 border border-oby-green leading-[130%] rounded-2 text-oby-green line-clamp-1'>
                              {generateCateNameById(item.category_ids[0])}
                            </div>
                            <span className='fs-14 text-oby-676869'>-</span>
                            <span className='fs-14 text-oby-676869'>
                              {dayjs(item.publish_date).format('DD/MM/YYYY')}
                            </span>
                          </div>
                          <h2 className='font-semibold @992:h-11 @768:line-clamp-2 @992:fs-16 fs-14 line-clamp-3 my-1.5'>
                            {item.name}
                          </h2>
                          <p className='text-oby-676869 fs-14 line-clamp-2 leading-[130%]'>{item.short_description}</p>
                        </div>
                      </OBYLink>
                    </div>
                  ))
                ) : (
                  <div className='col-span-3'>
                    <div className='relative @992:w-[120px] @992:h-[120px] w-[100px] h-[100px] mx-auto'>
                      <OBYImage
                        src='/images/no-post.png'
                        alt='Rất tiếc! Chưa có bài viết nào được đăng tải.'
                        display='responsive'
                        className='object-cover'
                      />
                    </div>
                    <p className='fs-16 text-oby-676869 mt-6 text-center'>
                      Rất tiếc! Chưa có bài viết nào được đăng tải.
                    </p>
                  </div>
                )}
              </div>
              {initializedBlogs && initializedBlogs.last_page > 1 && (
                <Pagination queryConfig={queryConfig} pageSize={initializedBlogs.last_page} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
  const { data: categories } = await blogAPI.GetListCategory()
  return {
    props: {
      categories
    }
  }
}
