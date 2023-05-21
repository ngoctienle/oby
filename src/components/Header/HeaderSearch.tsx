import { OBYImage, OBYLink } from '../UI/Element'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'isomorphic-dompurify'
import { useRef, useState } from 'react'

import { useClickOutSide, useDebounce } from '@/hooks'

import { accentsMap, formatCurrency, getDiscountPercent } from '@/helpers'
import { generateProductImageFromMagento, getDiscount, isHaveDiscount } from '@/helpers/product'

import productApi from '@/apis/magento/product.api'

import { hrefPath } from '@/constants/href.constant'

function SearchLoading() {
  return (
    <>
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <div className='animate-pulse flex space-x-4 px-6 py-4 border-b border-b-oby-DFDFDF' key={index}>
            <div className='rounded-tl-4 rounded-br-4 bg-oby-primary/25 h-10 w-[70px]'></div>
            <div className='flex-1 space-y-2'>
              <div className='h-2 bg-oby-primary/25 rounded'></div>
              <div className='space-y-3'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='h-2 bg-oby-primary/25 rounded col-span-2'></div>
                  <div className='h-2 bg-oby-primary/25 rounded col-span-1'></div>
                </div>
                <div className='h-2 bg-oby-primary/25 rounded'></div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default function HeaderSearch() {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  /* const queryConfig = useQueryConfig()
  const router = useRouter() */

  const [searchStr, setSearchStr] = useState<string>('')
  const debounceSearchStr = useDebounce(searchStr, 650)

  useClickOutSide(ref, () => {
    setIsOpen(false)
  })

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value)
    setIsOpen(true)
  }

  const handleSubmitSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    /*  const data = new FormData(e.target)

    const config = {
      ...queryConfig,
      name: data && (data.get('name') as string)
    }

    if (config.name) {
      router.push({
        pathname: hrefPath.find,
        query: config
      })

      setIsOpen(false)
    } */
  }

  const filterStr = (str: string, searchStr: string) => {
    const regex = new RegExp(
      `(${searchStr
        .toLowerCase()
        .replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
        .split('')
        .map((char) => {
          const accentedChar = accentsMap[char]
          if (accentedChar) {
            return `[${char}${accentedChar}]`
          }
          return char
        })
        .join('')})`,
      'gi'
    )

    return str.replace(regex, '<span class="font-semibold">$1</span>')
  }

  const { data, isLoading } = useQuery({
    queryKey: ['products', debounceSearchStr],
    queryFn: () => productApi.Search(debounceSearchStr),
    enabled: debounceSearchStr.length > 0
  })

  return (
    <form
      onSubmit={handleSubmitSearch}
      className='@992:relative flex items-center flex-grow border bg-white focus-within:border-oby-primary hover:border-oby-primary transition-colors border-oby-DFDFDF rounded-tl-5 rounded-br-5 py-2.25 @992:px-6 px-3'
    >
      <input
        type='text'
        name='name'
        placeholder='Cô chú cần tìm món hàng gì'
        className='outline-none w-full placeholder:text-oby-9A9898 placeholder:fs-14 @992:placeholder:fs-16'
        onChange={handleTyping}
      />
      <MagnifyingGlassIcon className='w-4.5 h-4.5' />
      {debounceSearchStr !== '' && isOpen && (
        <div
          ref={ref}
          className='absolute top-full inset-x-0 @992:mt-2 bg-white @992:py-5 py-2 @992:rounded-4 w-full bsd'
        >
          {data?.data && data.data.items.length > 0
            ? data.data.items.map((product) => (
                <OBYLink
                  href={`${hrefPath.productDetail}/${product.sku}`}
                  className='@992:px-6 px-4 @992:py-4 py-3 border-b bg-white hover:bg-oby-F6F7F8 transition-colors border-b-oby-DFDFDF flex @992:gap-5 gap-4 items-center'
                  key={product.id}
                >
                  <div className='relative flex-shrink-0 w-[78px] h-[52px] overflow-hidden rounded-tl-4 rounded-br-4'>
                    <OBYImage
                      src={generateProductImageFromMagento(product.custom_attributes)}
                      alt={product.name}
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                  <div className='@992:space-y-2 space-y-1.5'>
                    <p
                      className='@992:fs-16 fs-14 line-clamp-2'
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(filterStr(product.name, debounceSearchStr))
                      }}
                    />
                    <div className='flex items-center gap-2.5'>
                      {isHaveDiscount(product.custom_attributes) ? (
                        <>
                          <p className='@992:fs-16 fs-14 font-semibold'>{getDiscount(product.custom_attributes)}</p>
                          <p className='@992:fs-14 fs-12 line-through text-oby-676869'>
                            {formatCurrency(product.price)}
                          </p>
                          <p className='@520:block hidden fs-12 text-oby-orange px-1 py-[1px] rounded-2 border border-oby-orange'>
                            {getDiscountPercent(product.custom_attributes)}
                          </p>
                        </>
                      ) : (
                        <p className='fs-16 font-semibold'>{formatCurrency(product.price)}</p>
                      )}
                    </div>
                  </div>
                </OBYLink>
              ))
            : !isLoading && (
                <p className='fs-16 text-center text-oby-676869'>
                  Xin lỗi, chúng tôi không thể tìm thấy kết quả phù hợp với từ khóa{' '}
                  <span className='font-semibold'>&quot;{debounceSearchStr}&quot;</span>
                </p>
              )}
          {isLoading && <SearchLoading />}
        </div>
      )}
    </form>
  )
}
