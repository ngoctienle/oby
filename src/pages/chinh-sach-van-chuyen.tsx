import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import { customClasses } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function DeliverPage() {
  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Chính Sách Vận Chuyển',
    description:
      'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, AGRIAMAZING, ongbayeu.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/chinh-sach-van-chuyen'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Chính sách vận chuyển' />
        <div className='container'>
          <div className='grid grid-cols-12 @992:gap-10 gap-6'>
            <div className='@992:col-span-3 @992:order-1 order-2 col-span-12'>
              <div className='@768:py-3 py-2.5 rounded-tl-4 rounded-br-4 bg-white max-h-fit bsd'>
                <OBYLink href='/ve-chung-toi' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Về chúng tôi</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink
                  href='/chinh-sach-van-chuyen'
                  className={`${customClasses.COMMON_GRADIENT} flex items-center justify-between py-3 px-4.5`}
                >
                  <p className='@768:fs-16 fs-14 text-white font-semibold'>Chính sách vận chuyển</p>
                  <ChevronRightIcon className='w-6 h-6 text-white' />
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
            <div className='@992:col-span-9 @992:order-2 order-1 col-span-12 space-y-5'>
              <h2 className='font-bold text-oby-green @992:fs-26 fs-20'>Chính sách vận chuyển</h2>
              <h3 className='@992:fs-20 font-semibold'>1. Phí giao hàng và Phạm vi giao hàng:</h3>
              <ul className='list-disc pl-5 spacy-y-2'>
                <li>Chúng tôi hỗ trợ phí vận chuyển cho tất cả các các đơn hàng trong và ngoài TP HCM.</li>
                <li>
                  Hiện nay, chúng tôi chỉ có thể chuyển hàng đến các địa chỉ trong đất nước Việt Nam, Chúng tôi không
                  chuyển hàng đến hộp thư công cộng, các địa chỉ quốc tế và một số huyện, đảo mà bưu điện Việt Nam không
                  chấp nhận vận chuyển.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>2. Thay đổi địa chỉ nhận hàng:</h3>
              <p className='@992:fs-16 fs-14'>
                Trong trường hợp khách hàng muốn thay đổi địa chỉ nhận sản phẩm thì khách hàng phải gọi điện thông báo
                lại cho Trung tâm CSKH: Họ tên, số điện thoại liên lạc và địa chỉ nhận sản phẩm của người được khách
                hàng chỉ định nhận sản phẩm trước tối thiểu 8h so với thời điểm chúng tôi xác nhận tiến hành chuyển đơn
                hàng
              </p>
              <h3 className='@992:fs-20 font-semibold'>3. Các phương thức giao hàng:</h3>
              <ul className='list-disc pl-5 spacy-y-2'>
                <li>Giao hàng trực tiếp tới khách hàng tại Thành phố Hồ Chí Minh</li>
                <li>Giao hàng bằng đường bưu điện đối với khách hàng tại các tỉnh và thành phố khác.</li>
                <li>Giao hàng thông qua các Đơn vị vận chuyển như Giao hàng nhanh, Giao hàng tiết kiệm.</li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>
                4. Thời hạn ước tính cho việc giao sản phẩm/dịch vụ (kể cả khi có giới hạn về mặt địa lý):
              </h3>
              <ul className='list-disc pl-5 spacy-y-2'>
                <li>
                  Sản phẩm sẽ được giao đến địa chỉ khách hàng yêu cầu trong đơn đặt hàng vào thời gian khách hàng yêu
                  cầu với điều kiện thời gian giao hàng này phải phù hợp với chính sách giao hàng của ongbayeu.com và
                  các điều kiện khách quan về thời tiết, địa lý, giao thông…
                </li>
                <li>
                  Thời gian vận chuyển tối đa là 3 giờ áp dụng với khu vực thành phố Hồ Chí Minh, Hà Nội và Hải Phòng;
                  1-2 ngày dụng với các tỉnh và thành phố khác.
                </li>
                <li>
                  Thời gian được tính từ lúc chúng tôi hoàn tất việc xác nhận đơn hàng với khách hàng đến khi nhận được
                  hàng, không kể ngày lễ hay thứ 7 và chủ nhật.
                </li>
                <li>
                  Trong trường hợp sản phẩm/dịch vụ được giao chậm trễ, khách hàng có thể hủy bỏ giao dịch đặt hàng.
                  Trong trường hợp này, ongbayeu.com là bên chịu trách nhiệm cho sự chậm trễ đó.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
