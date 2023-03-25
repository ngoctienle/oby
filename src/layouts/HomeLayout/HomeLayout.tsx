import { useQuery } from '@tanstack/react-query'

import { Category } from '@/@types/category.type'

import { generateImageFromMagento, getIDListCategory } from '@/helpers/category'

import categoryApi from '@/apis/category.api'

import { OBYImage } from '@/components/UI/Element'
import { OBYCategoryIcon } from '@/components/UI/OBYIcons'

interface HomeLayoutProps {
  children?: React.ReactNode
  parentCategory: Category[]
}

export default function HomeLayout({ children, parentCategory }: HomeLayoutProps) {
  const { data } = useQuery({
    queryKey: ['categoryAttr'],
    queryFn: () => categoryApi.GetAttrCategoryById(getIDListCategory(parentCategory)),
    enabled: parentCategory.length > 0
  })

  const itemParent = data?.data.items

  return (
    <div id='home-content' className='pt-15'>
      <div className='sticky w-full top-[130px] z-[2]'>
        <div className='container' style={{ position: 'relative', zIndex: '-1' }}>
          <div className='flex'>
            <div className='absolute @1600:right-[calc(100%+32px)] right-[calc(100%+4px)]'>
              <div className='bg-oby-F6F7F8 py-2.5 px-3 rounded-4 flex flex-col mb-3 items-center justify-center'>
                <OBYCategoryIcon className='text-oby-primary w-8 h-8' />
                <p className='text-oby-676869 fs-14 text-center whitespace-nowrap'>Tất cả danh mục</p>
              </div>
              <div className='bg-oby-F6F7F8 rounded-4 px-3 py-4'>
                {itemParent?.map((item) => (
                  <div className='flex flex-col gap-0.5 items-center first:mt-0 mt-3' key={item.id}>
                    <div className='w-10 h-10 relative'>
                      <OBYImage
                        src={generateImageFromMagento(item.custom_attributes)}
                        display='responsive'
                        alt={item.name}
                        title={item.name}
                        className='object-cover'
                      />
                    </div>
                    <p className='text-oby-676869 fs-14 text-center'>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='absolute @1600:left-[calc(100%+32px)] left-[calc(100%+4px)]'>
              <div className='rounded-4 relative w-[140px] h-[316px]'>
                <OBYImage src='/images/oby-side-ads.png' display='responsive' alt='alt' className='object-cover' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container overflow-hidden'>{children}</div>
    </div>
  )
}
