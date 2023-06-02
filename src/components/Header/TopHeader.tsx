import Popover from '../Popover'
import { OBYImage, OBYLink } from '../UI/Element'
import { OBYCategoryIcon } from '../UI/OBYIcons'
import { useMemo } from 'react'

import { Category, ItemWithAttribute } from '@/@types/category.type'

import { createSlug } from '@/helpers'
import { generateCategoryImageFromMagento } from '@/helpers/category'

import { appInformationConfig } from '@/constants/config.constant'

export interface CateHeaderProps {
  parentCategory: Category[]
  parentCategoryItem: ItemWithAttribute[]
}

export default function TopHeader({ parentCategory, parentCategoryItem }: CateHeaderProps) {
  const initializeCategory = useMemo(() => {
    return parentCategory.map((category) => {
      const categoryItem = parentCategoryItem?.find((item) => item.id === category.id)
      const customAttributes = categoryItem?.custom_attributes || []

      return {
        ...category,
        custom_attributes: customAttributes
      }
    })
  }, [parentCategory, parentCategoryItem])

  return (
    <div className='bg-[#F6F7F8] py-1.5'>
      <div className='container'>
        <div className='flex items-center'>
          <Popover
            className='flex items-center gap-1 cursor-pointer'
            renderPopover={
              <div className='absolute -left-24 top-0 min-w-[1000px] h-[522px] overflow-auto px-6 py-5 rounded-4 bg-white bsd focus:outline-none'>
                <h2 className='fs-16 font-semibold mb-4'>Danh mục sản phẩm</h2>
                <div className='grid grid-cols-3'>
                  {initializeCategory
                    ?.filter((item) => item.is_active && item.product_count !== 0)
                    .map((item) => (
                      <div
                        className='col-span-1 nth-3n:border-r-transparent nth-[n+4]:mt-10 mr-5 pr-5 nth-3n:mr-0 nth-3n:pr-0 border-r border-r-oby-DFDFDF last:border-r-transparent'
                        key={item.id}
                      >
                        <div className='flex items-center gap-2 cursor-pointer'>
                          <div className='w-6 h-6 relative'>
                            <OBYImage
                              src={generateCategoryImageFromMagento(item.custom_attributes)}
                              display='responsive'
                              alt={item.name}
                              title={item.name}
                              className='object-cover'
                            />
                          </div>
                          <OBYLink
                            href={`${createSlug(item.name)}-${item.id}`}
                            className='text-oby-green whitespace-nowrap hover:text-oby-primary fs-16 font-bold transition-colors'
                          >
                            {item.name}
                          </OBYLink>
                        </div>
                        <div className='space-y-3 mt-3'>
                          {item.children_data.map((__item) => (
                            <OBYLink
                              href={`${createSlug(__item.name)}-${__item.id}`}
                              key={__item.id}
                              className='fs-14 block cursor-pointer hover:text-oby-primary transition-colors'
                            >
                              {' '}
                              {__item.name}
                            </OBYLink>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            }
          >
            <OBYCategoryIcon className='w-5 h-5 text-oby-676869' />
            <p className='fs-14'>Danh mục</p>
          </Popover>

          <div className='flex items-center gap-1 ml-15'>
            <p className='fs-14'>Mua hàng và CSKH</p>
            <OBYLink
              href={`tel:${appInformationConfig.APP_PHONE}`}
              title='Mua hàng và CSKH'
              className='text-oby-primary font-bold fs-14'
            >
              {appInformationConfig.APP_PHONE}
            </OBYLink>
          </div>
          <div className='flex items-center gap-1 ml-15'>
            <p className='fs-14'>Email</p>
            <OBYLink
              href={`mailto:${appInformationConfig.APP_EMAIL}`}
              title='Email'
              className='text-oby-primary font-bold fs-14'
            >
              {appInformationConfig.APP_EMAIL}
            </OBYLink>
          </div>
        </div>
      </div>
    </div>
  )
}
