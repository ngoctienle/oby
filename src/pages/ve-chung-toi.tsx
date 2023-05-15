import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import { appInformationConfig } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function AboutUsPage() {
  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Về Chúng Tôi',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/ve-chung-toi'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Về chúng tôi' />
        <div className='container'>
          <div className='grid grid-cols-12 @992:gap-10 gap-6'>
            <div className='@992:col-span-3 @992:order-1 order-2 col-span-12'>
              <div className='@768:py-3 py-2.5 rounded-tl-4 rounded-br-4 bg-white max-h-fit bsd'>
                <OBYLink href='/ve-chung-toi' className='bg-oby-primary flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-white font-semibold'>Về chúng tôi</p>
                  <ChevronRightIcon className='w-6 h-6 text-white' />
                </OBYLink>
                <OBYLink href='/chinh-sach-van-chuyen' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Chính sách vận chuyển</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/thong-tin-thanh-toan' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Thông tin thanh toán</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/doi-tra-va-hoan-tien' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Đổi trả và hoàn tiền</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/dieu-khoan-va-dieu-kien' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Điều khoản và điều kiện</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/chinh-sach-bao-mat' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Chính sách bảo mật</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
              </div>
            </div>
            <div className='@992:col-span-9 @992:order-2 order-1 col-span-12'>
              <h2 className='font-bold text-oby-green @992:fs-26 fs-20 mb-5'>Về chúng tôi</h2>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Giới thiệu</h3>
              <p className='@992:fs-16 fs-14'>
                Chúng tôi rất tự hào khi giới thiệu đến quý vị, chúng tôi là công ty TNHH Ông Bà Yêu - một công ty tiên
                phong tại Việt Nam chuyên về các ngành hàng dành riêng cho người cao tuổi.
              </p>
              <div className='mt-6 mb-8 grid grid-cols-12 @768:gap-4 gap-2.5'>
                <div className='col-span-5'>
                  <div className='relative @768:h-[418px] h-[161px] w-full rounded-tl-4 rounded-br-4 overflow-hidden'>
                    <OBYImage
                      src='/images/about-1.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-7'>
                  <div className='flex flex-col @768:gap-4 gap-2.5'>
                    <div className='relative w-full @768:h-[201px] h-[76px] rounded-tl-4 rounded-br-4 overflow-hidden'>
                      <OBYImage
                        src='/images/about-2.png'
                        alt='Về chúng tôi'
                        display='responsive'
                        className='object-cover'
                      />
                    </div>
                    <div className='relative w-full @768:h-[201px] h-[76px] rounded-tl-4 rounded-br-4 overflow-hidden'>
                      <OBYImage
                        src='/images/about-3.png'
                        alt='Về chúng tôi'
                        display='responsive'
                        className='object-cover'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Công nghệ</h3>
              <p className='@992:fs-16 fs-14'>
                Ông Bà Yêu hiểu rằng thời gian của quý vị rất quý giá, vì vậy chúng tôi đã tạo ra trang web thương mại
                điện tử và dịch vụ giao hàng tận nhà để giúp quý vị tiết kiệm thời gian và nâng cao trải nghiệm mua sắm
                của mình. Chúng tôi có trang web thương mại điện tử sử dụng công nghệ mới nhất để cung cấp cho quý vị
                trải nghiệm mua sắm và dịch vụ tốt nhất có thể như các sản phẩm chăm sóc sức khỏe, đồ dùng gia đình và
                các dịch vụ hữu ích cho người cao tuổi.
              </p>
              <div className='mt-6 mb-8 grid grid-cols-12 gap-4'>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] rounded-tl-4 rounded-br-4 overflow-hidden'>
                    <OBYImage
                      src='/images/about-4.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] mt-6 rounded-tl-4 rounded-br-4 overflow-hidden'>
                    <OBYImage
                      src='/images/about-5.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] rounded-tl-4 rounded-br-4 overflow-hidden'>
                    <OBYImage
                      src='/images/about-6.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] mt-6 rounded-tl-4 rounded-br-4 overflow-hidden'>
                    <OBYImage
                      src='/images/about-7.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
              </div>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Tầm nhìn, sứ mệnh và sự cam kết</h3>
              <p className='@992:fs-16 fs-14'>
                Với tầm nhìn rộng lớn, Ông Bà Yêu định hướng trở thành một trong những thương hiệu hàng đầu trong lĩnh
                vực chăm sóc sức khỏe và đời sống cho người cao tuổi tại Việt Nam. Chúng tôi cam kết đặt khách hàng lên
                hàng đầu và luôn mang lại cho khách hàng những sản phẩm và dịch vụ tốt nhất. Sứ mệnh của chúng tôi là
                giúp đỡ và hỗ trợ người cao tuổi có cuộc sống khỏe mạnh, hạnh phúc và đầy ý nghĩa.
              </p>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>Các sản phẩm và dịch vụ</h3>
              <p className='@992:fs-16 fs-14'>
                Công ty Ông Bà Yêu cung cấp các dòng sản phẩm đa dạng như thực phẩm chức năng, vitamin và khoáng chất,
                đồ dùng gia đình, thiết bị y tế, sản phẩm chăm sóc cá nhân và nhiều hơn nữa. Tất cả các sản phẩm được
                chọn lọc kỹ lưỡng và có chứng nhận chất lượng để đảm bảo an toàn và hiệu quả cho khách hàng.
              </p>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>Đối tác</h3>
              <p className='@992:fs-16 fs-14 mb-2.5'>
                Công ty Ông Bà Yêu hợp tác với các đối tác uy tín trong lĩnh vực y tế và chăm sóc sức khỏe để cung cấp
                những sản phẩm và dịch vụ tốt nhất cho khách hàng của chúng tôi. Chúng tôi có lợi thế trong việc hợp tác
                với nhiều tập đoàn đa quốc gia, cũng như việc phân phối độc quyền cho nhiều nhãn hàng Úc, Newzialnd, Mỹ,
                Nhật, Hàn Quốc. Bên cạnh đó, Ông Bà Yêu còn hợp tác với nhiều nhà máy hàng đầu tại Nhật, Úc để nghiên
                cứu và cho ra đời những sản phẩm tốt nhất dành cho người cao tuổi Việt Nam.
              </p>
              <p className='@992:fs-16 fs-14 mb-2.5'>
                Với tất cả những giá trị và lợi ích mà chúng tôi mang lại, chúng tôi tin rằng công ty TNHH Ông Bà Yêu sẽ
                trở thành địa chỉ tin cậy và lựa chọn hàng đầu cho khách hàng trong lĩnh vực chăm sóc sức khỏe và đời
                sống cho người cao tuổi tại Việt Nam.
              </p>
              <p className='@992:fs-16 fs-14'>
                Ông Bà Yêu hy vọng rằng quý vị sẽ cảm thấy hài lòng với các sản phẩm và dịch vụ của chúng tôi. Hãy đến
                với chúng tôi và trải nghiệm sự tiện lợi, chất lượng và sự chăm sóc tận tình của chúng tôi. Công ty Ông
                Bà Yêu cam kết sẽ luôn đồng hành cùng quý vị trong việc chăm sóc sức khỏe và đời sống của mình.
              </p>
              <div className='mt-6 relative @768:w-[686px] w-full @768:h-[360px] h-[180px] mx-auto rounded-tl-4 rounded-br-4 overflow-hidden'>
                <OBYImage src='/images/about-8.png' alt='Về chúng tôi' display='responsive' className='object-cover' />
              </div>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>Liên hệ</h3>
              <p className='@992:fs-16 fs-14 font-semibold mb-2.5'>CÔNG TY TNHH ÔNG BÀ YÊU</p>
              <p className='@992:fs-16 fs-14 mb-2.5'>
                Email:{' '}
                <OBYLink
                  href={`mailto:ongbayeu.corp@gmail.com`}
                  title='Ông Bà Yêu - Email'
                  className='text-oby-primary'
                >
                  ongbayeu.corp@gmail.com
                </OBYLink>
              </p>
              <p className='@992:fs-16 fs-14 mb-2.5'>
                Điện thoại:{' '}
                <OBYLink href={`tel:0789.279.669`} title='Ông Bà Yêu - Phone' className='text-oby-primary'>
                  0789 27 9669
                </OBYLink>
              </p>
              <p className='@992:fs-16 fs-14'>
                ĐKKD:{' '}
                <OBYLink
                  href={`https://www.google.com/maps/search/?api=1&query=${appInformationConfig.APP_ADDRESS_MAP}`}
                  title='Ông Bà Yêu - Phone'
                  className='text-oby-primary'
                >
                  68/7B Trần Quang Khải, P.Tân Định, Q.1, HCM
                </OBYLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
