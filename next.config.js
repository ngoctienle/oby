const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {domains: []},
  compiler: {
    removeConsole: !isDev
  },
  swcMinify: true,
  compress: true
}

module.exports = nextConfig
