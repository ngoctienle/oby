import { useQuery } from '@tanstack/react-query'
import { ChevronRightIcon } from 'lucide-react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import { Autoplay, EffectFade, Lazy, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useMediaQuery } from '@/hooks'

import { createSlug } from '@/helpers'

import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'
import { hrefPath } from '@/constants/href.constant'

import { OBYImage, OBYLink } from '@/components/UI/Element'

const DynamicProduct = dynamic(() => import('@/components/Product'), { ssr: false })

interface IDetailProps {
  slug: string
  id: string
  category: string
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const DetailDiscountPage: React.FC<IDetailProps> = ({ id, category }) => {
  const isMatch = useMediaQuery('(min-width:992px)')

  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.GetProductByCategoryID(Number(id), '1', '8'),
    staleTime: cacheTime.halfHours,
    keepPreviousData: true
  })

  const productData = data?.data

  if (!productData || (productData && productData.total_count === 0)) {
    return null
  }

  const renderBanner = () => {
    return isMatch ? (
      <OBYLink href={`${hrefPath.catePage}/${createSlug(category)}-${id}`}>
        <Swiper
          effect={'fade'}
          lazy={{
            loadPrevNext: true
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          modules={[EffectFade, Navigation, Pagination, Lazy, Autoplay]}
          className='obyBanner relative'
        >
          <SwiperSlide className='relative'>
            <div className='relative w-full aspect-[1920/900]'>
              <Image
                priority
                fill
                alt='Ông Bà Yêu Banner'
                src={`/images/discount-banner-${id}.png`}
                className='abosolute'
                style={{ objectPosition: 'center', objectFit: 'cover' }}
                loader={({ src }) => src}
                unoptimized
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </OBYLink>
    ) : (
      <div className='container mt-4'>
        <OBYLink href={`${hrefPath.catePage}/${createSlug(category)}-${id}`}>
          <Swiper
            effect={'fade'}
            navigation={true}
            lazy={{
              loadPrevNext: true
            }}
            pagination={{
              clickable: true
            }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false
            }}
            modules={[EffectFade, Navigation, Pagination, Lazy, Autoplay]}
            className='obyBanner relative'
          >
            <SwiperSlide className='relative'>
              <div className='relative w-full aspect-[1920/900] min-h-[170px] rounded-2.5 overflow-hidden'>
                <Image
                  priority
                  fill
                  alt='Ông Bà Yêu Banner'
                  src={`/images/discount-banner-${id}.png`}
                  className='absolute'
                  style={{ objectPosition: 'center', objectFit: 'cover' }}
                  loader={({ src }) => src}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </OBYLink>
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className='flex @992:flex-row flex-col items-center gap-10 @992:pt-20 pt-10'>
        <div className='space-y-6 max-w-[620px]'>
          {Number(id) === 19 ? (
            <>
              <h2 className='@992:text-[30px] fs-24 font-bold'>
                Thực Phẩm Chức Năng - Giải pháp tối ưu cho sức khỏe và cuộc sống của bạn.
              </h2>
              <p>
                Thực phẩm chức năng là sản phẩm được nghiên cứu và phát triển nhằm bổ sung dinh dưỡng, tăng cường sức
                khỏe, hỗ trợ chức năng cơ thể và phòng ngừa bệnh tật. Chúng bao gồm các thành phần như vitamin, khoáng
                chất, dược liệu thiên nhiên, probiotic và các chất hữu ích khác.
              </p>
              <p>
                Sử dụng thực phẩm chức năng hợp lý, kết hợp với chế độ ăn uống cân bằng và lối sống lành mạnh, giúp cải
                thiện chất lượng cuộc sống, tăng cường miễn dịch, giúp cơ thể khỏe mạnh và duy trì sức khỏe lâu dài cho
                mọi lứa tuổi.
              </p>
            </>
          ) : (
            <>
              <h2 className='@992:text-[30px] fs-24 font-bold'>
                Nhân Sâm - Bí kíp bồi bổ sức khỏe và nâng cao chất lượng cuộc sống.
              </h2>
              <p>
                Bạn thường xuyên mất tập trung, mệt mỏi hoặc căng thẳng? Bạn muốn tăng cường sức khỏe toàn diện, nâng
                cao sức đề kháng?
              </p>
              <p>
                Các sản phẩm từ nhân sâm tự nhiên không chỉ giúp tăng cường sức khỏe toàn diện và nâng cao sức đề kháng,
                mà còn giúp tăng cường sự tập trung, giảm mệt mỏi và căng thẳng. Ngoài ra còn cải thiện trí nhớ và giúp
                ngủ ngon hơn.
              </p>
              <p>
                Chúng tôi cung cấp đa dạng sản phẩm như nước hồng sâm, cao hồng sâm, kẹo hồng sâm, trà hồng sâm, sâm tẩm
                mật ong và viên hồng sâm.
              </p>
            </>
          )}
        </div>
        <div className='relative w-full aspect-[540/365]'>
          <OBYImage
            src={`/images/discount-image-${id}.png`}
            alt='Thực Phẩm Chức Năng - Giải pháp tối ưu cho sức khỏe và cuộc sống của bạn.'
            display='responsive'
            className='absolute object-contain'
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {renderBanner()}
      <div className='container'>
        {renderContent()}
        <div className='@992:pt-20 pt-10'>
          <h2 className='@992:text-[32px] fs-24 font-semibold mb-4 text-center'>SẢN PHẨM BÁN CHẠY</h2>
          {Number(id) === 19 ? (
            <p className='text-center max-w-[772px] mx-auto'>
              Bổ sung dinh dưỡng, tăng cường sức khỏe, hỗ trợ chức năng cơ thể, phòng ngừa bệnh tật, kết hợp vitamin,
              khoáng chất.
            </p>
          ) : (
            <p className='text-center max-w-[772px] mx-auto'>
              Tinh chất nhân sâm cao cấp đạt tiêu chuẩn, giúp bồi bổ sức khỏe, tăng năng lượng, hỗ trợ chống lão hóa và
              tốt cho tim mạch.
            </p>
          )}
        </div>
        {/* Product List Related with Category */}
        <div className='@992:mt-5 mt-4 grid @992:grid-cols-4 @768:grid-cols-3 grid-cols-2 @992:gap-10 gap-5'>
          {isMatch
            ? productData.items.map((item) => (
                <div className='col-span-1' key={item.id}>
                  <DynamicProduct data={item} />
                </div>
              ))
            : productData.items.slice(0, 6).map((item) => (
                <div className='col-span-1' key={item.id}>
                  <DynamicProduct data={item} />
                </div>
              ))}
        </div>
        {productData.items.length === 8 && (
          <div className='flex items-center justify-center mt-10 gap-1.5'>
            <OBYLink
              href={`${hrefPath.catePage}/${createSlug(category)}-${id}`}
              title='Xem tất cả sản phẩm'
              className='text-oby-primary @992:fs-18 fs-16'
            >
              Xem tất cả
            </OBYLink>
            <ChevronRightIcon className='@992:w-6 @992:h-6 w-5 h-5 text-oby-primary' />
          </div>
        )}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IDetailProps> = async (context) => {
  const { slug } = context.params as IParams

  if (
    slug === 'giam-gia-15-cho-tat-ca-cac-san-pham-tu-nhan-sam' ||
    slug === 'giam-gia-10-cho-tat-ca-cac-san-pham-thuc-pham-chuc-nang'
  ) {
    return {
      props: {
        slug,
        id: slug === 'giam-gia-15-cho-tat-ca-cac-san-pham-tu-nhan-sam' ? '21' : '19',
        category: slug === 'giam-gia-15-cho-tat-ca-cac-san-pham-tu-nhan-sam' ? 'Nhân sâm' : 'Thực phẩm chức năng'
      }
    }
  }
  return {
    notFound: true
  }
}

export default DetailDiscountPage
