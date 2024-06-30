import { AGRCategoryIcon, AGRMagnifyingGlassIcon, AGRShoppingBagIcon } from '../UI/AGRIcons'
import { OBYButton, OBYLink } from '../UI/Element'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { HiOutlineTicket } from 'react-icons/hi'

import { useCategorySheet, useFocusInput } from '@/hooks'

import cartApi from '@/apis/magento/cart.api'

import { cacheTime, customClasses } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

interface AppRoutingProps {
  token?: string
  guestCartId?: string
  cartId?: string
}

const AppRouting = ({ guestCartId, cartId, token }: AppRoutingProps) => {
  const router = useRouter()
  const registerCategory = useCategorySheet()
  const registerFocus = useFocusInput()

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

  return (
    <div className='bg-white sticky bottom-0 h-[72px] pt-2 inset-0 z-10'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <OBYButton variant={'ghost'} size={'ghost'} asChild className='flex flex-col items-center'>
            <OBYLink href={hrefPath.home}>
              <AiFillHome
                size={24}
                className={`${router.pathname === hrefPath.home ? 'text-agr-orange' : 'text-oby-676869'}`}
              />
              <p
                className={`font-medium @520:fs-12 fs-10 ${
                  router.pathname === hrefPath.home
                    ? `${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text`
                    : 'text-oby-676869'
                }`}
              >
                Trang chủ
              </p>
            </OBYLink>
          </OBYButton>
          <OBYButton
            variant={'ghost'}
            size={'ghost'}
            className='flex flex-col items-center'
            onClick={registerFocus.onFocus}
          >
            {/* <BiSearch size={24} /> */}
            <AGRMagnifyingGlassIcon
              className={`w-6 h-6 ${registerFocus.isFocus ? 'text-agr-orange' : 'text-oby-676869'}`}
            />
            <p
              className={`font-medium @520:fs-12 fs-10 ${
                registerFocus.isFocus
                  ? `${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text`
                  : 'text-oby-676869'
              }`}
            >
              Tìm kiếm
            </p>
          </OBYButton>
          <OBYButton
            variant={'ghost'}
            size={'ghost'}
            className='flex flex-col items-center'
            onClick={registerCategory.onOpen}
          >
            {/* <BsGrid size={24} /> */}
            <AGRCategoryIcon
              className={`w-6 h-6 ${registerCategory.isOpen ? 'text-agr-orange' : 'text-oby-676869'}`}
              stroke='#474747'
            />
            <p
              className={`font-medium @520:fs-12 fs-10 ${
                registerCategory.isOpen
                  ? `${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text`
                  : 'text-oby-676869'
              }`}
            >
              Danh mục
            </p>
          </OBYButton>
          <OBYButton variant={'ghost'} size={'ghost'} asChild className='flex flex-col items-center'>
            <OBYLink href={hrefPath.cartPage}>
              <div className='relative w-6 h-6'>
                <AGRShoppingBagIcon
                  className={`w-6 h-6 ${router.pathname === hrefPath.cartPage ? 'text-agr-orange' : 'text-oby-676869'}`}
                />
                {cartData && (
                  <p className='absolute flex items-center justify-center -top-0.5 -right-1 w-4.5 h-4.5 fs-10 ${customClasses.COMMON_GRADIENT} text-white rounded-full'>
                    {cartData.items_qty}
                  </p>
                )}
              </div>
              <p
                className={`font-medium @520:fs-12 fs-10 ${
                  router.pathname === hrefPath.cartPage
                    ? `${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text`
                    : 'text-oby-676869'
                }`}
              >
                Giỏ hàng
              </p>
            </OBYLink>
          </OBYButton>
          <OBYButton variant={'ghost'} size={'ghost'} asChild className='flex flex-col items-center'>
            <OBYLink href={hrefPath.discount}>
              <HiOutlineTicket
                size={24}
                className={`${router.pathname === hrefPath.discount ? 'text-agr-orange' : 'text-oby-676869'}`}
              />
              <p
                className={`font-medium @520:fs-12 fs-10 ${
                  router.pathname === hrefPath.discount
                    ? `${customClasses.COMMON_GRADIENT} inline-block text-transparent bg-clip-text`
                    : 'text-oby-676869'
                }`}
              >
                Khuyến mãi
              </p>
            </OBYLink>
          </OBYButton>
        </div>
      </div>
    </div>
  )
}

export default AppRouting
