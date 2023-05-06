import { ChevronRightIcon } from '@heroicons/react/24/outline'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYImage, OBYLink } from '@/components/UI/Element'

export default function AboutUsPage() {
  return (
    <>
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
                Ongbayeu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao
                tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.
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
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Lịch sử hình thành</h3>
              <p className='@992:fs-16 fs-14 mb-2.5'>
                Trong bối cảnh hiện nay, ta có thể thấy tỉ lệ già hóa dân số ngày càng cao, nhu cầu về sự thuận tiện
                trong việc chăm sóc, đi lại và các vấn đề kèm theo rất cần được giải quyết nhằm đem lại hiệu quả cao
                nhất, giúp người cao tuổi có cuộc sống trọn vẹn hơn. Vì vậy, chúng tôi đã xây dựng cửa hàng nhằm cung
                cấp tổng hợp các thực phẩm chức năng, quần áo, giày dép,... dành riêng cho người cao tuổi.
              </p>
              <p className='@992:fs-16 fs-14'>
                Ongbayeu là một doanh nghiệp được xây dựng từ những con người có tầm nhìn, cùng với những kỹ năng cần
                thiết để liên tục cập nhật và cải thiện sản phẩm nhằm phù hợp với xu hướng thị trường cùng với cải thiện
                trải nghiệm mua sắm trực tuyến một cách tối ưu nhất.
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
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Tầm nhìn và sứ mệnh</h3>
              <p className='@992:fs-16 fs-14'>
                Với mục tiêu phát triển tiên phong và bền vững, ngay từ khi mới thành lập, Ongbayeu đã xây dựng cho
                doanh nghiệp tầm nhìn, sứ mệnh từ chính câu khẩu hiệu của mình:
              </p>
              <p className='@992:fs-16 fs-14 text-oby-primary my-2.5 font-semibold'>
                &quot;CHẤT LƯỢNG - PHỤNG SỰ - CỘNG ĐỒNG&quot;
              </p>
              <p className='@992:fs-16 fs-14'>
                Tầm nhìn và sứ mệnh đó luôn là kim chỉ nam cho các hoạt động của Ongbayeu. Chúng tôi là những con người
                hội tụ đầy đủ hai yếu tố đó chính là &quot;Tâm&quot; và &quot;Tài&quot;, luôn kiên trì và không ngừng
                sáng tạo, cam kết mang lại cho khách hàng sự tin tưởng cao nhất và hài lòng về những sản phẩm mà chúng
                tôi cung cấp.
              </p>
              <div className='mt-6 relative @768:w-[686px] w-full @768:h-[360px] h-[180px] mx-auto rounded-tl-4 rounded-br-4 overflow-hidden'>
                <OBYImage src='/images/about-8.png' alt='Về chúng tôi' display='responsive' className='object-cover' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
