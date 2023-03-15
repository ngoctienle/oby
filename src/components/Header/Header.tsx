import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { NextFont } from 'next/dist/compiled/@next/font'

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
                <OBYCategoryIcon width='24' height='24' className='text-oby-676869' />
                <p>Danh mục</p>
              </div>
              <div className='flex items-center gap-1 ml-[60px]'>
                <p>Mua hàng và CSKH</p>
                <UnstyledLink href='tel:078 927 9669' title='Mua hàng và CSKH' className='text-oby-primary font-bold'>
                  078 927 9669
                </UnstyledLink>
              </div>
              <div className='flex items-center gap-1 ml-[60px]'>
                <p>Email</p>
                <UnstyledLink
                  href='mailto:ongbayeu.corp@gmail.com'
                  title='Email'
                  className='text-oby-primary font-bold'
                >
                  ongbayeu.corp@gmail.com
                </UnstyledLink>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='flex gap-[50px] items-center py-4'>
            <UnstyledLink href='/' title='OBY Trang chủ' className='flex items-center justify-center max-w-max'>
              <UnstyledImage width={68} height={68} src='/images/oby-logo.png' alt='OBY' title='OBY' />
            </UnstyledLink>
            <form className='flex items-center flex-grow border border-oby-DFDFDF rounded-tl-[20px] rounded-br-[20px] py-[14px] px-6'>
              <input type='text' placeholder='Cô chú cần tìm món hàng gì' className='outline-none w-full' />
              <MagnifyingGlassIcon className='w-[18px] h-[18px]' />
            </form>
            <div className='flex flex-col items-center'>
              <div className='relative'>
                <ShoppingBagIcon className='w-[38px] h-[38px] text-oby-676869' strokeWidth={1} />
                <p className='absolute flex items-center justify-center top-2 -right-1 w-5 h-5 fs-11 bg-oby-primary text-white rounded-full'>
                  2
                </p>
              </div>
              <p>Giỏ hàng</p>
            </div>
            <UnstyledLink href='/login' className='flex flex-col items-center'>
              <UserCircleIcon className='w-[38px] h-[38px] text-oby-676869' strokeWidth={1} />
              <p>Đăng nhập</p>
            </UnstyledLink>
          </div>
        </div>
      </header>
    </>
  )
}
