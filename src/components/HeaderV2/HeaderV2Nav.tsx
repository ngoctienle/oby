import { AGRCategoryIcon } from '../UI/AGRIcons'
import { HeaderV2CategoryProps } from './HeaderV2Category'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { Fragment, useMemo } from 'react'

import { useCategorySheet } from '@/hooks'

import { TypeUser, useGlobalState } from '@/libs/state'
import { cn } from '@/libs/utils'

import { hrefPath } from '@/constants/href.constant'

import { OBYButton, OBYLink } from '@/components/UI/Element'

interface NavProps extends HeaderV2CategoryProps {
  userInfo?: TypeUser
}

const DynamicCategoryContentNav = dynamic(() => import('./HeaderV2CategoryContentNav'))

export default function HeaderV2Nav({ parentCategory, parentCategoryItem, userInfo }: NavProps) {
  const registerCategory = useCategorySheet()

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
      {/* <Bars3Icon className='w-7 cursor-pointer text-white h-7' onClick={registerCategory.onOpen} /> */}
      <button className='w-7 h-7' onClick={registerCategory.onOpen}>
        <AGRCategoryIcon className='w-6 h-6' stroke='#474747' />
      </button>
      <Transition appear show={registerCategory.isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={registerCategory.onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-60' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-w-[1/3] min-h-full text-center'>
              <XMarkIcon
                className='absolute top-4 right-4 w-8 h-8 text-white z-1999'
                onClick={registerCategory.onClose}
              />
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300 transform'
                enterFrom='-translate-x-full opacity-0'
                enterTo='translate-x-0 opacity-100'
                leave='ease-in duration-200 transform'
                leaveFrom='translate-x-0 opacity-100'
                leaveTo='-translate-x-full opacity-0'
              >
                <Dialog.Panel className='w-2/3 flex flex-col justify-between min-w-[275px] bg-white px-4 text-left align-middle transform overflow-hidden  bsd transition-all relative'>
                  <div className='flex flex-col'>
                    <Dialog.Title as='h3' className='fs-16 font-bold my-4'>
                      Danh mục sản phẩm
                    </Dialog.Title>
                    {<DynamicCategoryContentNav initializeCategory={initializeCategory} />}
                  </div>
                  {!userInfo ? (
                    <OBYButton
                      asChild
                      variant='ghost'
                      className={cn('flex self-start gap-1.5 !rounded-0 border-b border-b-oby-DFDFDF')}
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
                              <UserCircleIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                              <p className='fs-16'>{userInfo.firstname}</p>
                            </div>
                            <ChevronRightIcon
                              className={`${
                                open ? 'rotate-90' : 'rotate-0'
                              } w-6 h-6 text-oby-676869 transition-transform`}
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
                  {/* <div className=''>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
