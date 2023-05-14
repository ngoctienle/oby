import { NextFont } from 'next/dist/compiled/@next/font'

import twclsx from '@/libs/twclsx'

import { appInformationConfig } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import { OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYEmailIcon, OBYLocationIcon, OBYPhoneIcon } from '@/components/UI/OBYIcons'

interface FooterProps {
  font: NextFont
}

export default function Footer({ font }: FooterProps) {
  return (
    <footer className={twclsx(`${font.className}`, '@992:h-[500px] h-[785px] relative')}>
      <div className='absolute bottom-0 inset-x-0'>
        <div className='container'>
          <div className='flex @992:flex-row flex-col @992:gap-15 gap-7.5'>
            <div className='flex flex-col'>
              <OBYLink
                href={hrefPath.home}
                title='Ông Bà Yêu Trang chủ'
                className='flex items-center justify-center @992:w-[68px] @992:h-[68px] w-[64px] h-[64px] relative @992:mb-6 mb-5'
              >
                <OBYImage
                  display='responsive'
                  quality={100}
                  src='/images/logo-brand.png'
                  alt='Ông Bà Yêu'
                  title='Ông Bà Yêu'
                  className='object-cover'
                />
              </OBYLink>
              <div className='flex items-center gap-3'>
                <OBYEmailIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink href={`mailto:${appInformationConfig.APP_EMAIL}`} title='Ông Bà Yêu - Email' className='fs-14'>
                  {appInformationConfig.APP_EMAIL}
                </OBYLink>
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <OBYPhoneIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`tel:${appInformationConfig.APP_PHONE}`}
                  title='Ông Bà Yêu - Số điện thoại'
                  className='fs-14'
                >
                  {appInformationConfig.APP_PHONE}
                </OBYLink>
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <OBYLocationIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`https://www.google.com/maps/search/?api=1&query=${appInformationConfig.APP_ADDRESS_MAP}`}
                  className='fs-14'
                  title='Ông Bà Yêu - Địa Chỉ Shop'
                >
                  {appInformationConfig.APP_ADDRESS}
                </OBYLink>
              </div>
            </div>
            <div className='flex flex-col'>
              <h3 className='uppercase fs-18 mb-4 font-semibold'>Về chúng tôi</h3>
              <ul role='list' className='fs-14 @992:block flex items-center flex-wrap justify-between gap-3'>
                <li className='block @992:mb-3.5 whitespace-nowrap order-1 w-[150px] @768:w-auto'>
                  <OBYLink href='/ve-chung-toi'>Giới thiệu</OBYLink>
                </li>
                <li className='block @992:mb-3.5 whitespace-nowrap order-3 w-[150px] @768:w-auto'>Liên hệ</li>
                <li className='block @992:mb-3.5 whitespace-nowrap order-5'>Blogs</li>
                <li className='block @992:mb-3.5 whitespace-nowrap w-[160px] order-2'>Điều khoản và điều kiện</li>
                <li className='block whitespace-nowrap order-4 w-[160px]'>Chính sách bảo mật</li>
              </ul>
            </div>
            <div className='flex flex-col'>
              <h3 className='uppercase fs-18 mb-4 font-semibold'>CHĂM SÓC KHÁCH HÀNG</h3>
              <ul role='list' className='fs-14 @992:block flex items-center flex-wrap justify-between gap-3'>
                <li className='@992:mb-3.5 order-1'>Trung tâm trợ giúp</li>
                <li className='@992:mb-3.5 order-3'>Tra cứu đơn hàng</li>
                <li className='@992:mb-3.5 order-5'>Chính sách vận chuyển</li>
                <li className='@992:mb-3.5 order-2'>Thông tin thanh toán</li>
                <li className='@992:mb-3.5 order-4'>Chính sách bảo hành</li>
                <li className='order-6'>
                  <OBYLink href='/doi-tra-va-hoan-tien'>Đổi trả và hoàn tiền</OBYLink>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='uppercase fs-18 font-semibold'>Kết nối</h3>
              <div className='flex items-center gap-6.5'>
                <OBYImage src='/images/oby-fb.png' alt='OBY Facebook' title='OBY Facebook' width={40} height={40} />
                <OBYImage src='/images/oby-youtube.png' alt='OBY Youtube' title='OBY Youtube' width={40} height={40} />
                <OBYImage
                  src='/images/oby-insta.png'
                  alt='OBY Instagram'
                  title='OBY Instagram'
                  width={40}
                  height={40}
                />
                <OBYImage
                  src='/images/oby-verify.png'
                  title='OBY Bộ Công Thương'
                  alt='OBY Bộ Công Thương'
                  width={127}
                  height={48}
                  className='@992:hidden block'
                />
              </div>
              <div className='@992:block hidden'>
                <OBYImage
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
        <div className='border-t border-t-oby-primary @992:py-6 py-4 @992:fs-12 fs-10 text-center text-oby-676869 @992:mt-7.5 mt-6'>
          <p className='@992:px-0 px-4'>
            © 2023 Silverts Adaptive LLC, Chatsworth, California • VELCRO® is a registered trademark of Velcro
            Industries B.V. • Dr. Comfort® is a registered trademark of Dr Comfort.
          </p>
        </div>
      </div>
    </footer>
  )
}
