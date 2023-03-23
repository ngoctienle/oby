const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['13.212.189.157']
  },
  compiler: {
    removeConsole: !isDev
  },
  swcMinify: true,
  compress: true
}

module.exports = nextConfig
