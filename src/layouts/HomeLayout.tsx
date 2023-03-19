import {
  OBYCategoryIcon,
  OBYChairIcon,
  OBYClothesIcon,
  OBYDressIcon,
  OBYMilkIcon,
  OBYOatIcon,
  OBYPharmacyIcon
} from '@/components/OBYIcons'
import { UnstyledImage } from '@/components/Unstyled'

interface HomeLayoutProps {
  children?: React.ReactNode
}

const LeftBarContent = [
  { icon: <OBYMilkIcon className='w-10 h-10' />, title: 'Sữa dinh dưỡng' },
  { icon: <OBYOatIcon className='w-10 h-10' />, title: 'Ngũ cốc & hạt' },
  { icon: <OBYPharmacyIcon className='w-10 h-10' />, title: 'Thực phẩm chức năng' },
  { icon: <OBYDressIcon className='w-10 h-10' />, title: 'Quần áo cho bà' },
  { icon: <OBYClothesIcon className='w-10 h-10' />, title: 'Quần áo cho ông' },
  { icon: <OBYChairIcon className='w-10 h-10' />, title: 'Dụng cụ hỗ trợ' }
]

export const HomeLayout: React.FunctionComponent<HomeLayoutProps> = ({ children }) => {
  return (
    <div id='home-content' className='pt-15'>
      <div className='sticky w-full top-[130px] z-[2]'>
        <div className='container' style={{ position: 'relative', zIndex: '-1' }}>
          <div className='flex'>
            <div className='w-[140px] absolute right-[calc(100%+32px)]'>
              <div className='bg-oby-F6F7F8 py-2.5 px-3 rounded-4 flex flex-col mb-3 items-center justify-center'>
                <OBYCategoryIcon className='text-oby-primary w-8 h-8' />
                <p className='text-oby-676869 fs-14 text-center'>Tất cả danh mục</p>
              </div>
              <div className='bg-oby-F6F7F8 rounded-4 px-3 py-4'>
                {LeftBarContent.map((item) => (
                  <div className='flex flex-col gap-0.5 items-center first:mt-0 mt-3' key={item.title}>
                    {item.icon}
                    <p className='text-oby-676869 fs-14 text-center'>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='absolute left-[calc(100%+32px)]'>
              <div className='rounded-4 relative w-[140px] h-[316px]'>
                <UnstyledImage src='/images/oby-side-ads.png' display='responsive' alt='alt' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='container overflow-hidden'>{children}</div>
      </div>
    </div>
  )
}
