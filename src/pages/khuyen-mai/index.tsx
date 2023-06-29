import { Tab } from '@headlessui/react'
import { useState } from 'react'

import { cn } from '@/libs/utils'

import { createSlug } from '@/helpers'

import { hrefPath } from '@/constants/href.constant'

import { OBYImage, OBYLink } from '@/components/UI/Element'

const DiscountPage: React.FC = ({}) => {
  const [categories] = useState({
    'Ưu đãi': [
      {
        id: 1,
        title: '🎁 Giảm giá 10% cho tất cả các sản phẩm thực phẩm chức năng',
        des: '💊 Viên uống tăng cường sinh lực phái mạnh Smart Power 💪 Chỉ còn 1.000K',
        subtitle: '⏳ Ưu đãi lớn trong tháng 7 này 👉 Lên đơn ngay!',
        date: '27/06/2023 13:50'
      },
      {
        id: 2,
        title: '🎁 Giảm giá 15% cho tất cả các sản phẩm từ nhân sâm',
        des: '💊 Nước hồng sâm Pocheon 🎊 Chỉ còn 1.190K',
        subtitle: '⏳ Ưu đãi lớn trong tháng 7 này 👉 Lên đơn ngay!',
        date: '27/06/2023 13:50'
      }
    ],
    'Mã giảm giá': []
  })
  return (
    <div className='@992:pt-10 pt-5'>
      <div className='container'>
        <div className='bg-[#F1F1F1] rounded-4'>
          <Tab.Group>
            <Tab.List className='flex space-x-1'>
              {Object.entries(categories).map(([category, items]) => {
                const cateLength = items.length
                const displayedCate = cateLength > 0 ? `${category} (${cateLength})` : category
                return (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      cn(
                        'w-full py-2.5 text-sm font-medium leading-5 text-oby-primary',
                        'focus:outline-none',
                        selected ? 'border-b-[3px] border-b-oby-primary' : 'text-[#696969]'
                      )
                    }
                  >
                    {displayedCate}
                  </Tab>
                )
              })}
            </Tab.List>
            <Tab.Panels>
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel key={idx} className={cn('p-3', 'focus:outline-none')}>
                  <ul>
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <li key={post.id} className='relative flex gap-5 items-center rounded-md p-3 hover:bg-gray-100'>
                          <div className='relative @992:w-[52px] @992:h-[52px] w-8 h-8'>
                            <OBYImage
                              src={'/images/noti-icon.png'}
                              display='responsive'
                              className='absolute object-contain'
                              alt='Alert'
                            />
                          </div>
                          <div className='space-y-1'>
                            <h3 className='@992:fs-16 fs-12 font-semibold leading-5'>{post.title}</h3>
                            <ul className='space-y-1 font-medium @992:fs-16 fs-12'>
                              <li>{post.des}</li>
                              <li>{post.subtitle}</li>
                              <li className='@992:fs-14 fs-10 text-[#838383] italic'>{post.date}</li>
                            </ul>
                            <OBYLink
                              href={`${hrefPath.discount}/${createSlug(post.title)}`}
                              className={cn('absolute inset-0 rounded-md')}
                            />
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className='min-h-[400px] flex flex-col items-center justify-center'>
                        <div className='w-[200px] h-[200px] relative'>
                          <OBYImage
                            src={'/images/gift-icon.png'}
                            alt='Gift'
                            className='absolute object-contain'
                            display='responsive'
                          />
                        </div>
                        <p className='font-semibold fs-14 max-w-[220px] text-center'>
                          Hiện chưa có mã giảm giá nào. Vui lòng quay lại sau
                        </p>
                      </div>
                    )}
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}

export default DiscountPage
