export const cacheTime = {
  fiveMinutes: 5 * 60 * 100,
  halfHours: 30 * 60 * 100
} as const

export const seoConfig = {
  SEO_NAME: process.env.NEXT_PUBLIC_SEO_NAME,
  SEO_URL: process.env.NEXT_PUBLIC_SEO_URL
}
