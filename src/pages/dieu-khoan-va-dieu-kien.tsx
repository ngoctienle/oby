import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import { customClasses } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function ConditionPage() {
  const meta = generateMetaSEO({
    title: 'Agriamazing',
    template: 'Điều Khoản và Điều Kiện',
    description:
      'Agriamazing là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`AMZ, Agriamazing, agriamazing.com`],
    og_image_alt: 'Agriamazing',
    slug: '/dieu-khoan-va-dieu-kien'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3 pb-6 bg-white'>
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
              <h2 className='font-bold text-oby-primary @992:fs-26 fs-20'>Điều khoản và điều kiện</h2>
              <p className='@992:fs-16 fs-14'>
                Chào mừng quý khách đến với Agriamazing, trang web chính thức của Công Ty TNHH Agriamazing, chuyên cung
                cấp nông sản sạch, thực phẩm an toàn và các sản phẩm decor sáng tạo thủ công.
              </p>
              <h3 className='@992:fs-20 font-semibold'>
                1. Hướng dẫn sử dụng trang website{' '}
                <OBYLink href='/' title='Agriamazing' className='underline'>
                  https://agriamazing.com
                </OBYLink>
              </h3>
              <p className='@992:fs-16 fs-14'>
                Khi truy cập vào trang web của Agriamazing, người dùng phải từ 18 tuổi trở lên hoặc truy cập dưới sự
                giám sát của cha mẹ hay người giám hộ hợp pháp. Chúng tôi cấp tài khoản sử dụng để quý khách có thể mua
                sắm trên trang web trong khuôn khổ các Điều khoản và Điều kiện sử dụng đã đề ra.
                <br />
                Nghiêm cấm sử dụng bất kỳ phần nào của trang web này cho mục đích thương mại hoặc nhân danh bất kỳ đối
                tác thứ ba nào mà không được Agriamazing cho phép bằng văn bản. Nếu vi phạm, Agriamazing sẽ hủy tài
                khoản của quý khách mà không cần báo trước.
                <br />
                Quý khách phải đăng ký tài khoản với thông tin xác thực và cập nhật nếu có bất kỳ thay đổi nào. Quý
                khách chịu trách nhiệm bảo mật mật khẩu, tài khoản và hoạt động của mình trên trang web. Hãy thông báo
                cho Agriamazing biết khi tài khoản bị truy cập trái phép. Chúng tôi không chịu trách nhiệm đối với những
                thiệt hại hoặc mất mát do quý khách không tuân thủ quy định.
                <br />
                Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ trang web. Quý khách có thể từ
                chối bằng cách nhấp vào đường link ở cuối mỗi email quảng cáo.
              </p>
              {/* <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Khi vào website của Agriamazing, người dùng tối thiểu phải 18 tuổi hoặc truy cập dưới sự giám sát của
                  cha mẹ hay người giám hộ hợp pháp.
                </li>
                <li>
                  Agriamazing cấp tài khoản sử dụng để quý khách có thể mua sắm trên website này trong khuôn khổ Điều
                  khoản và Điều kiện sử dụng đã đề ra.
                </li>
                <li>
                  Nghiêm cấm sử dụng bất kỳ phần nào của trang website này với mục đích thương mại hoặc nhân danh bất kỳ
                  đối tác thứ ba nào nếu không được Agriamazing cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong
                  đây, Agriamazing sẽ hủy tài khoản của quý khách mà không cần báo trước.
                </li>
                <li>
                  Quý khách phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ
                  thay đổi nào. Mỗi cá nhân truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình
                  trên website này. Hơn nữa, quý khách phải thông báo cho Agriamazing biết khi tài khoản bị truy cập
                  trái phép. Agriamazing không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với những
                  thiệt hại hoặc mất mát gây ra do quý khách không tuân thủ quy định.
                </li>
                <li>
                  Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website{' '}
                  <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  Sau đó, nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở
                  dưới cùng trong mọi email quảng cáo.
                </li>
              </ul> */}
              <h3 className='@992:fs-20 font-semibold'>2. Ý kiến khách hàng:</h3>
              <p className='@992:fs-16 fs-14'>
                Tất cả nội dung trên trang web cũng như ý kiến đóng góp, bình luận của quý khách đều là tài sản của
                Agriamazing. Nếu phát hiện bất kỳ thông tin nghi ngờ giả mạo, chúng tôi sẽ khóa tài khoản hoặc áp dụng
                các biện pháp khác theo quy định của pháp luật.
              </p>
              <h3 className='@992:fs-20 font-semibold'>3. Đặt hàng và thanh toán:</h3>
              <p className='@992:fs-16 fs-14'>
                Khi đặt hàng trên trang web, quý khách phải cung cấp đầy đủ thông tin để chúng tôi có thể xử lý đơn
                hàng. Quý khách có thể chọn phương thức thanh toán trực tuyến hoặc thanh toán khi nhận hàng, tùy thuộc
                vào các chính sách và quy định tại thời điểm đó. <br />
                Nếu sử dụng phương thức thanh toán trực tuyến, quý khách phải thanh toán qua các kênh thanh toán được
                cung cấp trên trang web và tuân thủ các quy định về thanh toán của đối tác thanh toán của chúng tôi.
                Việc thanh toán trực tuyến sẽ được thực hiện trên các trang web của đối tác thanh toán, quý khách nên
                kiểm tra kỹ trước khi tiến hành thanh toán.
              </p>
              {/* <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Khi quý khách chọn sản phẩm và đặt hàng trên website{' '}
                  <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  , quý khách phải cung cấp đầy đủ thông tin để Agriamazing có thể xử lý đơn hàng của quý khách.
                </li>
                <li>
                  Quý khách có thể chọn phương thức thanh toán trực tuyến hoặc thanh toán khi nhận hàng, tùy thuộc vào
                  các chính sách và quy định của Agriamazing tại thời điểm đó. Quý khách phải thanh toán đầy đủ giá trị
                  đơn hàng và phí vận chuyển (nếu có) theo phương thức thanh toán đã chọn.
                </li>
                <li>
                  Nếu quý khách sử dụng phương thức thanh toán trực tuyến, quý khách phải thanh toán qua các kênh thanh
                  toán được cung cấp trên website{' '}
                  <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  và phải tuân thủ các quy định về thanh toán của đối tác thanh toán của Agriamazing. Quý khách cần lưu
                  ý rằng, việc thanh toán trực tuyến sẽ được thực hiện trên các trang web của đối tác thanh toán, và quý
                  khách nên kiểm tra kỹ trước khi tiến hành thanh toán.
                </li>
              </ul> */}
              <h3 className='@992:fs-20 font-semibold'>4. Giao hàng và trả hàng</h3>
              <p className='@992:fs-16 fs-14'>
                Thời gian giao hàng và các thông tin liên quan sẽ được cung cấp khi quý khách đặt hàng. Quý khách cần
                cung cấp địa chỉ và thông tin liên lạc chính xác để đảm bảo việc giao hàng được thực hiện đúng thời gian
                và địa điểm đã hẹn.
                <br /> Nếu không hài lòng với sản phẩm đã nhận, quý khách có thể yêu cầu đổi hoặc trả hàng theo quy định
                của Agriamazing. Quý khách nên kiểm tra kỹ sản phẩm trước khi ký nhận. Nếu sản phẩm bị hỏng hoặc không
                đúng với mô tả, quý khách có thể liên hệ để được hỗ trợ đổi hoặc trả hàng.
              </p>
              {/* <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Thời gian giao hàng và các thông tin khác liên quan đến vận chuyển sẽ được cung cấp cho quý khách khi
                  quý khách đặt hàng trên website{' '}
                  <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  . Quý khách có trách nhiệm cung cấp địa chỉ và thông tin liên lạc chính xác để đảm bảo việc giao hàng
                  được thực hiện đúng thời gian và địa điểm đã hẹn.
                </li>
                <li>
                  Nếu quý khách không hài lòng với sản phẩm đã nhận được, quý khách có thể yêu cầu đổi hoặc trả hàng
                  theo quy định của Agriamazing. Quý khách nên kiểm tra kỹ sản phẩm trước khi ký nhận để đảm bảo rằng
                  sản phẩm đúng với mô tả trên website. Nếu sản phẩm bị hỏng hoặc không đúng với mô tả, quý khách có thể
                  liên hệ với Agriamazing để được hỗ trợ đổi hoặc trả hàng.
                </li>
              </ul> */}
              <h3 className='@992:fs-20 font-semibold'>5. Bảo vệ thông tin cá nhân</h3>
              <p className='@992:fs-16 fs-14'>
                Agriamazing cam kết bảo vệ thông tin cá nhân của quý khách theo quy định của pháp luật và chính sách bảo
                mật của công ty. Thông tin cá nhân của quý khách có thể được sử dụng để liên hệ, cung cấp thông tin sản
                phẩm và dịch vụ khách hàng phù hợp, hoặc để thực hiện các giao dịch trên trang web. Chúng tôi cam kết
                không tiết lộ thông tin cá nhân của quý khách cho bất kỳ bên thứ ba nào ngoại trừ trường hợp được quy
                định bởi pháp luật hoặc được quý khách đồng ý.
              </p>
              {/* <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Agriamazing cam kết bảo vệ thông tin cá nhân của quý khách theo quy định của pháp luật và chính sách
                  bảo mật của công ty. Quý khách có thể tham khảo chi tiết chính sách bảo mật trên trang web{' '}
                  <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                </li>
                <li>
                  Quý khách đồng ý rằng, thông tin cá nhân của quý khách có thể được sử dụng để liên hệ, cung cấp thông
                  tin sản phẩm và dịch vụ khách hàng phù hợp, hoặc để thực hiện các giao dịch trên website{' '}
                  <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>
                  . Tuy nhiên, Agriamazing cam kết sẽ không tiết lộ thông tin cá nhân của quýkhách cho bất kỳ bên thứ ba
                  nào ngoại trừ trường hợp được quy định bởi pháp luật hoặc được quý khách đồng ý.
                </li>
              </ul> */}
              <h3 className='@992:fs-20 font-semibold'>6. Quyền sở hữu trí tuệ</h3>
              <p className='@992:fs-16 fs-14'>
                Tất cả nội dung, bao gồm nhưng không giới hạn đến tên miền, logo, tài liệu, hình ảnh, video, âm thanh và
                các mã nguồn trên trang web đều thuộc quyền sở hữu của Agriamazing hoặc các bên sở hữu trí tuệ khác đồng
                ý cho phép sử dụng. Quý khách không có quyền sao chép, phát hành, phân phối hoặc sử dụng bất kỳ nội dung
                nào trên trang web mà không được sự cho phép bằng văn bản của chúng tôi hoặc các bên sở hữu trí tuệ liên
                quan.
              </p>
              {/* <ul className='list-disc pl-5 spacy-y-2 @992:fs-16 fs-14'>
                <li>
                  Tất cả nội dung, bao gồm nhưng không giới hạn đến tên miền, logo, tài liệu, hình ảnh, video, âm thanh
                  và các mã nguồn trên website{' '}
                  <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  đều thuộc quyền sở hữu của Agriamazing hoặc các bên sở hữu trí tuệ khác đồng ý cho phép sử dụng.
                </li>
                <li>
                  Quý khách không có quyền sao chép, phát hành, phân phối hoặc sử dụng bất kỳ nội dung nào trên website
                  này mà không được sự cho phép bằng văn bản của chúng tôi hoặc các bên sở hữu trí tuệ liên quan.
                </li>
              </ul> */}
              <h3 className='@992:fs-20 font-semibold'>7. Giới hạn trách nhiệm</h3>
              <p className='@992:fs-16 fs-14'>
                Agriamazing cam kết cung cấp thông tin và dịch vụ trên trang web với tất cả sự chăm sóc và tận tâm. Tuy
                nhiên, chúng tôi không bảo đảm rằng trang web sẽ hoạt động liên tục và không gặp sự cố, và không chịu
                trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng trang web. <br />
                Trong trường hợp các thiệt hại phát sinh từ việc giao dịch trên trang web, trách nhiệm của Agriamazing
                sẽ không vượt quá giá trị đơn hàng mà quý khách đã đặt. Chúng tôi không chịu trách nhiệm đối với các
                thiệt hại phát sinh từ việc sử dụng sản phẩm mà quý khách đã mua trên trang web.
              </p>
              <h3 className='@992:fs-20 font-semibold'>8. Thay đổi và chấm dứt hợp đồng</h3>
              <p className='@992:fs-16 fs-14'>
                Agriamazing có quyền thay đổi hoặc cập nhật Điều khoản và Điều kiện này bất cứ lúc nào mà không cần
                thông báo trước. Việc sử dụng tiếp tục của quý khách sau khi có bất kỳ thay đổi nào sẽ được coi là chấp
                nhận những thay đổi đó. Chúng tôi có quyền chấm dứt hợp đồng với quý khách nếu quý khách vi phạm bất kỳ
                điều khoản nào hoặc vi phạm pháp luật hiện hành mà không cần thông báo trước. Trong trường hợp hợp đồng
                bị chấm dứt, tất cả các quyền và nghĩa vụ của quý khách và Agriamazing sẽ ngừng tồn tại, trừ những quyền
                và nghĩa vụ mà theo tính chất của chúng vẫn phải tồn tại sau khi hợp đồng kết thúc.
              </p>
              <h3 className='@992:fs-20 font-semibold'>9. Luật áp dụng và giải quyết tranh chấp</h3>
              <p className='@992:fs-16 fs-14'>
                Điều khoản và Điều kiện này sẽ được điều chỉnh và thực thi theo pháp luật của Cộng hòa Xã hội Chủ nghĩa
                Việt Nam. Trong trường hợp có tranh chấp phát sinh, chúng tôi sẽ cố gắng giải quyết trên cơ sở thương
                lượng và thoả đáng. Nếu không thể giải quyết, tranh chấp sẽ được đưa ra tòa án có thẩm quyền giải quyết
                theo quy định của pháp luật Việt Nam. Chúng tôi mong rằng quý khách sẽ đọc kỹ và hiểu rõ các Điều khoản
                và Điều kiện này. Nếu có bất kỳ câu hỏi hoặc thắc mắc nào, xin vui lòng liên hệ với chúng tôi qua địa
                chỉ email mkt@agriamazing.comamazingsbuy.com hoặc số điện thoại 0906 907 199. Chúng tôi sẽ cố gắng giải
                đáp trong thời gian sớm nhất có thể.
                <br />
                Xin cảm ơn quý khách đã sử dụng dịch vụ của Agriamazing!
              </p>
              {/* <p className='@992:fs-16 fs-14'>
                Chúng tôi mong rằng quý khách sẽ đọc kỹ và hiểu rõ các Điều khoản và Điều kiện sử dụng trên website{' '}
                <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>
                . Nếu quý khách có bất kỳ câu hỏi hoặc thắc mắc nào, xin vui lòng liên hệ với chúng tôi qua địa chỉ
                email hoặc số điện thoại được cung cấp trên website. Chúng tôi sẽ cố gắng giải đáp thắc mắc của quý
                khách trong thời gian sớm nhất có thể.
              </p>
              <p className='@992:fs-16 fs-14'>
                Xin cảm ơn quý khách đã sử dụng dịch vụ của{' '}
                <OBYLink href='/' title='Agriamazing' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>
                . Chúc quý khách có trải nghiệm mua sắm trực tuyến tuyệt vời trên website của chúng tôi!
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
