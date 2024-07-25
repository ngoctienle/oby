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
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M2 16.7266V15.9496L2.96187 15.777V8.19424L2.08925 8.05036V7.27338H4.70713L6.32347 13.6043L7.84065 7.27338H10.3495V8.05036L9.6454 8.16547C9.63879 8.7506 9.63218 9.34532 9.62557 9.94964C9.62557 10.5444 9.62557 11.1391 9.62557 11.7338V12.2662C9.62557 12.8609 9.62557 13.4556 9.62557 14.0504C9.63218 14.6451 9.63879 15.2398 9.6454 15.8345L10.3792 15.9496V16.7266H7.21593V15.9496L7.93981 15.8201C7.95303 15.235 7.95634 14.6643 7.94973 14.1079C7.94973 13.5516 7.95303 13.0384 7.95965 12.5683L7.97948 9.38849L6.21439 16.7266H5.45084L3.55685 9.3741L3.60643 12.2518V15.7626L4.41956 15.9496V16.7266H2Z'
                    fill='#222324'
                  />
                  <path
                    d='M13.2002 17C12.83 17 12.4499 16.9376 12.0598 16.8129C11.6698 16.6882 11.3327 16.4964 11.0484 16.2374L11.1079 14.1079H12.0301L12.2284 15.8777C12.3805 15.964 12.5325 16.0312 12.6846 16.0791C12.8366 16.1175 13.0052 16.1367 13.1903 16.1367C13.5473 16.1367 13.8183 16.0072 14.0034 15.7482C14.1885 15.4796 14.2811 15.1535 14.2811 14.7698C14.2811 14.3861 14.2117 14.0887 14.0728 13.8777C13.9406 13.6667 13.7258 13.4652 13.4283 13.2734L13.0019 13C12.4201 12.6067 11.9673 12.1703 11.6434 11.6906C11.326 11.211 11.1674 10.5731 11.1674 9.77698C11.1674 8.91367 11.3888 8.23741 11.8318 7.7482C12.2813 7.2494 12.8796 7 13.6266 7C13.9836 7 14.324 7.06715 14.648 7.20144C14.9785 7.32614 15.2628 7.5036 15.5008 7.73381L15.4214 9.7482H14.5092L14.3207 8.05036C14.215 7.99281 14.1092 7.94964 14.0034 7.92086C13.8977 7.88249 13.782 7.86331 13.6564 7.86331C13.3721 7.86331 13.1308 7.98321 12.9325 8.22302C12.7341 8.46283 12.635 8.77938 12.635 9.17266C12.635 9.55635 12.711 9.86331 12.8631 10.0935C13.0217 10.3141 13.2465 10.5204 13.5374 10.7122L14.0034 11.0144C14.6315 11.4269 15.0843 11.8633 15.3619 12.3237C15.6462 12.7746 15.7883 13.3645 15.7883 14.0935C15.7883 14.9376 15.5669 15.6331 15.124 16.1799C14.6876 16.7266 14.0464 17 13.2002 17Z'
                    fill='#222324'
                  />
                  <path
                    d='M16.1098 9.94964L16.1494 7.27338H21.9702L22 9.94964H21.177L20.9985 8.07914H19.9077C19.9011 8.67386 19.8945 9.27818 19.8878 9.89209C19.8878 10.4964 19.8878 11.1103 19.8878 11.7338V12.2518C19.8878 12.8465 19.8878 13.4412 19.8878 14.036C19.8945 14.6307 19.9011 15.2254 19.9077 15.8201L20.7605 15.9496V16.7266H17.3592V15.9496L18.2021 15.8201C18.2153 15.235 18.2219 14.6451 18.2219 14.0504C18.2219 13.4556 18.2219 12.8609 18.2219 12.2662V11.7338C18.2219 11.1295 18.2219 10.5252 18.2219 9.92086C18.2219 9.30696 18.2153 8.69305 18.2021 8.07914H17.1212L16.9328 9.94964H16.1098Z'
                    fill='#222324'
                  />
                </svg>
                <p className='fs-14 font-bold'>4001282315</p>
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
              <ul role='list' className='fs-14 @992:block grid grid-cols-2 gap-3'>
                <li className='block @992:mb-3.5 whitespace-nowrap order-1 col-span-1 w-[150px] @768:w-auto'>
                  <OBYLink href='/ve-chung-toi'>Giới thiệu</OBYLink>
                </li>
                <li className='block @992:mb-3.5 whitespace-nowrap order-3 col-span-1 w-[150px] @768:w-auto'>
                  <OBYLink href='/lien-he'>Liên hệ</OBYLink>
                </li>
                <li className='block @992:mb-3.5 whitespace-nowrap w-[160px] order-5 col-span-1'>
                  <OBYLink href='/blog'>Blogs</OBYLink>
                </li>
                <li className='block @992:mb-3.5 whitespace-nowrap w-[160px] order-2 col-span-1'>
                  <OBYLink href='/dieu-khoan-va-dieu-kien'>Điều khoản và điều kiện</OBYLink>
                </li>
                <li className='block whitespace-nowrap order-4 w-[160px] col-span-1'>
                  <OBYLink href='/chinh-sach-bao-mat'>Chính sách bảo mật</OBYLink>
                </li>
              </ul>
            </div>
            <div className='flex flex-col'>
              <h3 className='uppercase fs-18 mb-4 font-semibold'>CHĂM SÓC KHÁCH HÀNG</h3>
              <ul role='list' className='fs-14 @992:block grid grid-cols-2 gap-3'>
                <li className='@992:mb-3.5 order-1 col-span-1'>Trung tâm trợ giúp</li>
                <li className='@992:mb-3.5 order-3 col-span-1'>Tra cứu đơn hàng</li>
                <li className='@992:mb-3.5 order-5 col-span-1'>
                  <OBYLink href='/chinh-sach-van-chuyen'>Chính sách vận chuyển</OBYLink>
                </li>
                <li className='@992:mb-3.5 order-2 col-span-1'>
                  <OBYLink href='/thong-tin-thanh-toan'>Thông tin thanh toán</OBYLink>
                </li>
                <li className='@992:mb-3.5 order-4 col-span-1'>Chính sách bảo hành</li>
                <li className='order-6 @992:mb-3.5 w-[130px] col-span-1'>
                  <OBYLink href='/doi-tra-va-hoan-tien'>Đổi trả và hoàn tiền</OBYLink>
                </li>
                <li className='order-6 col-span-2'>
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
