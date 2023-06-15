import HeaderV2Category from './HeaderV2Category'
import HeaderV2Nav from './HeaderV2Nav'
import HeaderV2Search from './HeaderV2Search'
import HeaderV2User from './HeaderV2User'
import { GiftIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { NextFont } from 'next/dist/compiled/@next/font'
import { useMemo } from 'react'

import { ItemWithAttribute } from '@/@types/category.type'

import { useMediaQuery } from '@/hooks'

import { TypeUser } from '@/libs/state'
import { cn } from '@/libs/utils'

import { getIDListCategoryAsString, getParentCategory } from '@/helpers/category'

import cartApi from '@/apis/magento/cart.api'
import categoryApi from '@/apis/magento/category.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import { OBYButton, OBYImage, OBYLink } from '@/components/UI/Element'

interface HeaderV2Props {
  font: NextFont
  isFocus: boolean
  token?: string
  user?: TypeUser
  guestCartId?: string
  cartId?: string
}

export default function HeaderV2({ font, isFocus, user, guestCartId, cartId, token }: HeaderV2Props) {
  const isMatch992 = useMediaQuery('(min-width:992px)')

  const { data: guestData } = useQuery({
    queryKey: ['guestCart', guestCartId],
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
    <header className={cn(font.className, 'sticky top-0 inset-x-0 z-10 bg-oby-primary py-3')}>
      <div className='container h-full'>
        <div className='flex gap-x-6 items-center justify-between'>
          <OBYButton
            asChild
            variant='ghost'
            className={cn('py-0 w-[115px] h-[36px] relative', !isMatch992 && !isFocus && 'hidden')}
          >
            <OBYLink href={hrefPath.home} title='Trang chủ Ông Bà Yêu'>
              <OBYImage src='/images/logo-white.svg' display='responsive' alt='Ông Bà Yêu' />
            </OBYLink>
          </OBYButton>
          {!isFocus && isMatch992 && (
            <HeaderV2Category parentCategoryItem={parentCategoryItem} parentCategory={parentCategory} />
          )}
          {!isFocus && !isMatch992 && (
            <HeaderV2Nav parentCategory={parentCategory} parentCategoryItem={parentCategoryItem} userInfo={user} />
          )}
          {!isFocus ? (
            <>
              <HeaderV2Search />
              <div className='flex space-x-3.5'>
                <OBYButton asChild variant='ghost' size='ghost' className='flex flex-col items-center'>
                  <OBYLink href={hrefPath.home} title='Ưu đãi'>
                    <div className='relative'>
                      <GiftIcon className='w-7 h-7 text-white' strokeWidth={1} />
                      <p className='absolute flex items-center justify-center -top-0.5 -right-1 w-4.5 h-4.5 fs-10 bg-oby-orange text-white rounded-full'>
                        {2}
                      </p>
                    </div>
                    <p className='@992:fs-12 @992:block hidden text-white'>Ưu đãi</p>
                  </OBYLink>
                </OBYButton>
                <OBYButton asChild variant='ghost' size='ghost' className='flex flex-col items-center'>
                  <OBYLink href={hrefPath.cartPage} title='Giỏ hàng'>
                    <div className='relative'>
                      <ShoppingBagIcon className='w-7 h-7 text-white' strokeWidth={1} />
                      {cartData && (
                        <p className='absolute flex items-center justify-center -top-0.5 -right-1 w-4.5 h-4.5 fs-10 bg-oby-orange text-white rounded-full'>
                          {cartData.items_qty}
                        </p>
                      )}
                    </div>
                    <p className='@992:fs-12 @992:block hidden text-white'>Giỏ hàng</p>
                  </OBYLink>
                </OBYButton>
                {user
                  ? isMatch992 && <HeaderV2User userInfo={user} />
                  : isMatch992 && (
                      <OBYButton variant='ghost' asChild size='ghost'>
                        <OBYLink href={hrefPath.login} className='flex flex-col items-center'>
                          <UserCircleIcon className='w-7 h-7 text-white' strokeWidth={1} />
                          <p className='@992:fs-12 @992:block hidden text-white'>Đăng nhập</p>
                        </OBYLink>
                      </OBYButton>
                    )}
              </div>
            </>
          ) : (
            <OBYButton asChild variant='ghost' size='ghost' className={cn('@992:fs-16 fs-14 text-white')}>
              <OBYLink href={hrefPath.home} title='Bạn cần giúp đỡ?'>
                Bạn cần giúp đỡ?
              </OBYLink>
            </OBYButton>
          )}
        </div>
      </div>
    </header>
  )
}
