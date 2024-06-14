export const cacheTime = {
  fiveMinutes: 5 * 60 * 100,
  halfHours: 30 * 60 * 100
} as const

export const MAX_PRODUCT = 10000

export const seoConfig = {
  SEO_NAME: process.env.NEXT_PUBLIC_SEO_NAME || 'Ecommerce Shop',
  SEO_URL: process.env.NEXT_PUBLIC_SEO_URL || 'localhost:3000'
} as const

export const appInformationConfig = {
  APP_EMAIL: process.env.NEXT_PUBLIC_APP_CONTACT_EMAIL || 'example@email.com',
  APP_PHONE: process.env.NEXT_PUBLIC_APP_CONTACT_PHONE || '123 123 1234',
  APP_ADDRESS: process.env.NEXT_PUBLIC_APP_CONTACT_ADDRESS || '47 Đ. Lê Duẩn, P. Bến Nghé, Q.1, TP. HCM',
  APP_ADDRESS_MAP:
    process.env.NEXT_PUBLIC_APP_CONTACT_ADDRESS?.replace(' ', '+') || '47+Đ.+Lê Duẩn,+P.+Bến+Nghé,+Q.1,+TP.+HCM'
} as const
