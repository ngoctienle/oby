import { AddCartButton } from '@/components/Button'
import { UnstyledImage } from '@/components/Unstyled'

export default function Product() {
  return (
    <div className='flex flex-col'>
      <div className='overflow-hidden rounded-tl-2xl rounded-br-2xl'>
        <UnstyledImage src='/images/pd-img.png' alt='alt' width={310} height={180} className='w-[310px] h-[180px]' />
      </div>
      <p className='h-[44px] mt-[14px]'>Combo quà tặng Tết 2023 [GIA ĐƯỜNG AN THỊNH]</p>
      <div className='flex items-center mt-2'>
        <p className='font-bold'>1.699.000₫</p>
        <p className='line-through mx-3 text-oby-676869'>1.999.000₫</p>
        <p className='fs-14 text-oby-orange px-1.5 py-[3px] rounded-lg border border-oby-orange'>-15%</p>
      </div>
      <AddCartButton className='mt-[14px]' />
    </div>
  )
}
