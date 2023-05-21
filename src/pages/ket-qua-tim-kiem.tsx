import { RadioGroup } from '@headlessui/react'
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useQueryConfig } from '@/hooks'

import productApi from '@/apis/magento/product.api'

import Breadcrumb from '@/components/Breadcrumb'
import Product from '@/components/Product'
import { OBYImage } from '@/components/UI/Element'

export default function ResultSearchPage() {
  const queryConfig = useQueryConfig()

  const [selected, setSelected] = useState()

  const { data: productSearch, isLoading } = useQuery({
    queryKey: ['products', queryConfig.name],
    queryFn: () => productApi.Search(queryConfig.name as string),
    enabled: Boolean(queryConfig.name)
  })

  return (
    <>
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Kết quả tìm kiếm' />
        <div className='container'>
          <div className='grid grid-cols-12 gap-10'>
            <div className='col-span-3 bg-white bsd rounded-tl-4 rounded-br-4'></div>
            <div className='col-span-9'>
              <h2 className='fs-26 font-bold text-oby-green'>
                Kết quả tìm kiếm cho từ khoá &quot;{queryConfig.name}&quot;
              </h2>
              <p className='fs-16 mt-4'>
                {productSearch?.data.items.length} kết quả tìm kiếm cho từ khóa &quot;{queryConfig.name}&quot;
              </p>
              <div className='rounded-4 bg-oby-F6F7F8 py-2.5 px-5 mt-5 mb-6 flex items-center gap-6'>
                <p className='fs-16'>Sắp xếp theo</p>
                <RadioGroup value={selected} onChange={setSelected}>
                  <div className='flex items-center gap-2.5'>
                    <RadioGroup.Option
                      value='bc'
                      as='button'
                      className={({ checked }) =>
                        `inline-flex rounded-4 justify-center fs-14 items-center border transition-colors px-5 py-2.5 ${
                          checked ? 'border-oby-primary text-oby-primary' : 'border-oby-DFDFDF text-oby-676869'
                        }`
                      }
                    >
                      Bán chạy
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value='mn'
                      as='button'
                      className={({ checked }) =>
                        `inline-flex rounded-4 justify-center fs-14 items-center border transition-colors px-5 py-2.5 ${
                          checked ? 'border-oby-primary text-oby-primary' : 'border-oby-DFDFDF text-oby-676869'
                        }`
                      }
                    >
                      Mới nhất
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value='desc'
                      as='button'
                      className={({ checked }) =>
                        `inline-flex rounded-4 justify-center fs-14 items-center border transition-colors px-5 py-2.5 ${
                          checked ? 'border-oby-primary text-oby-primary' : 'border-oby-DFDFDF text-oby-676869'
                        }`
                      }
                    >
                      <BarsArrowDownIcon className='w-5 h-5' />
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value='asc'
                      as='button'
                      className={({ checked }) =>
                        `inline-flex rounded-4 justify-center fs-14 items-center border transition-colors px-5 py-2.5 ${
                          checked ? 'border-oby-primary text-oby-primary' : 'border-oby-DFDFDF text-oby-676869'
                        }`
                      }
                    >
                      <BarsArrowUpIcon className='w-5 h-5' />
                    </RadioGroup.Option>
                  </div>
                </RadioGroup>
              </div>
              <div className='grid grid-cols-12 gap-10'>
                {productSearch && !isLoading && productSearch.data.items.length > 0
                  ? productSearch?.data.items.map((item) => (
                      <div className='col-span-4' key={item.id}>
                        <Product data={item} cateName='' />
                      </div>
                    ))
                  : !isLoading && (
                      <div className='flex flex-col gap-6 items-center justify-center col-span-12 mt-20'>
                        <div className='relative w-[120px] h-[120px]'>
                          <OBYImage src='/images/no-result.png' alt='Không tìm thấy' display='responsive' />
                        </div>
                        <p className='fs-16 text-oby-676869'>
                          Xin lỗi, chúng tôi không thể tìm thấy kết quả phù hợp với từ khóa{' '}
                          <span className='font-semibold'>&quot;{queryConfig.name}&quot;.</span>
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
