const isDev = process.env.NODE_ENV === 'development'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.ongbayeu.com', 'api.ongbayeu.comundefined'],
    minimumCacheTTL: 60
  },
  compiler: {
    removeConsole: !isDev
  },
  swcMinify: true,
  compress: true
}

module.exports = withBundleAnalyzer(nextConfig)
