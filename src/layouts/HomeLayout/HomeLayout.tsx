import { Link as ScrollHandler } from 'react-scroll'

import { ItemWithAttribute } from '@/@types/category.type'

import { generateImageFromMagento } from '@/helpers/category'

import { OBYImage } from '@/components/UI/Element'
import { OBYCategoryIcon } from '@/components/UI/OBYIcons'

interface HomeLayoutProps {
  children?: React.ReactNode
  dataCategory: ItemWithAttribute[]
}

export default function HomeLayout({ children, dataCategory }: HomeLayoutProps) {
  return (
    <div id='home-content' className='pt-15'>
      <div className='hidden @1544:block @1544:sticky @1544:w-full @1544:top-[130px] @1544:z-[2]'>
        <div className='container' style={{ position: 'relative', zIndex: '-1' }}>
          <div className='flex'>
            <div className='absolute @1544:right-[calc(100%+4px)] @1600:right-[calc(100%+32px)]'>
              <div className='bg-oby-F6F7F8 py-2.5 px-3 rounded-4 flex flex-col mb-3 items-center justify-center'>
                <OBYCategoryIcon className='text-oby-primary w-8 h-8' />
                <p className='text-oby-676869 fs-14 text-center whitespace-nowrap'>Tất cả danh mục</p>
              </div>
              <div className='bg-oby-F6F7F8 rounded-4 px-3 py-4'>
                {dataCategory?.map((item) => (
                  <ScrollHandler
                    to={item.name}
                    spy={true}
                    smooth={true}
                    duration={1000}
                    delay={150}
                    offset={-100}
                    className='flex cursor-pointer flex-col gap-0.5 items-center first:mt-0 mt-3'
                    key={item.id}
                  >
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
                  </ScrollHandler>
                ))}
              </div>
            </div>
            <div className='absolute @1544:left-[calc(100%+4px)] @1600:left-[calc(100%+32px)]'>
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
