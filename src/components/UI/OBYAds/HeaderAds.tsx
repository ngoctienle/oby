import { OBYImage } from '@/components/UI/Element'

export const HeaderAds: React.FunctionComponent = () => {
  return (
    <div className='h-12 bg-[#091419] relative'>
      <OBYImage
        alt='ads'
        title='ads'
        src='/images/agr-ads-header.png'
        display='responsive'
        className='object-contain'
      />
    </div>
  )
}
