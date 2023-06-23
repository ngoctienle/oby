import { OBYButton, OBYLink } from '../UI/Element'
import { AiFillHome } from 'react-icons/ai'

import { hrefPath } from '@/constants/href.constant'

const AppRouting = ({}) => {
  return (
    <div className='bg-white sticky bottom-0 h-[72px] pt-2 inset-0 z-10'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <OBYButton variant={'ghost'} size={'ghost'} asChild className='flex flex-col gap-1'>
            <OBYLink href={hrefPath.home}>
              <AiFillHome size={24} />
            </OBYLink>
          </OBYButton>
        </div>
      </div>
    </div>
  )
}

export default AppRouting
