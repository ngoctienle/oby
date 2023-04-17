import { NextSeo } from 'next-seo'

import { OBYSEOProps } from '@/@types/seo.type'

import { seoConfig } from '@/constants/config.constant'

export const OBYSeo: React.FunctionComponent<OBYSEOProps> = ({ ...props }) => {
  const TITLE_TEMPLATE = `%s | ${props.template ?? seoConfig.SEO_NAME}`
  return <NextSeo {...props} title={props.title} titleTemplate={TITLE_TEMPLATE} />
}
