const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['13.229.90.199', '13.229.90.199undefined', 'api.ongbayeu.com', 'api.ongbayeu.comundefined'],
    minimumCacheTTL: 60
  },
  compiler: {
    removeConsole: !isDev
  },
  swcMinify: true,
  compress: true
}

module.exports = nextConfig
