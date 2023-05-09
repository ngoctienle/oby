import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function HeaderSearch() {
  return (
    <form className='flex items-center flex-grow border bg-white border-oby-DFDFDF rounded-tl-5 rounded-br-5 py-2.25 @992:px-6 px-3'>
      <input
        type='text'
        placeholder='Cô chú cần tìm món hàng gì'
        className='outline-none w-full placeholder:text-oby-9A9898 placeholder:fs-14 @992:placeholder:fs-16'
      />
      <MagnifyingGlassIcon className='w-4.5 h-4.5' />
    </form>
  )
}
