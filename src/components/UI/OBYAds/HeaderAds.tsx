import { OBYImage } from '@/components/UI/Element'

export const HeaderAds: React.FunctionComponent = () => {
  return (
    <div className='h-15 relative'>
      <OBYImage alt='ads' title='ads' src='/images/oby-ads-header.png' display='responsive' className='object-cover' />
    </div>
  )
}
