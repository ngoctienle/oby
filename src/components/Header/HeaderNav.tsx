import { OBYButton, OBYImage, OBYLink } from '../UI/Element'
import { CateHeaderProps } from './TopHeader'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { Fragment, useState } from 'react'

import { TypeUser, useGlobalState } from '@/libs/state'
import { cn } from '@/libs/utils'

import { generateCategoryImageFromMagento } from '@/helpers/category'

import { hrefPath } from '@/constants/href.constant'

interface NavProps extends CateHeaderProps {
  userInfo?: TypeUser
}

export default function HeaderNav({ parentCategory, parentCategoryItem, userInfo }: NavProps) {
  const [open, setOpen] = useState(false)

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
    <>
      <OBYButton variant='ghost' className={cn('@992:hidden w-7 h-7')}>
        <Bars3Icon type='button' onClick={() => setOpen(true)} />
      </OBYButton>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-w-[1/3] min-h-full text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300 transform'
                enterFrom='-translate-x-full opacity-0'
                enterTo='translate-x-0 opacity-100'
                leave='ease-in duration-200 transform'
                leaveFrom='translate-x-0 opacity-100'
                leaveTo='-translate-x-full opacity-0'
              >
                <Dialog.Panel className='w-2/3 min-w-[275px] transform overflow-hidden bg-white p-4 text-left align-middle bsd transition-all'>
                  <OBYButton variant='ghost' className={cn('w-6 h-6 p-0')} onClick={() => setOpen(false)}>
                    <ChevronLeftIcon />
                  </OBYButton>
                  {!userInfo ? (
                    <OBYButton
                      asChild
                      variant='ghost'
                      className={cn('flex justify-start gap-1.5 border-b border-b-oby-DFDFDF')}
                    >
                      <OBYLink href={hrefPath.login} title='Đăng nhập'>
                        <UserCircleIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                        <p className='fs-16'>Đăng nhập</p>
                      </OBYLink>
                    </OBYButton>
                  ) : (
                    <Disclosure as='div' className='py-3 transition-all border-b border-b-oby-DFDFDF relative'>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className='flex w-full items-center justify-between outline-none'>
                            <div className='flex items-center gap-1.5'>
                              <UserCircleIcon className='w-8 h-8 text-oby-primary' strokeWidth={1} />
                              <p className='fs-16'>{userInfo.firstname}</p>
                            </div>
                            <ChevronDownIcon
                              className={`${
                                open ? 'rotate-180' : 'rotate-0'
                              } w-6 h-6 text-oby-primary transition-transform`}
                            />
                          </Disclosure.Button>
                          <Transition
                            as={Fragment}
                            enter='transition duration-100 ease-out'
                            enterFrom='transform opacity-0'
                            enterTo='transform opacity-100 translate-y-0'
                            leave='transition duration-75 ease-out'
                            leaveFrom='transform opacity-100 translate-y-0'
                            leaveTo='transform opacity-0'
                          >
                            <Disclosure.Panel>
                              <OBYButton variant='ghost' asChild className={cn('w-full justify-between group')}>
                                <OBYLink href='/'>
                                  <p className='fs-14 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                                    Hồ sơ của tôi
                                  </p>
                                  <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
                                </OBYLink>
                              </OBYButton>
                              <OBYButton variant='ghost' asChild className={cn('w-full justify-between group')}>
                                <OBYLink href='/'>
                                  <p className='fs-14 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                                    Quản lý đơn hàng
                                  </p>
                                  <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
                                </OBYLink>
                              </OBYButton>
                              <OBYButton variant='ghost' asChild className={cn('w-full justify-between group')}>
                                <OBYLink href='/'>
                                  <p className='fs-14 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                                    Danh sách địa chỉ
                                  </p>
                                  <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
                                </OBYLink>
                              </OBYButton>
                              <OBYButton
                                variant='ghost'
                                className={cn('w-full justify-between group')}
                                onClick={handleLogout}
                              >
                                <p className='fs-14 font-semibold text-oby-676869 group-hover:text-oby-primary transition-colors'>
                                  Đăng xuất
                                </p>
                                <ChevronRightIcon className='w-6 h-6 text-oby-676869 group-hover:text-oby-primary transition-colors' />
                              </OBYButton>
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  )}
                  <Dialog.Title as='h3' className='fs-16 font-semibold my-3'>
                    Danh mục sản phẩm
                  </Dialog.Title>
                  {parentCategoryItem?.map((item) => (
                    <Dialog.Description
                      as='div'
                      key={item.id}
                      className='space-y-3 mb-3 pb-3 border-b border-b-oby-DFDFDF last:mb-0 last:pb-0 last:border-b-transparent'
                    >
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <div className='w-6 h-6 relative'>
                          <OBYImage
                            src={generateCategoryImageFromMagento(item.custom_attributes)}
                            display='responsive'
                            alt={item.name}
                            title={item.name}
                            className='object-cover'
                          />
                        </div>
                        <p className='text-oby-green whitespace-nowrap hover:text-oby-primary fs-14 font-bold transition-colors'>
                          {item.name}
                        </p>
                      </div>
                      {parentCategory?.map((_item) => {
                        if (item.id === _item.id) {
                          const childData = _item.children_data
                          return childData.map((__item) => (
                            <p
                              key={__item.id}
                              className='fs-14 cursor-pointer hover:text-oby-primary transition-colors'
                            >
                              {' '}
                              {__item.name}
                            </p>
                          ))
                        }
                      })}
                    </Dialog.Description>
                  ))}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
