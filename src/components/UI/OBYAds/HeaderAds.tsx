import { OBYImage } from '@/components/UI/Element'

export const HeaderAds: React.FunctionComponent = () => {
  return (
    <div className='h-12 bg-[#091419] relative @768:block hidden'>
      <OBYImage
        alt='ads'
        title='ads'
        src='/images/agr-ads-header.png'
        display='responsive'
        className='@992:object-none object-cover'
      />
    </div>
  )
}
