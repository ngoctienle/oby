import { generateMetaSEO } from '@/libs/seo'

import { appInformationConfig } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYBuildingIcon, OBYEmailIcon, OBYLocationIcon, OBYPhoneIcon } from '@/components/UI/OBYIcons'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function ContactPage() {
  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Liên Hệ',
    description:
      'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, AGRIAMAZING, ongbayeu.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/lien-he'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Liên hệ' />
        <div className='container'>
          <div className='@992:pt-10 pt-5'>
            <h2 className='font-bold text-oby-green @992:fs-26 fs-20 mb-5 text-center'>Liên hệ</h2>
            <ul className='space-y-4 fs-14 @992:fs-16'>
              <li className='flex items-center space-x-3'>
                <OBYBuildingIcon className='w-6 h-6' />
                <p>Công ty TNHH AGRIAMAZING</p>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYLocationIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`https://www.google.com/maps/search/?api=1&query=${appInformationConfig.APP_ADDRESS_MAP}`}
                  title='AGRIAMAZING - Phone'
                >
                  Toà B Masteri Centre Point Đ. D1, Long Bình, Thủ Đức, Thành phố Hồ Chí Minh
                </OBYLink>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYPhoneIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink href={`tel:0789.279.669`} title='AGRIAMAZING - Phone'>
                  090 3122611
                </OBYLink>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYEmailIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink href={`mailto:admin@amazingsbuy.com`} title='AGRIAMAZING - Email'>
                  admin@amazingsbuy.com
                </OBYLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
