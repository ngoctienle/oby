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
    <div className='px-20 pt-12.5 flex gap-10'>
      <div className='flex flex-col gap-4'>
        <div className='bg-oby-F6F7F8 py-2.5 px-3 rounded-4 flex flex-col items-center justify-center w-[140px]'>
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
      <div className='flex-grow overflow-x-hidden'>{children}</div>
      <div className='rounded-4 h-[316px]'>
        <UnstyledImage
          src='/images/oby-side-ads.png'
          width={140}
          height={316}
          style={{ maxWidth: 'unset' }}
          alt='alt'
        />
      </div>
    </div>
  )
}
