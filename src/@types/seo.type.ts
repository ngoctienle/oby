import type { NextSeoProps } from 'next-seo'

export type OBYSEOProps = {
  template?: string
} & NextSeoProps

export type MetaSEO = {
  title: string
  description: string
  keywords: Array<string>
  slug: string
  og_image?: string
  og_image_alt: string
  type?: 'website' | 'blog'
} & OBYSEOProps
