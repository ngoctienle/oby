import { OBYCategoryIcon } from '../OBYSVG'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'

import { HeaderAds } from '@/components/OBYAds'
import { UnstyledImage, UnstyledLink } from '@/components/Unstyled'

export default function Header() {
  return (
    <>
      <HeaderAds />
      <header>
        <div className='bg-[#F6F7F8] py-1.5'>
          <div className='container'>
            <div className='flex items-center'>
              <div className='flex items-center gap-1'>
                <OBYCategoryIcon width='24' height='24' className='text-oby-676869' />
                <p>Danh mục</p>
              </div>
              <div className='flex items-center gap-1 ml-[60px]'>
                <p>Mua hàng và CSKH</p>
                <p className='text-oby-primary font-bold'>078 927 9669</p>
              </div>
              <div className='flex items-center gap-1 ml-[60px]'>
                <p>Email</p>
                <p className='text-oby-primary font-bold'>ongbayeu.corp@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='flex gap-[50px] items-center py-4'>
            <UnstyledLink href='/' title='OBY Trang chủ' className='flex items-center justify-center max-w-max'>
              <UnstyledImage width={68} height={68} src='/images/oby-logo.png' alt='OBY' title='OBY' />
            </UnstyledLink>
            <form className='flex items-center flex-grow border border-oby-DFDFDF rounded-[20px] py-[14px] px-6'>
              <input type='text' placeholder='Cô chú cần tìm món hàng gì' className='outline-none w-full' />
              <MagnifyingGlassIcon className='w-[18px] h-[18px]' />
            </form>
            <div className='flex flex-col items-center'>
              <div className='relative'>
                <ShoppingBagIcon className='w-11 h-11 text-oby-676869' strokeWidth={1} />
                <p className='absolute flex items-center justify-center top-2 -right-1 w-[22px] h-[22px] bg-oby-primary text-white rounded-full'>
                  2
                </p>
              </div>
              <p>Giỏ hàng</p>
            </div>
            <UnstyledLink href='/login' className='flex flex-col items-center'>
              <UserCircleIcon className='w-11 h-11 text-oby-676869' strokeWidth={1} />
              <p>Đăng nhập</p>
            </UnstyledLink>
          </div>
        </div>
      </header>
    </>
  )
}
