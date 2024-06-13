// import Product from '../Product'
import GradientButton from '../UI/GradientButton'
import { Autoplay, EffectFade, Lazy, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useMediaQuery } from '@/hooks'

export default function SaleProduct() {
  const isMedium = useMediaQuery('(min-width:992px)')

  const saleProduct = {
    data: {
      items: [
        {
          id: 1,
          sku: 'test',
          name: 'Test',
          attribute_set_id: 4,
          price: 100000,
          status: 1,
          visibility: 4,
          type_id: 'simple',
          created_at: '2024-05-04 05:25:41',
          updated_at: '2024-05-27 04:45:59',
          extension_attributes: {
            website_ids: [1],
            category_links: [
              {
                position: 0,
                category_id: '2'
              },
              {
                position: 0,
                category_id: '13'
              }
            ]
          },
          product_links: [],
          options: [],
          media_gallery_entries: [
            {
              id: 1,
              media_type: 'image',
              label: null,
              position: 1,
              disabled: false,
              types: ['image', 'small_image', 'thumbnail', 'swatch_image'],
              file: '/p/r/product_sample_icon_picture.png'
            }
          ],
          tier_prices: [],
          custom_attributes: [
            {
              attribute_code: 'image',
              value: '/p/r/product_sample_icon_picture.png'
            },
            {
              attribute_code: 'small_image',
              value: '/p/r/product_sample_icon_picture.png'
            },
            {
              attribute_code: 'thumbnail',
              value: '/p/r/product_sample_icon_picture.png'
            },
            {
              attribute_code: 'swatch_image',
              value: '/p/r/product_sample_icon_picture.png'
            },
            {
              attribute_code: 'options_container',
              value: 'container2'
            },
            {
              attribute_code: 'url_key',
              value: 'test'
            },
            {
              attribute_code: 'gift_message_available',
              value: '2'
            },
            {
              attribute_code: 'msrp_display_actual_price_type',
              value: '0'
            },
            {
              attribute_code: 'required_options',
              value: '0'
            },
            {
              attribute_code: 'has_options',
              value: '0'
            },
            {
              attribute_code: 'meta_title',
              value: 'Test'
            },
            {
              attribute_code: 'meta_keyword',
              value: 'Test'
            },
            {
              attribute_code: 'meta_description',
              value: 'Test '
            },
            {
              attribute_code: 'tax_class_id',
              value: '2'
            },
            {
              attribute_code: 'category_ids',
              value: ['2', '13']
            },
            {
              attribute_code: 'hide_in_jm360',
              value: '0'
            }
          ]
        }
      ],
      search_criteria: {
        filter_groups: [
          {
            filters: [
              {
                field: 'category_id',
                value: '2',
                condition_type: 'in'
              }
            ]
          }
        ],
        page_size: 8,
        current_page: 1
      },
      total_count: 1
    }
  }

  return (
    <div className='bg-[#F6F6F6] '>
      <div className='container py-7 flex flex-col items-center'>
        <div className='flex flex-col items-center'>
          <p className='fs-14 text-oby-primary mb-1'>DANH MỤC</p>
          <p className='fs-26 font-bold mb-2'>KHUYẾN MÃI SỐC</p>
          <p className='fs-14 text-black mb-2'>KẾT THÚC TRONG</p>
        </div>
        <Swiper
          lazy={true}
          slidesPerView={2}
          pagination={{
            clickable: true
          }}
          loop={true}
          spaceBetween={30}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 30
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 40
            }
          }}
          modules={[Pagination, Lazy, EffectFade, Autoplay]}
          className='suggestProduct @992:mb-[60px] mb-[40px]'
        >
          {saleProduct ? (
            saleProduct.data.items.map((item) => {
              return <SwiperSlide key={item.id}>{/* <Product data={item} /> */}</SwiperSlide>
            })
          ) : (
            <div className='grid @992:grid-cols-4 @768:grid-cols-3 grid-cols-2 @992:gap-10 gap-5'>
              {Array(isMedium ? 4 : 2)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <div className='flex items-center justify-center h-48 mb-4 bg-oby-primary/10 rounded'>
                      <svg
                        className='w-12 h-12 text-oby-primary/20'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 640 512'
                      >
                        <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                      </svg>
                    </div>
                    <div className='h-2.5 bg-oby-primary/10 rounded-full w-48 mb-4' />
                    <div className='h-2 bg-oby-primary/10 rounded-full mb-2.5' />
                    <span className='sr-only'>Loading...</span>
                  </div>
                ))}
            </div>
          )}
        </Swiper>
        <GradientButton url={'/'} btnText='Xem tất cả' />
      </div>
    </div>
  )
}
