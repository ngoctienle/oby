import { generateMetaSEO } from '@/libs/seo'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYImage } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function StepVNPage() {
  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Hướng Dẫn Thanh Toán',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/huong-dan-thanh-toan'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Hướng dẫn thanh toán' />
        <div className='container'>
          <div className='@992:pt-10 pt-5'>
            <h2 className='font-bold text-oby-green @992:fs-26 fs-20 mb-5 text-center'>Hướng dẫn thanh toán</h2>
            <div className='@992:fs-16 fs-14 space-y-3'>
              <p>
                Cổng thanh toán VNPAY là giải pháp thanh toán do Công ty Cổ phần Giải pháp Thanh toán Việt Nam (VNPAY)
                phát triển. Khách hàng sử dụng thẻ/tài khoản ngân hàng, tính năng QR Pay/VNPAY-QR được tích hợp sẵn trên
                ứng dụng Mobile Banking của các ngân hàng hoặc Ví điện tử liên kết để thanh toán các giao dịch và nhập
                mã giảm giá (nếu có)
              </p>
              <h3 className='font-semibold text-center'>
                Quét mã VNPAY-QR trên 35+ Ứng dụng Mobile Banking và 15+ Ví điện tử liên kết
              </h3>
              <div className='relative max-w-[700px] aspect-video mx-auto'>
                <OBYImage src='/images/vnpay-1.png' alt='' display='responsive' />
              </div>
              <h3 className='font-semibold text-center'>40+ Thẻ ATM/nội địa/tài khoản ngân hàng</h3>
              <div className='relative max-w-[700px] aspect-video mx-auto'>
                <OBYImage src='/images/vnpay-2.png' alt='' display='responsive' />
              </div>
              <h3 className='font-semibold text-center'>4 Thẻ thanh toán quốc tế</h3>
              <div className='relative max-w-[300px] h-10 mx-auto'>
                <OBYImage src='/images/vnpay-3.png' alt='' display='responsive' />
              </div>
              <h3 className='font-semibold text-center'>Các phương thức thanh toán qua VNPAY</h3>
              <div className='relative max-w-[505px] h-[394px] mx-auto'>
                <OBYImage src='/images/vnpay-4.png' alt='' display='responsive' />
              </div>
              <h3 className='font-semibold'>1. Phương thức thanh toán qua “Ứng dụng thanh toán hỗ trợ VNPAY-QR</h3>
              <ul className='pl-5 space-y-2'>
                <li>
                  <span className='font-medium'>Bước 1:</span> Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán
                  ngay hoặc Đặt hàng Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, điền đầy đủ thông tin
                  người nhận hàng, chọn phương thức thanh toán VNPAY và nhấn nút “Đặt hàng ngay”.
                </li>
                <li>
                  <span className='font-medium'>Bước 2:</span> Màn hình thanh toán chuyển sang giao diện cổng thanh toán
                  VNPAY. Chọn phương thức “Ứng dụng thanh toán hỗ trợ VNPAY-QR”.
                </li>
                <li>
                  <span className='font-medium'>Bước 3:</span> Hệ thống hiển thị mã QR cùng với số tiền cần thanh toán,
                  Quý khách kiểm tra lại số tiền này. Sử dụng ứng dụng ngân hàng (theo danh sách liệt kê), chọn “Quét
                  Mã” và tiến hành quét mã QR trên màn hình thanh toán website. <br />
                  <i>
                    *Lưu ý: Mã QR có hiệu lực trong 15 phút Để quá trình thanh toán thành công, khách hàng vui lòng tham
                    khảo trước các điều kiện và thao tác quét mã trên điện thoại để sẵn sàng, tránh sự cố hết thời gian
                    ảnh hưởng đến thanh toán và mã khuyến mại của quý khách.
                  </i>
                </li>
                <li>
                  <span className='font-medium'>Bước 4:</span> Kiểm tra thông tin, nhập mã giảm giá (nếu có) và hoàn tất
                  thanh toán. Khi thực hiện thanh toán hoàn tất Quý khách sẽ nhận được thông báo xác nhận đơn hàng đặt
                  hàng thành công tại website
                  <p className='relative max-w-[649px] h-[303px] mx-auto'>
                    <OBYImage src='/images/vnpay-5.png' alt='' display='responsive' />
                  </p>
                  <p className='text-center'>
                    <i>Hướng dẫn thanh toán qua tính năng QR Pay/VNPAY-QR</i>
                  </p>
                </li>
              </ul>
              <h3 className='font-semibold'>2. Phương thức thanh toán qua “Thẻ nội địa và tài khoản ngân hàng”</h3>
              <ul className='pl-5 space-y-2'>
                <li>
                  <span className='font-medium'>Bước 1:</span> Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán
                  ngay hoặc Đặt hàng Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, điền đầy đủ thông tin
                  người nhận hàng, chọn phương thức thanh toán VNPAY và nhấn nút “Đặt hàng ngay”. <br />
                </li>
                <li>
                  <span className='font-medium'>Bước 2:</span> Màn hình thanh toán chuyển sang giao diện cổng thanh toán
                  VNPAY. Chọn phương thức “Thẻ nội địa và tài khoản ngân hàng” và chọn ngân hàng muốn thanh toán thẻ
                  trong danh sách
                </li>
                <li>
                  <span className='font-medium'>Bước 3:</span> Quý khách vui lòng thực hiện nhập các thông tin thẻ/tài
                  khoản theo yêu cầu và chọn “Tiếp tục”. Mã OTP sẽ được gửi về điện thoại đăng ký, nhập mã OTP để hoàn
                  tất giao dịch
                  <br />
                  <i>*Lưu ý: Giao dịch sẽ hết hạn sau 15 phút</i>
                </li>
                <li>
                  <span className='font-medium'>Bước 4:</span> Khi thực hiện thanh toán hoàn tất Quý khách sẽ nhận được
                  thông báo xác nhận đơn hàng đặt hàng thành công tại website
                  <p className='relative max-w-[613px] h-[209px] mx-auto'>
                    <OBYImage src='/images/vnpay-6.png' alt='' display='responsive' />
                  </p>
                  <p className='text-center'>
                    <i>Giao diện thanh toán qua “Thẻ nội địa và tài khoản ngân hàng”</i>
                  </p>
                </li>
              </ul>
              <h3 className='font-semibold'>
                3. Phương thức thanh toán qua “Thẻ thanh toán quốc tế (Visa, MasterCard, JCB, UnionPay)”
              </h3>
              <p>Tương tự như phương thức thanh toán “Thẻ nội địa và tài khoản ngân hàng”</p>
              <h3 className='font-semibold'>4. Phương thức thanh toán qua “Ví điện tử VNPAY”</h3>
              <p>Tương tự như phương thức thanh toán “Ứng dụng thanh toán hỗ trợ VNPAY-QR”</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
