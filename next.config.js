const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['13.229.90.199', '13.229.90.199undefined'],
    minimumCacheTTL: 60
  },
  compiler: {
    removeConsole: !isDev
  },
  swcMinify: true,
  compress: true
}

module.exports = nextConfig
