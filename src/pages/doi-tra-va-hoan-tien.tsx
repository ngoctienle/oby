import { ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function RefundPage() {
  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Đổi trả và Hoàn tiền',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/doi-tra-va-hoan-tien'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Đổi trả và hoàn tiền' />
        <div className='container'>
          <div className='grid grid-cols-12 @992:gap-10 gap-6'>
            <div className='@992:col-span-3 @992:order-1 order-2 col-span-12'>
              <div className='@768:py-3 py-2.5 rounded-tl-4 rounded-br-4 bg-white max-h-fit bsd'>
                <OBYLink href='/ve-chung-toi' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Về chúng tôi</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/chinh-sach-van-chuyen' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Chính sách vận chuyển</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink href='/thong-tin-thanh-toan' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Thông tin thanh toán</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink
                  href='/doi-tra-va-hoan-tien'
                  className='bg-oby-primary flex items-center justify-between py-3 px-4.5'
                >
                  <p className='@768:fs-16 fs-14 text-white font-semibold'>Đổi trả và hoàn tiền</p>
                  <ChevronRightIcon className='w-6 h-6 text-white' />
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
              <h2 className='font-bold text-oby-green @992:fs-26 fs-20 mb-5'>Chính sách đổi trả hàng</h2>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>1. Điều khoản và điều kiện trả hàng</h3>
              <ul className='list-disc pl-6 @992:fs-16 fs-14 space-y-2.5'>
                <li>Thời hạn đổi các mặt hàng đã mua tại Ông Bà Yêu là 15 ngày kể từ ngày xuất hàng.</li>
                <li>
                  Hàng được đổi phải đảm bảo còn mới 100% chưa được sử dụng, còn nguyên nhãn mác, nguyên hộp, phụ kiện,
                  phiếu bảo hành và quà tặng kèm theo (nếu có). Ông Bà Yêu không đổi hàng đã sử dụng hoặc đã kích hoạt
                  bảo hành.
                </li>
                <li>Tổng giá trị các mặt hàng muốn đổi phải có giá trị tương đương với mặt hàng trả lại.</li>
                <li>
                  Nếu sản phẩm có lỗi, quý khách cần thông báo cho Ông Bà Yêu trong vòng 15 ngày kể từ ngày xuất bán.
                </li>
                <li>
                  Ông Bà Yêu cam kết sẽ nhanh chóng thay thế sản phẩm ngay tức thì cho khách hàng. Nếu như sản phẩm đó
                  không còn hàng Ông Bà Yêu sẽ hoàn lại tiền mà không có đòi hỏi nào trong trường hợp này.
                </li>
              </ul>
              <p className='@992:fs-16 fs-14 my-2.5'>
                Phí chuyển phát sẽ được hoàn trả trong trường hợp hàng hóa bán ra không đúng, lỗi hoặc hỏng hóc.
              </p>
              <p className='@992:fs-16 fs-14'>
                Vui lòng chắc chắn rằng sản phẩm Khách hàng yêu cầu đổi/trả thỏa mãn điều kiện đổi trả sản phẩm như trên
                của{' '}
                <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary'>
                  ongbayeu.com
                </OBYLink>
              </p>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>2. Quy trình đổi/trả sản phẩm</h3>
              <ul className='@992:fs-16 fs-14 space-y-2.5'>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 1:</span> Khách hàng liên hệ cửa hàng hoặc SĐT:{' '}
                  <OBYLink href={`tel:0789.279.669`} title='Ông Bà Yêu - Số điện thoại' className='text-oby-primary'>
                    0789.279.669
                  </OBYLink>{' '}
                  hoặc email:{' '}
                  <OBYLink href={`mailto:cskh@ongbayeu.com`} title='Ông Bà Yêu - Email' className='text-oby-primary'>
                    cskh@ongbayeu.com
                  </OBYLink>{' '}
                  để yêu cầu việc đổi/trả sản phẩm, Ông Bà Yêu sẽ hướng dẫn bạn cách đổi/trả sản phẩm. Nếu quá trình
                  đổi/trả sản phẩm của khách hợp lệ.
                </li>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 2:</span> Khách hàng gửi sản phẩm hàng hóa cho Ông
                  Bà Yêu tiếp nhận theo chỉ dẫn phía trên có thể tại cửa hàng hoặc chuyển theo đường bưu điện đối với
                  sản phẩm mua online.
                </li>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 3:</span> Ông Bà Yêu nhận sản phẩm và kiểm tra sản
                  phẩm.
                </li>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 4:</span> Ông Bà Yêu chuyển sản phẩm đến Nhà Cung
                  Cấp để tiến hàng đổi/trả.
                </li>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 5:</span> Khách hàng nhận sản phẩm thay thế hoặc
                  nhận tiền hoàn lại.
                </li>
              </ul>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>3. Các bước thực hiện đổi/trả sản phẩm</h3>
              <ul className='@992:fs-16 fs-14 space-y-2.5'>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 1:</span> Đăng ký. Liên hệ với Ông Bà Yêu qua{' '}
                  <OBYLink href={`tel:0789.279.669`} title='Ông Bà Yêu - Số điện thoại' className='text-oby-primary'>
                    0789.279.669
                  </OBYLink>{' '}
                  hoặc gửi mail{' '}
                  <OBYLink href={`mailto:cskh@ongbayeu.com`} title='Ông Bà Yêu - Email' className='text-oby-primary'>
                    cskh@ongbayeu.com
                  </OBYLink>{' '}
                  và cung cấp thông tin chi tiết về sản phẩm lỗi gồm:
                  <ul className='@992:fs-16 fs-14 space-y-1.5 pl-6 list-disc my-2.5'>
                    <li>Mã số đơn hàng</li>
                    <li>Tên sản phẩm</li>
                    <li>Lỗi sản phẩm (mô tả chi tiết và kèm ảnh chụp nếu có)</li>
                    <li>Nhu cầu cần hỗ trợ: đổi/trả.</li>
                  </ul>
                </li>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 2:</span> Nhận hướng dẫn việc đăng ký đổi/trả sản
                  phẩm hoặc email hướng dẫn.
                </li>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 3:</span> Đóng gói và mang sản phẩm đến Bưu Điện.
                </li>
                <li>
                  <span className='font-semibold text-oby-green'>Bước 4:</span> Gửi sản phẩm về Ông Bà Yêu . Quý khách
                  vui lòng gửi sản phẩm qua đường Bưu Điện về Ông Bà Yêu trong vòng 03 (ba) ngày làm việc kể từ khi
                  thông báo với bộ phận chăm sóc khách hàng và gửi kèm:
                  <ul className='@992:fs-16 fs-14 space-y-1.5 pl-6 list-disc mt-2.5'>
                    <li>Hóa đơn bán hàng hoặc đính kèm giấy ghi chú có mã đơn hàng</li>
                    <li>Hóa đơn giá trị gia tăng (nếu có)</li>
                    <li>Phụ kiện đi kèm sản phẩm và tặng khuyến mãi kèm theo (nếu có).</li>
                  </ul>
                </li>
              </ul>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>
                4. Một số lưu ý khi gửi sản phẩm đến bưu điện
              </h3>
              <ul className='list-disc pl-6 @992:fs-16 fs-14 space-y-2.5 mb-2.5'>
                <li>
                  Đóng gói, chèn lót sản phẩm như ban đầu, nhưng không niêm phong bề mặt thùng trước khi hoàn tất quá
                  trình gửi hàng vì có thể bưu điện cần kiểm tra trước khi nhận hàng từ khách hàng.
                </li>
                <li>
                  Lưu ý không dán băng keo trực tiếp lên hộp sản phẩm vì yêu cầu đổi/trả có thể sẽ bị từ chối nếu hộp
                  sản phẩm bị hư hỏng.
                </li>
                <li>
                  Liên hệ Ông Bà Yêu:{' '}
                  <OBYLink href={`tel:0789.279.669`} title='Ông Bà Yêu - Số điện thoại' className='text-oby-primary'>
                    0789.279.669
                  </OBYLink>{' '}
                  (8h - 23h) khi có bất cứ khó khăn xảy ra trong quá trình chuyển sản phẩm. Gửi hàng về Ông Bà Yêu theo
                  địa chỉ nhân viên chăm sóc khách hàng đã cung cấp.
                </li>
              </ul>
              <p className='@992:fs-16 fs-14'>
                <span className='font-semibold'>Lưu ý:</span> Khách hàng vui lòng chỉ gửi sản phẩm qua đường bưu điện và
                chịu trách nhiệm về trạng thái nguyên vẹn của sản phẩm khi gửi về Ông Bà Yêu .Sau khi nhận được sản phẩm
                Khách hàng gửi về Ông Bà Yêu sẽ phản hồi và cập nhật thông tin trên từng giai đoạn xử lý đến Khách hàng
                qua số điện thoại hoặc email.
              </p>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>
                5. Một số lưu ý khi gửi sản phẩm đến bưu điện
              </h3>
              <h4 className='font-semibold @992:fs-16 fs-14 text-oby-green mb-2'>
                Tôi mua hàng rồi, không vừa ý có thể đổi lại hay không?
              </h4>
              <p className='@992:fs-16 fs-14'>
                <ArrowRightIcon className='w-5 h-5 inline-block mr-1.5' />
                Thời hạn đổi các mặt hàng bán tại Ông Bà Yêu là 15 ngày kể từ ngày xuất hàng. Hàng được đổi phải đảm bảo
                còn mới 100% chưa được sử dụng và còn nguyên nhãn mác. Ông Bà Yêu không cho phép các trường hợp đổi hàng
                đã sử dụng.
              </p>
              <h4 className='font-semibold @992:fs-16 fs-14 text-oby-green mb-2 mt-4'>
                Tôi đã đặt hàng, giờ muốn hủy đơn hàng phải làm sao?
              </h4>
              <p className='@992:fs-16 fs-14'>
                <ArrowRightIcon className='w-5 h-5 inline-block mr-1.5' />
                Quý khách vui lòng thông báo đến Ông Bà Yêu qua số{' '}
                <OBYLink href={`tel:0789.279.669`} title='Ông Bà Yêu - Số điện thoại' className='text-oby-primary'>
                  0789.279.669
                </OBYLink>
                , chúng tôi sẽ hủy đơn hàng cho quý khách. Hoặc quý khách đăng nhập vào website Ông Bà Yêu để tự hủy đơn
                hàng nếu đặt hàng từ website.
              </p>
              <h4 className='font-semibold @992:fs-16 fs-14 text-oby-green mb-2 mt-4'>
                Tôi có được trả hàng nếu tôi không hài lòng với sản phẩm tôi nhận được?
              </h4>
              <div className='flex gap-1.5'>
                <ArrowRightIcon className='w-5 h-5 flex-shrink-0' />
                <ul className='list-disc pl-6 @992:fs-16 fs-14 space-y-1.5'>
                  <li>
                    Nếu sản phẩm có lỗi kỹ thuật, quý khách cần thông báo cho Ông Bà Yêu được biết qua số{' '}
                    <OBYLink href={`tel:0789.279.669`} title='Ông Bà Yêu - Số điện thoại' className='text-oby-primary'>
                      0789.279.669
                    </OBYLink>
                    , email:{' '}
                    <OBYLink href={`mailto:cskh@ongbayeu.com`} title='Ông Bà Yêu - Email' className='text-oby-primary'>
                      cskh@ongbayeu.com
                    </OBYLink>{' '}
                    hoặc chat với nhân viên bán hàng trên website{' '}
                    <OBYLink href={`/`} title='Ông Bà Yêu - Email' className='text-oby-primary'>
                      https://ongbayeu.com
                    </OBYLink>{' '}
                    hoặc Fanpage Ông Bà Yêu trong vòng 15 ngày kể từ ngày xuất bán. Ông Bà Yêu cam kết hoàn lại tiền mà
                    không có đòi hỏi nào trong trường hợp này.
                  </li>
                  <li>
                    Hàng hóa phải được trả lại y nguyên như ban đầu khi chúng được nhận. Xin vui lòng liên hệ với phòng
                    dịch vụ khách hàng của chúng tôi trước khi trả lại hàng vì chúng tôi cần phải thu xếp để hoàn lại
                    tiền và thông báo phương thức hoàn trả sản phẩm.
                  </li>
                  <li>
                    Phí chuyển phát sẽ được hoàn trả trong trường hợp hàng hóa bán ra không đúng, lỗi kỹ thuật hoặc hỏng
                    hóc do quá trình vận chuyển.
                  </li>
                </ul>
              </div>
              <div className='mt-7.5 pt-7.5 border-t border-t-oby-primary'>
                <h2 className='font-bold text-oby-green @992:fs-26 fs-20 mb-5'>
                  Chính sách hoàn tiền cho mua hàng online
                </h2>
                <p className='@992:fs-16 fs-14 mb-2.5'>
                  Các đơn hàng được mua và thanh toán Online qua Thẻ nội địa (ATM), thẻ quốc tế (Visa/ Master/ JCB), Ví
                  điện tử (Zalopay, Momo) sẽ được hoàn lại toàn bộ hoặc 1 phần số tiền đã thanh toán trong các trường
                  hợp sau:
                </p>
                <ul className='list-disc pl-6 @992:fs-16 fs-14 space-y-2.5'>
                  <li>Sản phẩm bị lỗi hoặc hết hàng không thể giao cho khách. </li>
                  <li>
                    Một hoặc một vài sản phẩm trong đơn hàng không thể giao cho khách (hoàn tiền 1 phần tương đương giá
                    trị món hàng)
                  </li>
                </ul>
                <p className='@992:fs-16 fs-14 my-2.5'>Thời gian hoàn tiền:</p>
                <ul className='list-disc pl-6 @992:fs-16 fs-14 space-y-2.5'>
                  <li>
                    Thanh toán online qua ứng dụng ví điện tử ZaloPay bằng QR Code hoặc bằng thẻ ATM nội địa: hoàn trả
                    <span className='font-semibold'>5-7 ngày</span> làm việc.
                  </li>
                  <li>
                    Thanh toán online qua ứng dụng ví điện tử ZaloPay bằng thẻ Visa, Mastercard, JCB:{' '}
                    <span className='font-semibold'>9-12 ngày</span> làm việc.
                  </li>
                  <li>
                    Thanh toán online qua cổng ZaloPay bằng thẻ VISA, MasterCard, JCB: 9- 12 ngày làm việc. Thanh toán
                    online qua cổng ZaloPay bằng thẻ ATM nội địa: <span className='font-semibold'> 5-7 ngày</span> làm
                    việc.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
