import { NextFont } from 'next/dist/compiled/@next/font'

import { hrefPath } from '@/constants/href.constant'

import twclsx from '@/libs/twclsx'

import { OBYEmailIcon, OBYLocationIcon, OBYPhoneIcon } from '@/components/OBYIcons'
import { UnstyledImage, UnstyledLink } from '@/components/Unstyled'

interface FooterProps {
  font: NextFont
}

export default function Footer({ font }: FooterProps) {
  return (
    <footer className={twclsx(`${font.className}`, 'h-[500px] relative')}>
      <div className='absolute bottom-0 inset-x-0'>
        <div className='container'>
          <div className='flex gap-15'>
            <div className='flex flex-col'>
              <UnstyledLink
                href={hrefPath.home}
                title='OBY Trang chủ'
                className='flex items-center justify-center w-[68px] h-[68px] relative mb-6'
              >
                <UnstyledImage display='responsive' src='/images/oby-logo.png' alt='OBY' title='OBY' className='' />
              </UnstyledLink>
              <div className='flex items-center gap-3'>
                <OBYEmailIcon className='w-6 h-6 text-oby-676869' />
                <UnstyledLink href='mailto:ongbayeu.corp@gmail.com' className='fs-14'>
                  ongbayeu.corp@gmail.com
                </UnstyledLink>
              </div>
              <div className='flex items-center gap-3 mt-4'>
                <OBYPhoneIcon className='w-6 h-6 text-oby-676869' />
                <UnstyledLink href='tel:078 927 9669' className='fs-14'>
                  078 927 9669
                </UnstyledLink>
              </div>
              <div className='flex items-center gap-3 mt-4'>
                <OBYLocationIcon className='w-6 h-6 text-oby-676869' />
                <UnstyledLink href='' className='fs-14'>
                  68/7B Trần Quang Khải, Quận 1, TP Hồ Chí Minh, Việt Nam
                </UnstyledLink>
              </div>
            </div>
            <div className='flex flex-col'>
              <h3 className='uppercase fs-18 mb-4 font-semibold'>Về chúng tôi</h3>
              <ul role='list' className='fs-14'>
                <li className='mb-3.5'>Giới thiệu</li>
                <li className='mb-3.5'>Liên hệ</li>
                <li className='mb-3.5'>Blogs</li>
                <li className='mb-3.5'>Điều khoản và điều kiện</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div className='flex flex-col'>
              <h3 className='uppercase fs-18 mb-4 font-semibold'>CHĂM SÓC KHÁCH HÀNG</h3>
              <ul role='list' className='fs-14'>
                <li className='mb-3.5'>Trung tâm trợ giúp</li>
                <li className='mb-3.5'>Tra cứu đơn hàng</li>
                <li className='mb-3.5'>Chính sách vận chuyển</li>
                <li className='mb-3.5'>Thông tin thanh toán</li>
                <li className='mb-3.5'>Chính sách bảo hành</li>
                <li>Đổi trả và hoàn tiền</li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='uppercase fs-18 font-semibold'>Kết nối</h3>
              <div className='flex items-center gap-6.5'>
                <UnstyledImage
                  src='/images/oby-fb.png'
                  alt='OBY Facebook'
                  title='OBY Facebook'
                  width={40}
                  height={40}
                />
                <UnstyledImage
                  src='/images/oby-youtube.png'
                  alt='OBY Youtube'
                  title='OBY Youtube'
                  width={40}
                  height={40}
                />
                <UnstyledImage
                  src='/images/oby-insta.png'
                  alt='OBY Instagram'
                  title='OBY Instagram'
                  width={40}
                  height={40}
                />
              </div>
              <div className=''>
                <UnstyledImage
                  src='/images/oby-verify.png'
                  title='OBY Bộ Công Thương'
                  alt='OBY Bộ Công Thương'
                  width={127}
                  height={48}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='border-t border-t-oby-primary py-6 fs-12 text-center text-oby-676869 mt-7.5'>
          © 2023 Silverts Adaptive LLC, Chatsworth, California • VELCRO® is a registered trademark of Velcro Industries
          B.V. • Dr. Comfort® is a registered trademark of Dr Comfort.
        </div>
      </div>
    </footer>
  )
}
