import { AddCartButton } from '@/components/UI/Button'
import { OBYImage, OBYLink } from '@/components/UI/Element'

export default function Product() {
  return (
    <div className='flex flex-col'>
      <OBYLink
        href='/sua-dinh-duong/san-pham-sua-example-2023'
        className='overflow-hidden relative w-[270px] pt-[56%] rounded-tl-4 rounded-br-4'
      >
        <OBYImage src='/images/pd-img.png' alt='alt' display='responsive' className='object-cover' />
      </OBYLink>
      <p className='h-11 mt-3.5 line-clamp-2'>Combo quà tặng Tết 2023 [GIA ĐƯỜNG AN THỊNH]</p>
      <div className='flex items-center mt-2'>
        <p className='font-bold'>1.699.000₫</p>
        <p className='line-through mx-3 text-oby-676869'>1.999.000₫</p>
        <p className='fs-14 text-oby-orange px-1.5 py-0.75 rounded-lg border border-oby-orange'>-15%</p>
      </div>
      <AddCartButton className='mt-3.5' />
    </div>
  )
}
