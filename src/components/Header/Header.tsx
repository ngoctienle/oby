import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
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
    enabled: !!guestCartId
  })

  const cartData = guestData?.data

  return (
    <>
      <header className={twclsx(font.className, 'sticky top-0 inset-x-0 z-10')}>
        <div className='bg-[#F6F7F8] py-1.5'>
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
        <div className='bg-white'>
          <div className='container'>
            <div className='flex gap-12.5 items-center py-1.5'>
              <OBYLink
                href={hrefPath.home}
                title='OBY Trang chủ'
                className='flex items-center justify-center w-[56px] h-[56px] relative'
              >
                <OBYImage
                  display='responsive'
                  src='/images/oby-logo.png'
                  alt='OBY'
                  title='OBY'
                  className='object-cover'
                />
              </OBYLink>
              <form className='flex items-center flex-grow border border-oby-DFDFDF rounded-tl-5 rounded-br-5 py-2.75 px-6'>
                <input
                  type='text'
                  placeholder='Cô chú cần tìm món hàng gì'
                  className='outline-none w-full placeholder:text-oby-9A9898'
                />
                <MagnifyingGlassIcon className='w-4.5 h-4.5' />
              </form>
              <div className='flex flex-col items-center'>
                <div className='relative'>
                  <ShoppingBagIcon className='w-8 h-8 text-oby-676869' strokeWidth={1} />
                  <p className='absolute flex items-center justify-center top-1 -right-1 w-4.5 h-5.5 fs-11 bg-oby-primary text-white rounded-full'>
                    {cartData?.items.length}
                  </p>
                </div>
                <p className='fs-12'>Giỏ hàng</p>
              </div>
              <OBYLink href={hrefPath.login} className='flex flex-col items-center'>
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
