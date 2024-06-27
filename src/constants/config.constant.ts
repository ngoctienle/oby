export const cacheTime = {
  fiveMinutes: 5 * 60 * 100,
  halfHours: 30 * 60 * 100
} as const

export const customClasses = {
  COMMON_GRADIENT: 'bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange'
}

export const MAX_PRODUCT = 10000

export const seoConfig = {
  SEO_NAME: process.env.NEXT_PUBLIC_SEO_NAME || 'Ecommerce Shop',
  SEO_URL: process.env.NEXT_PUBLIC_SEO_URL || 'localhost:3000'
} as const

export const appInformationConfig = {
  APP_EMAIL: process.env.NEXT_PUBLIC_APP_CONTACT_EMAIL || 'admin@amazingsbuy.com',
  APP_PHONE: process.env.NEXT_PUBLIC_APP_CONTACT_PHONE || ' 090 3122611',
  APP_ADDRESS:
    process.env.NEXT_PUBLIC_APP_CONTACT_ADDRESS ||
    'Toà B Masteri Centre Point Đ. D1, Long Bình, Thủ Đức, Thành phố Hồ Chí Minh',
  APP_ADDRESS_MAP:
    process.env.NEXT_PUBLIC_APP_CONTACT_ADDRESS?.replace(' ', '+') ||
    'Toà+B+Masteri+Centre+Point+Đ.+D1,+Long+Bình,+Thủ+Đức,+Thành+phố+Hồ+Chí+Minh'
} as const
