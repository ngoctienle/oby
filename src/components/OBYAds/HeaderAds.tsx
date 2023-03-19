import { UnstyledImage } from '@/components/Unstyled'

export const HeaderAds: React.FunctionComponent = () => {
  return (
    <div className='h-15 relative'>
      <UnstyledImage
        alt='ads'
        title='ads'
        src='/images/oby-ads-header.png'
        display='responsive'
        className='object-cover'
      />
    </div>
  )
}
