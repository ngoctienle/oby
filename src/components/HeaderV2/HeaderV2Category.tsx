import { CategoryButton } from '../UI/Button'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { Category, ItemWithAttribute } from '@/@types/category.type'

const DynamicCategoryContent = dynamic(() => import('./HeaderV2CategoryContent'))
const DynamicPopover = dynamic(() => import('@/components/Popover'))

export interface HeaderV2CategoryProps {
  parentCategory: Category[]
  parentCategoryItem: ItemWithAttribute[]
}

export default function HeaderV2Category({ parentCategory, parentCategoryItem }: HeaderV2CategoryProps) {
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
    <DynamicPopover
      className='flex flex-col items-center cursor-pointer'
      renderPopover={<DynamicCategoryContent initializeCategory={initializeCategory} />}
    >
      <CategoryButton />
    </DynamicPopover>
  )
}
