import { OBYImage, OBYLink } from '../UI/Element'
import { OBYCategoryIcon } from '../UI/OBYIcons'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useMemo } from 'react'

import { Category, ItemWithAttribute } from '@/@types/category.type'

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
          <Menu as='div' className='relative text-left'>
            <Menu.Button className='flex items-center gap-1'>
              <OBYCategoryIcon className='w-5 h-5 text-oby-676869' />
              <p className='fs-14'>Danh mục</p>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute z-50 left-0 mt-2 min-w-[720px] origin-top-left px-6 py-5 rounded-4 bg-white bsd focus:outline-none'>
                <h2 className='fs-16 font-semibold mb-4'>Danh mục sản phẩm</h2>
                <div className='grid grid-cols-3'>
                  {initializeCategory
                    ?.filter((item) => item.is_active && item.product_count !== 0)
                    .map((item) => (
                      <Menu.Item
                        as='div'
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
                          <p className='text-oby-green whitespace-nowrap hover:text-oby-primary fs-16 font-bold transition-colors'>
                            {item.name}
                          </p>
                        </div>
                        <div className='space-y-3 mt-3'>
                          {item.children_data.map((__item) => (
                            <p
                              key={__item.id}
                              className='fs-14 cursor-pointer hover:text-oby-primary transition-colors'
                            >
                              {' '}
                              {__item.name}
                            </p>
                          ))}
                        </div>
                      </Menu.Item>
                    ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
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
