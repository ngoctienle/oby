import { useWindowScrollY } from '@/hooks'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { NextFont } from 'next/dist/compiled/@next/font'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useGlobalState } from '@/libs/state'
import twclsx from '@/libs/twclsx'

import cartApi from '@/apis/cart.api'

import { hrefPath } from '@/constants/href.constant'

import { OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYCategoryIcon } from '@/components/UI/OBYIcons'

interface HeaderProps {
  font: NextFont
}

export default function Header({ font }: HeaderProps) {
  const y = useWindowScrollY()
  const [guestCartId, setGuestCartId] = useGlobalState('guestCartId')
  const [user] = useGlobalState('user')

  useEffect(() => {
    if (!guestCartId && !user) {
      cartApi
        .GenerateGuestCart()
        .then((response) => {
          const data = response.data
          setGuestCartId(data)
          Cookies.set('guestCartId', data)
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: guestData } = useQuery({
    queryKey: ['guestCart', guestCartId],
    queryFn: () => cartApi.GetGuestCart(guestCartId || ''),
    enabled: !!guestCartId,
    refetchOnWindowFocus: true
  })

  const cartData = guestData?.data

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
                <OBYLink href='tel:078 927 9669' title='Mua hàng và CSKH' className='text-oby-primary font-bold fs-14'>
                  078 927 9669
                </OBYLink>
              </div>
              <div className='flex items-center gap-1 ml-15'>
                <p className='fs-14'>Email</p>
                <OBYLink
                  href='mailto:ongbayeu.corp@gmail.com'
                  title='Email'
                  className='text-oby-primary font-bold fs-14'
                >
                  ongbayeu.corp@gmail.com
                </OBYLink>
              </div>
            </div>
          </div>
        </div>
        {/*  Main Header */}
        <div className={`@992:bg-white bg-transparent ${y > 0 && 'bg-white'}`}>
          <div className='container'>
            <div className='flex @992:gap-12.5 gap-3.5 items-center @992:py-1.5 py-3'>
              <OBYLink
                href={hrefPath.home}
                title='OBY Trang chủ'
                className='@992:flex hidden items-center justify-center w-[56px] h-[56px] relative'
              >
                <OBYImage
                  display='responsive'
                  src='/images/oby-logo.png'
                  alt='OBY'
                  title='OBY'
                  className='object-cover'
                />
              </OBYLink>
              <Bars3Icon className='@992:hidden inline-block w-7 h-7' />
              {/* Search Form */}
              <form className='flex items-center flex-grow border bg-white border-oby-DFDFDF rounded-tl-5 rounded-br-5 @992:py-2.75 @992:px-6 px-3 py-3.25'>
                <input
                  type='text'
                  placeholder='Cô chú cần tìm món hàng gì'
                  className='outline-none w-full placeholder:text-oby-9A9898 placeholder:fs-14 @992:placeholder:fs-16'
                />
                <MagnifyingGlassIcon className='w-4.5 h-4.5' />
              </form>
              <div className='flex flex-col items-center'>
                <div className='relative'>
                  <ShoppingBagIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                  <p className='absolute flex items-center justify-center top-1 -right-1 w-4.5 h-4.5 @992:fs-11 fs-10 bg-oby-primary text-white rounded-full'>
                    {cartData?.items.length}
                  </p>
                </div>
                <p className='@992:fs-12 hidden'>Giỏ hàng</p>
              </div>
              <OBYLink href={hrefPath.login} className='@992:flex hidden flex-col items-center'>
                <UserCircleIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                <p className='fs-12'>Đăng nhập</p>
              </OBYLink>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
