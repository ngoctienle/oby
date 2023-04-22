import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { NextFont } from 'next/dist/compiled/@next/font'
import { useMemo } from 'react'

import { useWindowScrollY } from '@/hooks'

import { useGlobalState } from '@/libs/state'
import twclsx from '@/libs/twclsx'

import cartApi from '@/apis/magento/cart.api'

import { appInformationConfig, cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import { OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYCategoryIcon } from '@/components/UI/OBYIcons'

interface HeaderProps {
  font: NextFont
  isFocus: boolean
}

export default function Header({ font, isFocus }: HeaderProps) {
  const y = useWindowScrollY()
  const [guestCartId] = useGlobalState('guestCartId')
  const [token] = useGlobalState('token')
  const [cartId] = useGlobalState('cartId')
  const [user] = useGlobalState('user')

  const { data: guestData } = useQuery({
    queryKey: ['guestCart', guestCartId],
    queryFn: () => cartApi.GetGuestCart(guestCartId || ''),
    enabled: !token,
    refetchOnWindowFocus: true,
    staleTime: cacheTime.fiveMinutes
  })

  const { data: mineData } = useQuery({
    queryKey: ['cartId', cartId],
    queryFn: () => cartApi.GetCart(token || ''),
    enabled: !!token && !!cartId,
    refetchOnWindowFocus: true,
    staleTime: cacheTime.fiveMinutes
  })

  const cartData = useMemo(() => {
    if (!token) {
      return guestData?.data
    }
    return mineData?.data
  }, [guestData?.data, mineData?.data, token])

  return (
    <>
      <header className={twclsx(font.className, 'sticky top-0 inset-x-0 z-10')}>
        {/* Top Header */}
        <div className='bg-[#F6F7F8] py-1.5 @992:block hidden'>
          <div className='container'>
            <div className='flex items-center'>
              <div className='flex items-center gap-1'>
                <OBYCategoryIcon className='w-5 h-5 text-oby-676869' />
                <p className='fs-14'>Danh mục</p>
              </div>
              <div className='flex items-center gap-1 ml-15'>
                <p className='fs-14'>Mua hàng và CSKH</p>
                <OBYLink
                  href={`tel:${appInformationConfig.APP_PHONE}`}
                  title='Mua hàng và CSKH'
                  className='text-oby-primary font-bold fs-14'
                >
                  {appInformationConfig.APP_PHONE}
                </OBYLink>
              </div>
              <div className='flex items-center gap-1 ml-15'>
                <p className='fs-14'>Email</p>
                <OBYLink
                  href={`mailto:${appInformationConfig.APP_EMAIL}`}
                  title='Email'
                  className='text-oby-primary font-bold fs-14'
                >
                  {appInformationConfig.APP_EMAIL}
                </OBYLink>
              </div>
            </div>
          </div>
        </div>
        {/*  Main Header */}
        <div className={`@992:bg-white bg-transparent ${y > 0 && 'bg-white'}`}>
          <div className='container'>
            <div className='flex justify-between @992:gap-12.5 gap-3.5 items-center @992:py-1.5 py-3'>
              <OBYLink
                href={hrefPath.home}
                title='OBY Trang chủ'
                className={twclsx(
                  '@992:flex items-center justify-center @992:w-[56px] @992:h-[56px] w-[44px] h-[44px] relative',
                  !isFocus && 'hidden'
                )}
              >
                <OBYImage
                  display='responsive'
                  src='/images/oby-logo.png'
                  alt='Ông Bà Yêu Logo Brand'
                  title='Ông Bà Yêu Logo Brand'
                  className='object-cover'
                />
                <h1 className='sr-only'>Ông Bà Yêu</h1>
              </OBYLink>
              {!isFocus && <Bars3Icon className='@992:hidden inline-block w-7 h-7' />}
              {/* Search Form */}
              {!isFocus && (
                <>
                  <form className='flex items-center flex-grow border bg-white border-oby-DFDFDF rounded-tl-5 rounded-br-5 @992:py-2.75 @992:px-6 px-3 py-3.25'>
                    <input
                      type='text'
                      placeholder='Cô chú cần tìm món hàng gì'
                      className='outline-none w-full placeholder:text-oby-9A9898 placeholder:fs-14 @992:placeholder:fs-16'
                    />
                    <MagnifyingGlassIcon className='w-4.5 h-4.5' />
                  </form>
                  <OBYLink href={hrefPath.cartPage} className='flex flex-col items-center'>
                    <div className='relative'>
                      <ShoppingBagIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                      {cartData && (
                        <p className='absolute flex items-center justify-center top-1 -right-1 w-4.5 h-4.5 @992:fs-11 fs-10 bg-oby-primary text-white rounded-full'>
                          {cartData.items_qty}
                        </p>
                      )}
                    </div>
                    <p className='@992:fs-12 @992:block hidden'>Giỏ hàng</p>
                  </OBYLink>
                  {user ? (
                    <OBYLink href={hrefPath.home} className='@992:flex hidden flex-col items-center'>
                      <UserCircleIcon className='w-8 h-8 text-oby-primary' strokeWidth={1.1} />
                      <p className='fs-12 line-clamp-1'>{user.firstname}</p>
                    </OBYLink>
                  ) : (
                    <OBYLink href={hrefPath.login} className='@992:flex hidden flex-col items-center'>
                      <UserCircleIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                      <p className='fs-12'>Đăng nhập</p>
                    </OBYLink>
                  )}
                </>
              )}

              {isFocus && (
                <OBYLink href={hrefPath.home} className='@992:fs-16 fs-14 text-oby-primary'>
                  Bạn cần giúp đỡ?
                </OBYLink>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
