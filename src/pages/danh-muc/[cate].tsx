import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { useMemo } from 'react'

import { useQueryProductConfig } from '@/hooks'

import { createSlug } from '@/helpers'

import categoryApi from '@/apis/magento/category.api'
import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

import { OBYButton, OBYLink } from '@/components/UI/Element'

const DynamicBreadcrumb = dynamic(() => import('@/components/Breadcrumb'))
const DynamicPagination = dynamic(() => import('@/components/Pagination'))
const DynamicProduct = dynamic(() => import('@/components/Product'))

interface CatePageProps {
  cateName: string
  cateId: string
}

interface IParams extends ParsedUrlQuery {
  cate: string
}

export default function CatePage({ cateName, cateId }: CatePageProps) {
  const queryConfig = useQueryProductConfig()
  const { data: productRes, isLoading } = useQuery({
    queryKey: ['products', cateId, queryConfig],
    queryFn: () => productApi.GetProductByCategoryID(Number(cateId), queryConfig.page, (queryConfig.limit = '9')),
    keepPreviousData: true,
    staleTime: cacheTime.fiveMinutes
  })
  const { data } = useQuery({
    queryKey: ['category', cateId],
    queryFn: () => categoryApi.GetCategoryList(),
    keepPreviousData: true,
    staleTime: cacheTime.fiveMinutes
  })

  const initialCate = useMemo(() => {
    return data?.data.children_data.find((item) => item.id === Number(cateId))
  }, [cateId, data])

  return (
    <>
      <section className='@992:pt-4 pt-3'>
        <DynamicBreadcrumb cateName={'Danh mục'} subCateName={cateName} />
        <div className='container'>
          <h2 className='@992:fs-26 fs-20 text-oby-green font-bold text-center'>{cateName}</h2>
          <div className='@992:pt-10 pt-5 grid @992:grid-cols-12 grid-cols-1 @992:gap-10 gap-5'>
            {initialCate && initialCate.children_data.length > 0 && (
              <div className='@992:col-span-3 col-span-1 bg-transparent'>
                <div className='bsd @992:bg-white bg-[#BCF0AA] @992:px-4 @992:py-5 py-2 px-4 @992:rounded-tl-4 @992:rounded-br-4 @992:rounded-0 rounded-4'>
                  <h3 className='fs-16 font-semibold mb-3 @992:block hidden'>Danh mục sản phẩm</h3>
                  <ul className='@992:space-y-3 space-y-0 @992:block flex @992:space-x-0 space-x-3 overflow-auto scrollbar-none'>
                    {initialCate?.children_data.map((item) => (
                      <li key={item.id} className='fs-14'>
                        <OBYButton
                          asChild
                          variant='link'
                          size='link'
                          className='text-oby-222324 @992:bg-transparent bg-white hover:text-oby-green whitespace-nowrap @992:border-transparent @992:px-0 @992:py-0 px-4 py-2.5 border border-oby-primary'
                        >
                          <OBYLink href={`${createSlug(item.name)}-${item.id}`} title={item.name}>
                            {item.name}
                          </OBYLink>
                        </OBYButton>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div
              className={`${
                initialCate && initialCate.children_data.length > 0 ? '@992:col-span-9' : '@992:col-span-12'
              } col-span-1`}
            >
              <div className='grid @768:grid-cols-3 grid-cols-2 @992:gap-10 gap-5'>
                {!isLoading &&
                  productRes?.data.items.map((item) => (
                    <div className='col-span-1' key={item.id}>
                      <DynamicProduct data={item} />
                    </div>
                  ))}
                {isLoading &&
                  Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div className='col-span-1' key={index}>
                        <div role='status' className='max-w-sm animate-pulse'>
                          <div className='flex items-center justify-center h-48 mb-4 bg-oby-primary/10 rounded'>
                            <svg
                              className='w-12 h-12 text-oby-primary/20'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                              fill='currentColor'
                              viewBox='0 0 640 512'
                            >
                              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                            </svg>
                          </div>
                          <div className='h-2.5 bg-oby-primary/10 rounded-full w-48 mb-4' />
                          <div className='h-2 bg-oby-primary/10 rounded-full mb-2.5' />
                          <span className='sr-only'>Loading...</span>
                        </div>
                      </div>
                    ))}
              </div>
              {!isLoading && productRes && productRes.data.total_count > 8 && (
                <DynamicPagination
                  queryConfig={queryConfig}
                  pageSize={Math.ceil(productRes.data.total_count / productRes.data.search_criteria.page_size)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<CatePageProps> = async (context) => {
  const { cate } = context.params as IParams
  if (!cate) {
    return {
      notFound: true
    }
  }
  const cateId = cate.split('-').pop()
  if (!cateId) {
    return {
      notFound: true
    }
  }
  const { data } = await categoryApi.GetCategoryNameById(cateId)

  return {
    props: {
      cateName: data.name,
      cateId
    }
  }
}
