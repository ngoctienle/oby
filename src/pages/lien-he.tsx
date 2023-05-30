import { generateMetaSEO } from '@/libs/seo'

import { appInformationConfig } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYBuildingIcon, OBYEmailIcon, OBYLocationIcon, OBYPhoneIcon } from '@/components/UI/OBYIcons'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function ContactPage() {
  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Liên Hệ',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
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
                <p>Công ty TNHH Ông Bà Yêu</p>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYLocationIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`https://www.google.com/maps/search/?api=1&query=${appInformationConfig.APP_ADDRESS_MAP}`}
                  title='Ông Bà Yêu - Phone'
                >
                  68/7B Trần Quang Khải, P.Tân Định, Q.1, HCM
                </OBYLink>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYPhoneIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink href={`tel:0789.279.669`} title='Ông Bà Yêu - Phone'>
                  0789 27 9669
                </OBYLink>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYEmailIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink href={`mailto:ongbayeu.corp@gmail.com`} title='Ông Bà Yêu - Email'>
                  ongbayeu.corp@gmail.com
                </OBYLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
