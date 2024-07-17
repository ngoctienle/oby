import { generateMetaSEO } from '@/libs/seo'

import { hrefPath } from '@/constants/href.constant'

import { OBYImage } from '@/components/UI/Element'
import GradientButtonLink from '@/components/UI/GradientButtonLink'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function NotFoundPage() {
  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Không Tìm Thấy',
    description:
      'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`AMZ, AGRIAMAZING, agriamazing.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <div className='py-10 bg-white'>
        <div className='container'>
          <div className='relative @768:h-[120px] @768:w-[120px] w-[100px] h-[100px] mx-auto'>
            <OBYImage src='/images/404.png' display='responsive' alt='Không tìm thấy' />
          </div>
          <p className='@768:fs-16 fs-14 mt-6 text-center text-oby-676869'>
            Rất tiếc! Chúng tôi không tìm thấy trang bạn yêu cầu.
          </p>
          {/* <OBYLink
            href={hrefPath.home}
            className='flex items-center justify-center mt-10 gap-1.5 mx-auto bg-oby-primary rounded-4 py-2.5 @768:max-w-[300px] max-w-full'
            title='Trở về trang chủ'
          >
            <ChevronLeftIcon className='w-6 h-6 text-white' />
            <span className='fs-16 text-white'>Quay lại trang chủ</span>
          </OBYLink> */}
          <GradientButtonLink
            url={hrefPath.home}
            customClass='mt-10 @768:max-w-[300px] max-w-full mx-auto'
            btnText='Quay lại trang chủ'
          />
        </div>
      </div>
    </>
  )
}
