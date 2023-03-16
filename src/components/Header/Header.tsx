import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { NextFont } from 'next/dist/compiled/@next/font'

import { hrefPath } from '@/constants/href.constant'

import { HeaderAds } from '@/components/OBYAds'
import { OBYCategoryIcon } from '@/components/OBYIcons'
import { UnstyledImage, UnstyledLink } from '@/components/Unstyled'

interface HeaderProps {
  font: NextFont
}

export default function Header({ font }: HeaderProps) {
  return (
    <>
      <HeaderAds />
      <header className={font.className}>
        <div className='bg-[#F6F7F8] py-1.5'>
          <div className='container'>
            <div className='flex items-center'>
              <div className='flex items-center gap-1'>
                <OBYCategoryIcon className='w-5 h-5 text-oby-676869' />
                <p className='fs-14'>Danh mục</p>
              </div>
              <div className='flex items-center gap-1 ml-15'>
                <p className='fs-14'>Mua hàng và CSKH</p>
                <UnstyledLink
                  href='tel:078 927 9669'
                  title='Mua hàng và CSKH'
                  className='text-oby-primary font-bold fs-14'
                >
                  078 927 9669
                </UnstyledLink>
              </div>
              <div className='flex items-center gap-1 ml-15'>
                <p className='fs-14'>Email</p>
                <UnstyledLink
                  href='mailto:ongbayeu.corp@gmail.com'
                  title='Email'
                  className='text-oby-primary font-bold fs-14'
                >
                  ongbayeu.corp@gmail.com
                </UnstyledLink>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='flex gap-12.5 items-center pt-1 pb-2'>
            <UnstyledLink
              href={hrefPath.home}
              title='OBY Trang chủ'
              className='flex items-center justify-center max-w-max'
            >
              <UnstyledImage width={68} height={68} src='/images/oby-logo.png' alt='OBY' title='OBY' />
            </UnstyledLink>
            <form className='flex items-center flex-grow border border-oby-DFDFDF rounded-tl-5 rounded-br-5 py-3.25 px-6'>
              <input
                type='text'
                placeholder='Cô chú cần tìm món hàng gì'
                className='outline-none w-full placeholder:text-oby-9A9898'
              />
              <MagnifyingGlassIcon className='w-4.5 h-4.5' />
            </form>
            <div className='flex flex-col items-center'>
              <div className='relative'>
                <ShoppingBagIcon className='w-9.5 h-9.5 text-oby-676869' strokeWidth={1} />
                <p className='absolute flex items-center justify-center top-2 -right-1 w-5 h-5 fs-11 bg-oby-primary text-white rounded-full'>
                  2
                </p>
              </div>
              <p className='fs-14'>Giỏ hàng</p>
            </div>
            <UnstyledLink href={hrefPath.login} className='flex flex-col items-center'>
              <UserCircleIcon className='w-9.5 h-9.5 text-oby-676869' strokeWidth={1} />
              <p className='fs-14'>Đăng nhập</p>
            </UnstyledLink>
          </div>
        </div>
      </header>
    </>
  )
}
