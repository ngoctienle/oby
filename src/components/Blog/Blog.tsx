import { OBYImage } from '../UI/Element'

export default function Blog() {
  return (
    <div className='flex gap-4'>
      <div className='relative w-[205px] h-[140px] flex-shrink-0'>
        <OBYImage display='responsive' src='/images/blog-example.png' alt='alt' className='object-cover' />
      </div>
      <div className=''>
        <div className='px-1.5 py-0.75 fs-14 border border-oby-blue leading-[130%] rounded-2 text-oby-blue max-w-max'>
          Thông tin bổ ích
        </div>
        <h2 className='font-semibold h-11 line-clamp-2 my-2.5'>
          Suspendisse convallis congue lorem et magna orci. Tortor quam nibh tortor proin
        </h2>
        <p className='text-oby-676869 fs-14 line-clamp-3 leading-[130%]'>
          Lobortis leo urna luctus nunc purus laoreet gravida. Rhoncus morbi turpis cras ultrices praesent lacus urna.
          Sed sit porttitor phasellus euismod aliquet.
        </p>
      </div>
    </div>
  )
}
