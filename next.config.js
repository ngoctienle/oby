const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['13.229.247.102undefined', '13.229.247.102'],
    minimumCacheTTL: 86400
  },
  compiler: {
    removeConsole: !isDev
  },
  swcMinify: true,
  compress: true
}

module.exports = nextConfig
