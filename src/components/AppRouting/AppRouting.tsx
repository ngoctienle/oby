import { OBYButton, OBYLink } from '../UI/Element'
import { useRouter } from 'next/router'
import { AiFillHome, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { BsGrid } from 'react-icons/bs'
import { HiOutlineTicket } from 'react-icons/hi'

import { useCategorySheet, useFocusInput } from '@/hooks'

import { cn } from '@/libs/utils'

import { hrefPath } from '@/constants/href.constant'

const AppRouting = () => {
  const router = useRouter()
  const registerCategory = useCategorySheet()
  const registerFocus = useFocusInput()

  return (
    <div className='bg-white sticky bottom-0 h-[72px] pt-2 inset-0 z-10'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <OBYButton
            variant={'ghost'}
            size={'ghost'}
            asChild
            className={cn(
              'flex flex-col items-center',
              router.pathname === hrefPath.home ? 'text-oby-primary' : 'text-oby-676869'
            )}
          >
            <OBYLink href={hrefPath.home}>
              <AiFillHome size={24} />
              <p className='font-medium @520:fs-12 fs-10'>Trang chủ</p>
            </OBYLink>
          </OBYButton>
          <OBYButton
            variant={'ghost'}
            size={'ghost'}
            className={cn('flex flex-col items-center', registerFocus.isFocus ? 'text-oby-primary' : 'text-oby-676869')}
            onClick={registerFocus.onFocus}
          >
            <BiSearch size={24} />
            <p className='font-medium @520:fs-12 fs-10'>Tìm kiếm</p>
          </OBYButton>
          <OBYButton
            variant={'ghost'}
            size={'ghost'}
            className={cn(
              'flex flex-col items-center',
              registerCategory.isOpen ? 'text-oby-primary' : 'text-oby-676869'
            )}
            onClick={registerCategory.onOpen}
          >
            <BsGrid size={24} />
            <p className='font-medium @520:fs-12 fs-10'>Danh mục</p>
          </OBYButton>
          <OBYButton
            variant={'ghost'}
            size={'ghost'}
            asChild
            className={cn(
              'flex flex-col items-center',
              router.pathname === hrefPath.cartPage ? 'text-oby-primary' : 'text-oby-676869'
            )}
          >
            <OBYLink href={hrefPath.cartPage}>
              <AiOutlineShoppingCart size={24} />
              <p className='font-medium @520:fs-12 fs-10'>Giỏ hàng</p>
            </OBYLink>
          </OBYButton>
          <OBYButton
            variant={'ghost'}
            size={'ghost'}
            asChild
            className={cn(
              'flex flex-col items-center',
              router.pathname === hrefPath.discount ? 'text-oby-primary' : 'text-oby-676869'
            )}
          >
            <OBYLink href={hrefPath.discount}>
              <HiOutlineTicket size={24} />
              <p className='font-medium @520:fs-12 fs-10'>Khuyến mãi</p>
            </OBYLink>
          </OBYButton>
        </div>
      </div>
    </div>
  )
}

export default AppRouting
