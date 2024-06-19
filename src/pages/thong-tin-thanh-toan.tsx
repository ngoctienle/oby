import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function PaymentPage() {
  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Thông Tin Thanh Toán',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/thong-tin-thanh-toan'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Thông tin thanh toán' />
        <div className='container'>
          <div className='grid grid-cols-12 @992:gap-10 gap-6'>
            <div className='@992:col-span-3 @992:order-1 order-2 col-span-12'>
              <div className='@768:py-3 py-2.5 rounded-tl-4 rounded-br-4 bg-white max-h-fit bsd'>
                <OBYLink href='/ve-chung-toi' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Về chúng tôi</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/chinh-sach-van-chuyen' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Chính sách vận chuyển</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink
                  href='/thong-tin-thanh-toan'
                  className='bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange flex items-center justify-between py-3 px-4.5'
                >
                  <p className='@768:fs-16 fs-14 text-white font-semibold'>Thông tin thanh toán</p>
                  <ChevronRightIcon className='w-6 h-6 text-white' />
                </OBYLink>
                <OBYLink href='/doi-tra-va-hoan-tien' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Đổi trả và hoàn tiền</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/dieu-khoan-va-dieu-kien' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Điều khoản và điều kiện</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/chinh-sach-bao-mat' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Chính sách bảo mật</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
              </div>
            </div>
            <div className='@992:col-span-9 @992:order-2 order-1 col-span-12 space-y-5'>
              <h2 className='font-bold text-oby-green @992:fs-26 fs-20'>Thông tin thanh toán</h2>
              <p className='@992:fs-16 fs-14'>
                Hiện nay{' '}
                <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                chấp nhận thanh toán qua 4 hình thức:
              </p>
              <ul className='pl-5 list-disc @992:fs-16 fs-14'>
                <li>VNPay</li>
                <li>Momo</li>
                <li>
                  Chuyển khoản ngân hàng. Khi thanh toán qua chuyển khoản ngân hàng, khách hàng vui lòng ghi rõ trong
                  nội dung chuyển khoản số hóa đơn hoặc tên sản phẩm để thuận tiện cho chúng tôi kiểm tra và đối soát
                  hóa đơn.
                </li>
                <li>COD</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
