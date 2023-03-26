import HomeLayout from '@/layouts/HomeLayout'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Element as TriggerScroll } from 'react-scroll'

import { ItemWithAttribute } from '@/@types/category.type'

import { getIDListCategoryAsString, getParentCategory } from '@/helpers/category'

import categoryApi from '@/apis/category.api'

import Banner from '@/components/Banner'
import BlogList from '@/components/BlogList'
import ProductList from '@/components/ProductList'
import ProductSuggest from '@/components/ProductSuggest'
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
} from '@/components/UI/OBYIcons'

const CategoryContent = [
  { icon: <OBYMilkIcon className='w-10 h-10 flex-shrink-0' />, title: 'Sữa dinh dưỡng' },
  { icon: <OBYDiaperIcon className='w-10 h-10 flex-shrink-0' />, title: 'Tả người lớn' },
  { icon: <OBYClothesIcon className='w-10 h-10 flex-shrink-0' />, title: 'Quần áo cho ông' },
  { icon: <OBYCowboyHatIcon className='w-10 h-10 flex-shrink-0' />, title: 'Phụ kiện cho ông' },
  { icon: <OBYMedicalKitIcon className='w-10 h-10 flex-shrink-0' />, title: 'Dụng cụ y tế' },
  { icon: <OBYPharmacyIcon className='w-10 h-10 flex-shrink-0' />, title: 'Vitamin & Thực phẩm chức năng' },
  { icon: <OBYOatIcon className='w-10 h-10 flex-shrink-0' />, title: 'Ngũ cốc & hạt' },
  { icon: <OBYDressIcon className='w-10 h-10 flex-shrink-0' />, title: 'Quần áo cho bà' },
  { icon: <OBYHandBagIcon className='w-10 h-10 flex-shrink-0' />, title: 'Phụ kiện cho bà' },
  { icon: <OBYChairIcon className='w-10 h-10 flex-shrink-0' />, title: 'Dụng cụ hỗ trợ' }
]

export default function Home() {
  const { data: parentCategoryRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.GetCategoryList()
    }
  })
  const parentCategory = (parentCategoryRes && getParentCategory(parentCategoryRes.data)) || []

  const { data: parentCategoryAttrRes } = useQuery({
    queryKey: ['categoryAttr'],
    queryFn: () => categoryApi.GetAttrCategoryById(getIDListCategoryAsString(parentCategory)),
    enabled: parentCategory.length > 0
  })

  const parentCategoryItem = useMemo(() => {
    return parentCategoryAttrRes?.data.items as ItemWithAttribute[]
  }, [parentCategoryAttrRes])

  return (
    <>
      <Banner />

      <HomeLayout dataCategory={parentCategoryItem}>
        <ProductSuggest />
        <div className='pt-[90px]'>
          <h2 className='fs-26 text-oby-green font-bold mb-7.5'>Mua sắm theo danh mục</h2>
          <div className='grid grid-cols-5 gap-x-7.5 gap-y-6'>
            {CategoryContent.map((item) => (
              <div className='col-span-1 py-3.5 px-4 bg-white border border-oby-DFDFDF rounded-4' key={item.title}>
                <div className='flex items-center gap-4'>
                  {item.icon}
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {parentCategory.length > 0 &&
          parentCategory.map((item) => {
            if (item.is_active) {
              return (
                <TriggerScroll name={item.name} key={item.id}>
                  <ProductList categoryID={item.id} category={item.name} subcategory={item.children_data} />
                </TriggerScroll>
              )
            }
          })}
        <BlogList />
      </HomeLayout>
    </>
  )
}
