import { RadioGroup } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { useMemo, useState } from 'react'

import { Blog, BlogCategory } from '@/@types/blog.type'

import { generateBlogImage, generateCateNameById } from '@/helpers/blog'

import blogAPI from '@/apis/magento/blog.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYImage, OBYLink } from '@/components/UI/Element'

interface BlogPageProps {
  categories: BlogCategory[]
  initBlogs: Blog[]
}

export default function BlogPage({ categories, initBlogs }: BlogPageProps) {
  const [selectedCate, setSelectedCate] = useState<number | null>(null)

  const { data: blogRes } = useQuery({
    queryKey: ['blogs', selectedCate],
    queryFn: () => blogAPI.GetListByCategoryId(selectedCate as number),
    enabled: !!selectedCate,
    staleTime: cacheTime.fiveMinutes
  })

  const initializedBlogs = useMemo(() => {
    if (blogRes?.data) {
      return blogRes.data
    }
    return initBlogs
  }, [blogRes?.data, initBlogs])

  return (
    <>
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName={'Blog'} />
        <div className='container'>
          <div className='grid grid-cols-12 gap-10 min-h-[300px]'>
            <div className='@992:col-span-3 @992:order-1 order-2 col-span-12 @992:mt-0 @992:pt-0 mt-6 pt-6 border-t border-t-oby-primary @992:border-t-transparent'>
              <h2 className='text-oby-green fs-18 font-bold'>Tin tức theo danh mục</h2>
              <RadioGroup value={selectedCate} onChange={setSelectedCate}>
                <div className='space-y-3.5 mt-4'>
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
                                className={`font-semibold fs-16  ${checked ? 'text-white' : 'text-oby-primary'}`}
                              >
                                {category.name}
                              </RadioGroup.Label>
                              <ChevronRightIcon className={`w-6 h-6  ${checked ? 'text-white' : 'text-oby-primary'}`} />
                            </div>
                          )}
                        </RadioGroup.Option>
                      )
                    }
                  })}
                </div>
              </RadioGroup>
            </div>
            <div className='@992:col-span-9 @992:order-2 order-1 col-span-12'>
              <div className='grid @992:grid-cols-3 @768:grid-cols-2 @992:gap-10 @768:gap-6'>
                {initializedBlogs.length > 0 ? (
                  initializedBlogs.map((item) => (
                    <div className='col-span-1' key={item.id}>
                      <OBYLink
                        className='flex flex-col'
                        href={hrefPath.blog + '/' + item.url_key + '-' + item.id}
                        title={item.name}
                      >
                        <div className='relative rounded-tl-4 rounded-br-4 overflow-hidden w-full @768:h-[142px] h-[180px]'>
                          <OBYImage
                            display='responsive'
                            src={generateBlogImage(item.image as string)}
                            alt={item.name}
                            className='object-cover'
                          />
                        </div>
                        <div className='mt-3'>
                          <div className='flex items-center gap-2'>
                            <div className='px-1.5 py-0.75 @992:fs-14 fs-12 border border-oby-blue leading-[130%] rounded-2 text-oby-blue max-w-max'>
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
  const { data: categories } = await blogAPI.GetListCategory()
  const { data: initBlogs } = await blogAPI.GetList({ page: 1, limit: 9 })
  return {
    props: {
      categories,
      initBlogs
    }
  }
}