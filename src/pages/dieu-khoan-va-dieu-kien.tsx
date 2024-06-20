import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import { customClasses } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function ConditionPage() {
  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Điều Khoản và Điều Kiện',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/dieu-khoan-va-dieu-kien'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Điều khoản và điệu kiện' />
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
                <OBYLink href='/doi-tra-va-hoan-tien' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Đổi trả và hoàn tiền</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink
                  href='/dieu-khoan-va-dieu-kien'
                  className={`${customClasses.COMMON_GRADIENT} flex items-center justify-between py-3 px-4.5`}
                >
                  <p className='@768:fs-16 fs-14 text-white font-semibold'>Điều khoản và điều kiện</p>
                  <ChevronRightIcon className='w-6 h-6 text-white' />
                </OBYLink>
                <OBYLink href='/chinh-sach-bao-mat' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Chính sách bảo mật</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
              </div>
            </div>
            <div className='@992:col-span-9 @992:order-2 order-1 col-span-12 space-y-5'>
              <h2 className='font-bold text-oby-green @992:fs-26 fs-20'>Điều khoản và điều kiện</h2>
              <p className='@992:fs-16 fs-14'>Điều Kiện Về Giao Dịch Chung Tại Công ty TNHH Ông Bà Yêu</p>
              <p className='@992:fs-16 fs-14'>
                Chào mừng quý khách đến với hệ thống cửa hàng dành cho người trung niên và cao tuổi Ông Bà Yêu.
              </p>
              <p className='@992:fs-16 fs-14'>
                Công ty TNHH Ông Bà Yêu có trụ sở chính tại TP. Hồ Chí Minh và các chi nhánh trên toàn quốc. Website{' '}
                <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                là trang chính thức để khách hàng giao dịch, đặt hàng qua mạng hoặc tham khảo các sản phẩm có tại cửa
                hàng. Sau khi truy cập vào trang thông tin điện tử{' '}
                <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                để tham khảo hoặc mua sắm, quý khách đã đồng ý tuân thủ và ràng buộc với những quy định của Ông Bà Yêu.
                Vui lòng xem kỹ các quy định và hợp tác với Ông Bà Yêu để xây dựng một hệ thống cửa hàng ngày càng thân
                thiện và phục vụ tốt những yêu cầu của khách hàng trung niên và cao tuổi. Ngoài ra, nếu quý khách có bất
                cứ câu hỏi nào về những thỏa thuận trên đây, vui lòng liên hệ với Ông Bà Yêu qua địa chỉ email{' '}
                <OBYLink
                  href={`mailto:ongbayeu.corp@gmail.com`}
                  title='Ông Bà Yêu - Email'
                  className='text-oby-primary @992:fs-16 fs-14'
                >
                  ongbayeu.corp@gmail.com
                </OBYLink>
                . Quý khách vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của Ông Bà Yêu.
              </p>
              <h3 className='@992:fs-20 font-semibold'>
                1. Hướng dẫn sử dụng trang website{' '}
                <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>
              </h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Khi vào website của Ông Bà Yêu, người dùng tối thiểu phải 18 tuổi hoặc truy cập dưới sự giám sát của
                  cha mẹ hay người giám hộ hợp pháp.
                </li>
                <li>
                  Ông Bà Yêu cấp tài khoản sử dụng để quý khách có thể mua sắm trên website này trong khuôn khổ Điều
                  khoản và Điều kiện sử dụng đã đề ra.
                </li>
                <li>
                  Nghiêm cấm sử dụng bất kỳ phần nào của trang website này với mục đích thương mại hoặc nhân danh bất kỳ
                  đối tác thứ ba nào nếu không được Ông Bà Yêu cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong
                  đây, Ông Bà Yêu sẽ hủy tài khoản của quý khách mà không cần báo trước.
                </li>
                <li>
                  Quý khách phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ
                  thay đổi nào. Mỗi cá nhân truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình
                  trên website này. Hơn nữa, quý khách phải thông báo cho Ông Bà Yêu biết khi tài khoản bị truy cập trái
                  phép. Ông Bà Yêu không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với những thiệt
                  hại hoặc mất mát gây ra do quý khách không tuân thủ quy định.
                </li>
                <li>
                  Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  Sau đó, nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở
                  dưới cùng trong mọi email quảng cáo.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>2. Ý kiến khách hàng:</h3>
              <p className='@992:fs-16 fs-14'>
                Tất cả nội dung website này cũng như mọi ý kiến đóng góp, bình luận của quý khách đều là tài sản của Ông
                Bà Yêu. Nếu Ông Bà Yêu phát hiện bất kỳ thông tin nghi ngờ giả mạo nào, Ông Bà Yêu sẽ khóa tài khoản
                hoặc áp dụng các biện pháp khác theo quy định của pháp luật.
              </p>
              <h3 className='@992:fs-20 font-semibold'>3. Đặt hàng và thanh toán:</h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Khi quý khách chọn sản phẩm và đặt hàng trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  , quý khách phải cung cấp đầy đủ thông tin để Ông Bà Yêu có thể xử lý đơn hàng của quý khách.
                </li>
                <li>
                  Quý khách có thể chọn phương thức thanh toán trực tuyến hoặc thanh toán khi nhận hàng, tùy thuộc vào
                  các chính sách và quy định của Ông Bà Yêu tại thời điểm đó. Quý khách phải thanh toán đầy đủ giá trị
                  đơn hàng và phí vận chuyển (nếu có) theo phương thức thanh toán đã chọn.
                </li>
                <li>
                  Nếu quý khách sử dụng phương thức thanh toán trực tuyến, quý khách phải thanh toán qua các kênh thanh
                  toán được cung cấp trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  và phải tuân thủ các quy định về thanh toán của đối tác thanh toán của Ông Bà Yêu. Quý khách cần lưu ý
                  rằng, việc thanh toán trực tuyến sẽ được thực hiện trên các trang web của đối tác thanh toán, và quý
                  khách nên kiểm tra kỹ trước khi tiến hành thanh toán.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>4. Giao hàng và trả hàng</h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Thời gian giao hàng và các thông tin khác liên quan đến vận chuyển sẽ được cung cấp cho quý khách khi
                  quý khách đặt hàng trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  . Quý khách có trách nhiệm cung cấp địa chỉ và thông tin liên lạc chính xác để đảm bảo việc giao hàng
                  được thực hiện đúng thời gian và địa điểm đã hẹn.
                </li>
                <li>
                  Nếu quý khách không hài lòng với sản phẩm đã nhận được, quý khách có thể yêu cầu đổi hoặc trả hàng
                  theo quy định của Ông Bà Yêu. Quý khách nên kiểm tra kỹ sản phẩm trước khi ký nhận để đảm bảo rằng sản
                  phẩm đúng với mô tả trên website. Nếu sản phẩm bị hỏng hoặc không đúng với mô tả, quý khách có thể
                  liên hệ với Ông Bà Yêu để được hỗ trợ đổi hoặc trả hàng.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>5. Bảo vệ thông tin cá nhân</h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Ông Bà Yêu cam kết bảo vệ thông tin cá nhân của quý khách theo quy định của pháp luật và chính sách
                  bảo mật của công ty. Quý khách có thể tham khảo chi tiết chính sách bảo mật trên trang web{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                </li>
                <li>
                  Quý khách đồng ý rằng, thông tin cá nhân của quý khách có thể được sử dụng để liên hệ, cung cấp thông
                  tin sản phẩm và dịch vụ khách hàng phù hợp, hoặc để thực hiện các giao dịch trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  . Tuy nhiên, Ông Bà Yêu cam kết sẽ không tiết lộ thông tin cá nhân của quýkhách cho bất kỳ bên thứ ba
                  nào ngoại trừ trường hợp được quy định bởi pháp luật hoặc được quý khách đồng ý.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>6. Quyền sở hữu trí tuệ</h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Tất cả nội dung, bao gồm nhưng không giới hạn đến tên miền, logo, tài liệu, hình ảnh, video, âm thanh
                  và các mã nguồn trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  đều thuộc quyền sở hữu của Ông Bà Yêu hoặc các bên sở hữu trí tuệ khác đồng ý cho phép sử dụng.
                </li>
                <li>
                  Quý khách không có quyền sao chép, phát hành, phân phối hoặc sử dụng bất kỳ nội dung nào trên website
                  này mà không được sự cho phép bằng văn bản của chúng tôi hoặc các bên sở hữu trí tuệ liên quan.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>7. Giới hạn trách nhiệm</h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Ông Bà Yêu cam kết cung cấp thông tin và dịch vụ trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  với tất cả sự chăm sóc và tận tâm. Tuy nhiên, chúng tôi không bảo đảm rằng website sẽ hoạt động liên
                  tục và không gặp sự cố, và không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử
                  dụng website này.
                </li>
                <li>
                  Ngoài ra, trong trường hợp các thiệt hại phát sinh từ việc giao dịch trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  , trách nhiệm của Ông Bà Yêu sẽ không vượt quá giá trị đơn hàng mà quý khách đã đặt. Quý khách cũng
                  nên lưý rằng, Ông Bà Yêu không chịu trách nhiệm đối với các thiệt hại phát sinh từ việc sử dụng sản
                  phẩm mà quý khách đã mua trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  .
                </li>
                <li>
                  Ông Bà Yêu không chịu trách nhiệm đối với bất kỳ nội dung, bình luận hoặc thông tin nào được đăng tải
                  trên website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  bởi người dùng, người thứ ba hoặc các đối tác của chúng tôi.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>8. Thay đổi và chấm dứt hợp đồng</h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Ông Bà Yêu có quyền thay đổi hoặc cập nhật Điều khoản và Điều kiện sử dụng này bất cứ lúc nào mà không
                  cần thông báo trước cho quý khách. Việc sử dụng tiếp tục của quý khách sau khi có bất kỳ thay đổi nào
                  đối với Điều khoản và Điều kiện này sẽđược coi là chấp nhận những thay đổi đó.
                </li>
                <li>
                  Ông Bà Yêu có quyền chấm dứt hợp đồng với quý khách nếu quý khách vi phạm bất kỳ điều khoản nào của
                  Điều khoản và Điều kiện này hoặc vi phạm pháp luật hiện hành mà không cần thông báo trước.
                </li>
                <li>
                  Trong trường hợp hợp đồng giữa quý khách và Ông Bà Yêu bị chấm dứt, tất cả các quyền và nghĩa vụ của
                  quý khách và Ông Bà Yêu sẽ ngừng tồn tại, trừ những quyền và nghĩa vụ mà theo tính chất của chúng vẫn
                  phải tồn tại sau khi hợp đồng kết thúc.
                </li>
              </ul>
              <h3 className='@992:fs-20 font-semibold'>9. Luật áp dụng và giải quyết tranh chấp</h3>
              <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Điều khoản và Điều kiện sử dụng này sẽ được điều chỉnh và thực thi theo pháp luật của Cộng hòa Xã hội
                  Chủ nghĩa Việt Nam.
                </li>
                <li>
                  Trong trường hợp có tranh chấp phát sinh giữa quý khách và Ông Bà Yêu liên quan đến việc sử dụng
                  website{' '}
                  <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  , chúng tôi sẽ cố gắng giải quyết tranh chấp trên cơ sở thương lượng và thoả đáng. Nếu không thể giải
                  quyết được, tranh chấp sẽ được đưa ra tòa án có thẩm quyền giải quyết theo quy định của pháp luật Việt
                  Nam.
                </li>
              </ul>
              <p className='@992:fs-16 fs-14'>
                Chúng tôi mong rằng quý khách sẽ đọc kỹ và hiểu rõ các Điều khoản và Điều kiện sử dụng trên website{' '}
                <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>
                . Nếu quý khách có bất kỳ câu hỏi hoặc thắc mắc nào, xin vui lòng liên hệ với chúng tôi qua địa chỉ
                email hoặc số điện thoại được cung cấp trên website. Chúng tôi sẽ cố gắng giải đáp thắc mắc của quý
                khách trong thời gian sớm nhất có thể.
              </p>
              <p className='@992:fs-16 fs-14'>
                Xin cảm ơn quý khách đã sử dụng dịch vụ của{' '}
                <OBYLink href='/' title='Ông Bà Yêu' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>
                . Chúc quý khách có trải nghiệm mua sắm trực tuyến tuyệt vời trên website của chúng tôi!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
