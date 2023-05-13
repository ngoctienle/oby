import { OBYButton, OBYLink } from '../UI/Element'
import { Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { Fragment } from 'react'

import { TypeUser, useGlobalState } from '@/libs/state'
import { cn } from '@/libs/utils'

interface UserProps {
  userInfo: TypeUser
}

export default function UserHeader({ userInfo }: UserProps) {
  const [, setUser] = useGlobalState('user')
  const [, setCartId] = useGlobalState('cartId')
  const [, setToken] = useGlobalState('token')

  const handleLogout = () => {
    Cookies.remove('user')
    Cookies.remove('cartId')
    Cookies.remove('token')
    setUser(null)
    setCartId(null)
    setToken(null)
    window.location.reload()
  }

  return (
    <Menu as='div' className='relative text-left'>
      <OBYButton asChild variant='ghost' size='ghost'>
        <Menu.Button className='flex-col items-center'>
          <UserCircleIcon className='w-8 h-8 text-oby-primary' strokeWidth={1.1} />
          <p className='fs-12 line-clamp-1'>{userInfo.firstname}</p>
        </Menu.Button>
      </OBYButton>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-50 right-0 mt-2 w-[250px] origin-top-right py-2.5 rounded-4 bg-white bsd focus:outline-none'>
          <Menu.Item>
            <OBYButton asChild variant='ghost' className={cn('justify-between px-5 group w-full')}>
              <OBYLink href='/'>
                <p className='fs-16 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                  Hồ sơ của tôi
                </p>
                <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
              </OBYLink>
            </OBYButton>
          </Menu.Item>
          <Menu.Item>
            <OBYButton asChild variant='ghost' className={cn('justify-between px-5 group w-full')}>
              <OBYLink href='/'>
                <p className='fs-16 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                  Quản lý đơn hàng
                </p>
                <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
              </OBYLink>
            </OBYButton>
          </Menu.Item>
          <Menu.Item>
            <OBYButton asChild variant='ghost' className={cn('justify-between px-5 group w-full')}>
              <OBYLink href='/'>
                <p className='fs-16 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                  Danh sách địa chỉ
                </p>
                <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
              </OBYLink>
            </OBYButton>
          </Menu.Item>
          <Menu.Item>
            <OBYButton
              variant='ghost'
              onClick={handleLogout}
              className='flex w-full items-center justify-between px-5 group'
            >
              <p className='fs-16 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                Đăng xuất
              </p>
              <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
            </OBYButton>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
