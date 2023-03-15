import { UnstyledImage } from '@/components/Unstyled'

export default function Product() {
  return (
    <>
      <div className='relative w-full overflow-hidden pt-[100%]'>
        <UnstyledImage
          display='responsive'
          src='/images/pd-img.png'
          alt='alt'
          className='absolute top-0 left-0 w-full h-full bg-white object-cover'
        />
      </div>
    </>
  )
}
