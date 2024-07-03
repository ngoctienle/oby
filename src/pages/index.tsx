import HomeLayout from '@/layouts/HomeLayout'
import dynamic from 'next/dynamic'

import { generateMetaSEO } from '@/libs/seo'

import Banner from '@/components/Banner'
import BestSellingProduct from '@/components/BestSellingProduct'
import CategoriesShop from '@/components/CategoriesShop'
import HealthProduct from '@/components/HealthProduct'
import ProductSuggest from '@/components/ProductSuggest'
import SaleProduct from '@/components/SaleProduct'
import { OBYSeo } from '@/components/UI/OBYSeo'

const DynamicBlogList = dynamic(() => import('@/components/BlogList'))

/* const CategoryContent = [
  { icon: <OBYMilkIcon className='w-10 h-10 flex-shrink-0' />, title: 'Sữa dinh dưỡng' },
  { icon: <OBYDiaperIcon className='w-10 h-10 flex-shrink-0' />, title: 'Tả người lớn' },
  { icon: <OBYClothesIcon className='w-10 h-10 flex-shrink-0' />, title: 'Quần áo cho ông' },
  { icon: <OBYCowboyHatIcon className='w-10 h-10 flex-shrink-0' />, title: 'Phụ kiện cho ông' },
  { icon: <OBYMedicalKitIcon className='w-10 h-10 flex-shrink-0' />, title: 'Dụng cụ y tế' },
  { icon: <OBYPharmacyIcon className='w-10 h-10 flex-shrink-0' />, title: 'Vitamin & Thực phẩm chức năng' },
  { icon: <OBYOatIcon className='w-10 h-10 flex-shrink-0' />, title: 'Ngũ cốc & hạt' },
  { icon: <OBYDressIcon className='w-10 h-10 flex-shrink-0' />, title: 'Quần áo cho bà' },
  { icon: <OBYHandBagIcon className='w-10 h-10 flex-shrink-0' />, title: 'Phụ kiện cho bà' },
  { icon: <OBYChairIcon className='w-10 h-10 flex-shrink-0' />, title: 'Dụng cụ hỗ trợ' }
] */

export default function Home() {
  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Trang Chủ',
    description: 'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp.',
    keywords: [`OBY, AGRIAMAZING, agriamazing.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/'
  })

  return (
    <>
      <OBYSeo {...meta} />
      <Banner />
      <HomeLayout>
        {/* new ui */}
        <SaleProduct />
        <CategoriesShop />
        <BestSellingProduct />
        <HealthProduct />
        <ProductSuggest />
        {/* new ui */}

        {/* Suggest Category */}
        {/* <h2 className='@992:fs-26 hidden @992:block fs-20 text-oby-green font-bold mb-5'>Mua sắm theo danh mục</h2>
        <div className='@992:hidden flex justify-between items-center mb-5'>
          <h2 className='fs-20 text-oby-green font-bold'>Danh mục</h2>
          <div className='flex items-center justify-center gap-1.5'>
            <OBYLink href='/' className='text-oby-primary @992:fs-18 fs-14'>
              Xem tất cả
            </OBYLink>
            <ChevronRightIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
          </div>
        </div>
        <div className='overflow-x-auto scrollbar-none'>
          <div className='min-w-[576px]'>
            <div className='grid grid-cols-5 @992:gap-x-7.5 gap-x-3.25 @992:gap-y-6 gap-y-4'>
              {initializeCategory.length > 0 &&
                initializeCategory.map((item) => {
                  if (item.is_active && item.product_count > 0)
                    return (
                      <ScrollHandler
                        to={item.name}
                        spy={true}
                        smooth={true}
                        duration={1000}
                        delay={150}
                        offset={-50}
                        href='#'
                        title={item.name}
                        className='col-span-1 py-2.5 px-4 bg-white border border-oby-green rounded-4 flex @992:flex-row flex-col items-center @992:gap-4 gap-2'
                        key={item.id}
                      >
                        <div className='relative @992:w-10 @992:h-10 h-8 w-8 flex-shrink-0'>
                          <OBYImage
                            src={generateCategoryImageFromMagento(item.custom_attributes)}
                            display='responsive'
                            alt={item.name}
                          />
                        </div>
                        <p className='text-oby-green @992:fs-16 fs-12 @992:text-start text-center line-clamp-2'>
                          {item.name}
                        </p>
                      </ScrollHandler>
                    )
                })}
            </div>
          </div>
        </div> */}
        {/* Product List */}
        {/* <div id='product-list-wrap'>
          {initializeCategory.length > 0 &&
            initializeCategory.map((item) => {
              if (item.is_active && item.product_count !== 0) {
                return (
                  <TriggerScroll name={item.name} key={item.id} className='@992:pt-10 pt-7.5'>
                    <DynamicProductList categoryID={item.id} category={item.name} subcategory={item.children_data} />
                  </TriggerScroll>
                )
              }
            })}
        </div> */}
        {/* Blog List */}
        <div className='h-[1px] w-full bg-oby-DFDFDF' />
        <DynamicBlogList />
      </HomeLayout>
    </>
  )
}
