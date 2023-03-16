import { HomeLayout } from '@/layouts'

import Banner from '@/components/Banner'
import {
  OBYChairIcon,
  OBYClothesIcon,
  OBYCowboyHatIcon,
  OBYDiaperIcon,
  OBYDressIcon,
  OBYHandBagIcon,
  OBYMedicalKitIcon,
  OBYMilkIcon,
  OBYOatIcon,
  OBYPharmacyIcon
} from '@/components/OBYIcons'
import ProductSuggest from '@/components/ProductSuggest'

const CategoryContent = [
  { icon: <OBYMilkIcon className='w-10 h-10' />, title: 'Sữa dinh dưỡng' },
  { icon: <OBYDiaperIcon className='w-10 h-10' />, title: 'Tả người lớn' },
  { icon: <OBYClothesIcon className='w-10 h-10' />, title: 'Quần áo cho ông' },
  { icon: <OBYCowboyHatIcon className='w-10 h-10' />, title: 'Phụ kiện cho ông' },
  { icon: <OBYMedicalKitIcon className='w-10 h-10' />, title: 'Dụng cụ y tế' },
  { icon: <OBYPharmacyIcon className='w-10 h-10' />, title: 'Vitamin & Thực phẩm chức năng' },
  { icon: <OBYOatIcon className='w-10 h-10' />, title: 'Ngũ cốc & hạt' },
  { icon: <OBYDressIcon className='w-10 h-10' />, title: 'Quần áo cho bà' },
  { icon: <OBYHandBagIcon className='w-10 h-10' />, title: 'Phụ kiện cho bà' },
  { icon: <OBYChairIcon className='w-10 h-10' />, title: 'Dụng cụ hỗ trợ' }
]

export default function Home() {
  return (
    <>
      <Banner />

      <HomeLayout>
        <ProductSuggest />
        <div className='pt-15'>
          <h2 className='fs-26 text-oby-green font-bold mb-7.5'>Mua sắm theo danh mục</h2>
          <div className='grid grid-cols-5 mt-7.5 gap-7.5'>
            {CategoryContent.map((item) => (
              <div className='col-span-1 py-3.5 px-5 border border-oby-DFDFDF rounded-4' key={item.title}>
                <div className='flex items-center gap-4'>
                  {item.icon}
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  )
}
