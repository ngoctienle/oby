import HeaderNav from './HeaderNav'
import HeaderSearch from './HeaderSearch'
import TopHeader from './TopHeader'
import UserHeader from './UserHeader'
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { NextFont } from 'next/dist/compiled/@next/font'
import { useMemo } from 'react'

import { ItemWithAttribute } from '@/@types/category.type'

import { useMediaQuery, useWindowScrollY } from '@/hooks'

import { TypeUser } from '@/libs/state'
import twclsx from '@/libs/twclsx'
import { cn } from '@/libs/utils'

import { getIDListCategoryAsString, getParentCategory } from '@/helpers/category'

import cartApi from '@/apis/magento/cart.api'
import categoryApi from '@/apis/magento/category.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import { OBYButton, OBYImage, OBYLink } from '@/components/UI/Element'

interface HeaderProps {
  font: NextFont
  isFocus: boolean
  token?: string
  user?: TypeUser
  guestCartId?: string
  cartId?: string
}

export default function Header({ font, isFocus, user, guestCartId, cartId, token }: HeaderProps) {
  const y = useWindowScrollY()
  const isMatch992 = useMediaQuery('(min-width:992px)')

  const { data: guestData } = useQuery({
    queryKey: ['guestCart', guestCartId || ''],
    queryFn: () => cartApi.GetGuestCart(guestCartId || ''),
    enabled: !token,
    refetchOnWindowFocus: true,
    staleTime: cacheTime.fiveMinutes
  })

  const { data: mineData } = useQuery({
    queryKey: ['cartId', cartId || ''],
    queryFn: () => cartApi.GetCart(token || ''),
    enabled: Boolean(token && cartId),
    refetchOnWindowFocus: true,
    staleTime: cacheTime.fiveMinutes
  })

  const cartData = useMemo(() => {
    if (!token) {
      return guestData?.data
    }
    return mineData?.data
  }, [guestData?.data, mineData?.data, token])

  const { data: parentCategoryRes } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.GetCategoryList()
    },
    staleTime: cacheTime.halfHours
  })
  const parentCategory = (parentCategoryRes && getParentCategory(parentCategoryRes.data)) || []

  const { data: parentCategoryAttrRes } = useQuery({
    queryKey: ['categoryAttr'],
    queryFn: () => categoryApi.GetAttrCategoryById(getIDListCategoryAsString(parentCategory)),
    enabled: parentCategory.length > 0,
    staleTime: cacheTime.halfHours
  })

  const parentCategoryItem = useMemo(() => {
    return parentCategoryAttrRes?.data.items as ItemWithAttribute[]
  }, [parentCategoryAttrRes])

  return (
    <>
      <header className={twclsx(font.className, 'sticky top-0 inset-x-0 z-10')}>
        {/* Top Header */}
        {isMatch992 && <TopHeader parentCategory={parentCategory} parentCategoryItem={parentCategoryItem} />}
        {/*  Main Header */}
        <div className={`@992:bg-white relative bg-transparent ${y > 0 && 'bg-white'}`}>
          <div className='container'>
            <div className='flex justify-between @992:gap-12.5 gap-3.5 items-center @992:py-1.5 py-3'>
              <OBYButton
                asChild
                variant='ghost'
                className={cn(
                  '@992:flex py-0 @992:w-[56px] @992:h-[56px] w-[44px] h-[44px] relative',
                  !isFocus && 'hidden'
                )}
              >
                <OBYLink href={hrefPath.home} title='OBY Trang chủ'>
                  <OBYImage
                    display='responsive'
                    src='/images/logo-brand.png'
                    alt='Ông Bà Yêu Logo Brand'
                    title='Ông Bà Yêu Logo Brand'
                    className='object-cover'
                    width={100}
                    height={100}
                  />
                </OBYLink>
              </OBYButton>
              {!isFocus && !isMatch992 && (
                <HeaderNav parentCategory={parentCategory} parentCategoryItem={parentCategoryItem} userInfo={user} />
              )}
              {/* Search Form */}
              {!isFocus && (
                <>
                  <HeaderSearch />
                  <OBYButton asChild variant='ghost' size='ghost'>
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
                  </OBYButton>
                  {user
                    ? isMatch992 && <UserHeader userInfo={user} />
                    : isMatch992 && (
                        <OBYButton variant='ghost' asChild size='ghost'>
                          <OBYLink href={hrefPath.login} className='flex flex-col items-center'>
                            <UserCircleIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                            <p className='fs-12'>Đăng nhập</p>
                          </OBYLink>
                        </OBYButton>
                      )}
                </>
              )}

              {isFocus && (
                <OBYButton asChild variant='link' size='link' className={cn('@992:fs-16 fs-14')}>
                  <OBYLink href={hrefPath.home} title='Bạn cần giúp đỡ?'>
                    Bạn cần giúp đỡ?
                  </OBYLink>
                </OBYButton>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
