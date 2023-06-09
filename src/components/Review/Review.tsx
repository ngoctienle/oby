import ProductRating from '../ProductRating'
import { OBYImage } from '../UI/Element'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import localeVi from 'dayjs/locale/vi'
import { DotIcon } from 'lucide-react'

interface ReviewProps {
  avatar?: string
  name: string
  date: string
  description?: string
  rate: number
}

export default function Review({ avatar, name, date, description, rate }: ReviewProps) {
  return (
    <div className='rounded-tl-4 rounded-br-4 border border-oby-DFDFDF p-5 bg-oby-F6F7F8 flex space-x-4 break-inside-avoid'>
      <div className='flex-shrink-0 rounded-full w-10 h-10 relative border border-oby-primary'>
        {avatar ? <OBYImage src={avatar} alt='name' /> : <UserCircleIcon />}
      </div>
      <div className='space-y-2'>
        <div className='flex items-center space-x-1.5'>
          <p className='text-oby-646464 fs-14 font-semibold'>{name}</p>
          <DotIcon className='text-oby-646464 w-3 h-3' strokeWidth={7} />
          <p className='fs-12 text-oby-676869'>
            {dayjs(date)
              .locale(localeVi)
              .format('MMMM DD, YYYY')
              .replace(/^\w/, (c) => c.toUpperCase())}
          </p>
        </div>
        <ProductRating size={6} rating={rate} />
        <p className='fs-14'>{description}</p>
      </div>
    </div>
  )
}
