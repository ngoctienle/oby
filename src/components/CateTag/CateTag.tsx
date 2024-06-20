import { OBYLink } from '../UI/Element'

import { ItemWithAttribute } from '@/@types/category.type'

import { customClasses } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

export const CateTag = ({ data }: { data: ItemWithAttribute | undefined }) => {
  return (
    <OBYLink
      href={`${hrefPath.catePage}/${data?.custom_attributes[7]?.value}-${data?.id}`}
      className={`border border-[#C7C7C7] rounded-full p-3 border-dashed hover:border-transparent hover:${customClasses.COMMON_GRADIENT}`}
    >
      <p className='font-medium fs-14 whitespace-nowrap'>{data?.name}</p>
    </OBYLink>
  )
}
