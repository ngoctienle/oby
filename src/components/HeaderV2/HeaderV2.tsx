import { AGRPresentIcon, AGRShoppingBagIcon } from '../UI/AGRIcons'
import HeaderV2Category from './HeaderV2Category'
import HeaderV2Nav from './HeaderV2Nav'
import HeaderV2Search from './HeaderV2Search'
import HeaderV2User from './HeaderV2User'
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { NextFont } from 'next/dist/compiled/@next/font'
import { useMemo } from 'react'
import { FiUser } from 'react-icons/fi'

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
    <header className={cn(font.className, 'sticky top-0 inset-x-0 z-10 ')}>
      <div className='py-3 bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange'>
        <div className='container h-full flex flex-row justify-between items-center'>
          <p className='text-white text-xs font-normal'>Chào mừng bạn đến với chúng tôi</p>
          <div className='flex flex-row justify-between items-center gap-6'>
            <div className='flex flex-row justify-between items-center gap-1'>
              <MapPinIcon className='h-4 w-4 text-[#FFE500]' />
              <p className='text-white text-xs font-normal'>47 Đ. Lê Duẩn, P. Bến Nghé, Q.1, TP. HCM</p>
            </div>
            <div className='flex flex-row justify-between items-center gap-1'>
              <ClockIcon className='h-4 w-4 text-[#FFE500]' />
              <p className='text-white text-xs font-normal'>Mon-Fri: 10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white py-4'>
        <div className='container h-full'>
          <div className='flex gap-x-6 items-center justify-between'>
            <OBYButton
              asChild
              variant='ghost'
              className={cn('py-0 w-[115px] h-[36px] relative', !isMatch992 && !isFocus && 'hidden')}
            >
              <OBYLink href={hrefPath.home} title='Trang chủ AGRIAMAZING'>
                <OBYImage display='responsive' src='/images/new_logo.svg' alt='AGRIAMAZING' />
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
                  {user
                    ? isMatch992 && <HeaderV2User userInfo={user} />
                    : isMatch992 && (
                        <OBYButton variant='ghost' asChild size='ghost'>
                          <OBYLink href={hrefPath.login} className='flex flex-row items-center justify-center'>
                            <FiUser className='w-6 h-6' stroke='#474747' />
                            <p className='@992:fs-12 @992:block hidden text-black ml-2'>Đăng nhập / Đăng ký</p>
                          </OBYLink>
                        </OBYButton>
                      )}
                  <OBYButton asChild variant='ghost' size='ghost' className='flex flex-col items-center'>
                    <OBYLink href={hrefPath.discount} title='Ưu đãi'>
                      <div className='relative'>
                        <AGRPresentIcon className='w-6 h-6' />
                        <p className='absolute flex items-center justify-center -top-0.5 -right-1 w-4.5 h-4.5 fs-10 bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange text-white rounded-full'>
                          {2}
                        </p>
                      </div>
                    </OBYLink>
                  </OBYButton>
                  <OBYButton asChild variant='ghost' size='ghost' className='flex flex-col items-center'>
                    <OBYLink href={hrefPath.cartPage} title='Giỏ hàng'>
                      <div className='relative'>
                        <AGRShoppingBagIcon className='w-6 h-6' />
                        {cartData && (
                          <p className='absolute flex items-center justify-center -top-0.5 -right-1 w-4.5 h-4.5 fs-10 bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange text-white rounded-full'>
                            {cartData.items_qty}
                          </p>
                        )}
                      </div>
                    </OBYLink>
                  </OBYButton>
                  <p className='w-14 break-words leading-3'>
                    <span className='text-[#8F8F8F] font-normal fs-8'>GIỎ HÀNG </span>
                    <span className='text-[#474747] font-semibold fs-12'>CỦA TÔI</span>
                  </p>
                </div>
              </>
            ) : (
              <OBYButton asChild variant='ghost' size='ghost' className={cn('@992:fs-16 fs-14 text-black')}>
                <OBYLink href={hrefPath.home} title='Bạn cần giúp đỡ?'>
                  Bạn cần giúp đỡ?
                </OBYLink>
              </OBYButton>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
