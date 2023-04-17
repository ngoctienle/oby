import { MetaSEO, OBYSEOProps } from '@/@types/seo.type'

import { seoConfig } from '@/constants/config.constant'

/**
 * Function generateMetaSEO sử dụng Next-SEO được custom để hỗ trợ tạo các thẻ SEO chuẩn
 * @param data Được truyền vào từ các page với yêu cầu chặt chẽ
 * @returns Các thẻ sử dụng cho SEO vào phần <head> của HTML
 */
export const generateMetaSEO = (data: MetaSEO): OBYSEOProps => {
  return {
    canonical: seoConfig.SEO_URL + data.slug,
    openGraph: {
      images: [
        {
          url: data.og_image,
          alt: data.og_image_alt,
          width: 1200,
          height: 600
        }
      ],
      siteName: seoConfig.SEO_NAME,
      url: seoConfig.SEO_URL + data.slug,
      type: data.type ?? 'website'
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: data.keywords.join(', ')
      }
    ],
    ...data
  }
}
