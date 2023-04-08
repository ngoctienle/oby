import { OBYImage } from '../UI/Element'

export default function Blog() {
  return (
    <div className='flex @992:gap-4 gap-3'>
      <div className='relative @768:w-[205px] @768:h-[140px] w-[129px] h-[88px] flex-shrink-0'>
        <OBYImage display='responsive' src='/images/blog-example.png' alt='alt' className='object-cover' />
      </div>
      <div className=''>
        <div className='px-1.5 py-0.75 @992:fs-14 fs-12 border border-oby-blue leading-[130%] rounded-2 text-oby-blue max-w-max'>
          Thông tin bổ ích
        </div>
        <h2 className='font-semibold @992:h-11 @768:line-clamp-2 @992:fs-16 fs-14 line-clamp-3 @992:my-2.5 my-1.5'>
          Suspendisse convallis congue lorem et magna orci. Tortor quam nibh tortor proin
        </h2>
        <p className='text-oby-676869 fs-14 @768:line-clamp-3 leading-[130%] hidden @768:block'>
          Lobortis leo urna luctus nunc purus laoreet gravida. Rhoncus morbi turpis cras ultrices praesent lacus urna.
          Sed sit porttitor phasellus euismod aliquet.
        </p>
      </div>
    </div>
  )
}
