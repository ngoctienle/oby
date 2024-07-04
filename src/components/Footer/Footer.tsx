import { NextFont } from 'next/dist/compiled/@next/font'

import twclsx from '@/libs/twclsx'
import { cn } from '@/libs/utils'

import { appInformationConfig, customClasses } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import { OBYButton, OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYEmailIcon, OBYLocationIcon, OBYPhoneIcon } from '@/components/UI/OBYIcons'

interface FooterProps {
  font: NextFont
}

export default function Footer({ font }: FooterProps) {
  return (
    <footer className={twclsx(`${font.className}`, '@992:h-[600px] @520:h-[700px] h-[800px] relative bg-white')}>
      <div className='absolute bottom-0 inset-x-0'>
        <div className='container'>
          <div className='flex @992:flex-row flex-col @992:gap-15 gap-7.5'>
            <div className='flex flex-col'>
              <OBYButton asChild variant='ghost' className={cn('py-0 w-[115px] h-[36px] relative mb-6')}>
                <OBYLink href={hrefPath.home} title='Trang chủ AGRIAMAZING'>
                  <OBYImage src='/images/new_logo.svg' display='responsive' alt='AGRIAMAZING' />
                </OBYLink>
              </OBYButton>
              <div className='flex items-center gap-3'>
                <OBYEmailIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`mailto:${appInformationConfig.APP_EMAIL}`}
                  title='AGRIAMAZING - Email'
                  className='fs-14 font-bold'
                >
                  {appInformationConfig.APP_EMAIL}
                </OBYLink>
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <OBYPhoneIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`tel:${appInformationConfig.APP_PHONE}`}
                  title='AGRIAMAZING - Số điện thoại'
                  className='fs-14 font-bold'
                >
                  {appInformationConfig.APP_PHONE}
                </OBYLink>
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <OBYLocationIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`https://www.google.com/maps/search/?api=1&query=${appInformationConfig.APP_ADDRESS_MAP}`}
                  className='fs-14 font-bold'
                  title='AGRIAMAZING - Địa Chỉ Shop'
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
                <li className='block @992:mb-3.5 whitespace-nowrap order-3 w-[150px] @768:w-auto'>
                  <OBYLink href='/lien-he'>Liên hệ</OBYLink>
                </li>
                <li className='block @992:mb-3.5 whitespace-nowrap w-[160px] order-5'>
                  <OBYLink href='/blog'>Blogs</OBYLink>
                </li>
                <li className='block @992:mb-3.5 whitespace-nowrap w-[160px] order-2'>
                  <OBYLink href='/dieu-khoan-va-dieu-kien'>Điều khoản và điều kiện</OBYLink>
                </li>
                <li className='block whitespace-nowrap order-4 w-[160px]'>
                  <OBYLink href='/chinh-sach-bao-mat'>Chính sách bảo mật</OBYLink>
                </li>
              </ul>
            </div>
            <div className='flex flex-col'>
              <h3 className='uppercase fs-18 mb-4 font-semibold'>CHĂM SÓC KHÁCH HÀNG</h3>
              <ul role='list' className='fs-14 @992:block flex items-center flex-wrap justify-between gap-3'>
                <li className='@992:mb-3.5 order-1'>Trung tâm trợ giúp</li>
                <li className='@992:mb-3.5 order-3'>Tra cứu đơn hàng</li>
                <li className='@992:mb-3.5 order-5'>
                  <OBYLink href='/chinh-sach-van-chuyen'>Chính sách vận chuyển</OBYLink>
                </li>
                <li className='@992:mb-3.5 order-2'>
                  <OBYLink href='/thong-tin-thanh-toan'>Thông tin thanh toán</OBYLink>
                </li>
                <li className='@992:mb-3.5 order-4'>Chính sách bảo hành</li>
                <li className='order-6 @992:mb-3.5'>
                  <OBYLink href='/doi-tra-va-hoan-tien'>Đổi trả và hoàn tiền</OBYLink>
                </li>
                <li className='order-7'>
                  <OBYLink href='/huong-dan-thanh-toan'>Hướng dẫn thanh toán VNPAY</OBYLink>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='uppercase fs-18 font-semibold'>Kết nối</h3>
              <div className='flex items-center gap-6.5'>
                <OBYLink href='https://www.facebook.com/Agriamazingcom/'>
                  <OBYImage src='/images/oby-fb.png' alt='OBY Facebook' title='OBY Facebook' width={40} height={40} />
                </OBYLink>
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
        <div
          className={`${customClasses.COMMON_GRADIENT} @992:py-6 py-4 @992:fs-12 fs-10 text-center text-white @992:mt-7.5 mt-6`}
        ></div>
      </div>
    </footer>
  )
}
