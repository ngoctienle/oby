import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import { customClasses } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import { OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

export default function PrivacyPage() {
  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Chính Sách Bảo Mật',
    description:
      'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, AGRIAMAZING, ongbayeu.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/chinh-sach-bao-mat'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3'>
        <Breadcrumb cateName='Chính sách bảo mật' />
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
                <OBYLink href='/dieu-khoan-va-dieu-kien' className='flex items-center justify-between py-3 px-4.5'>
                  <p className='@768:fs-16 fs-14 text-oby-676869 font-semibold'>Điều khoản và điều kiện</p>
                  <ChevronRightIcon className='w-6 h-6 text-oby-676869' />
                </OBYLink>
                <OBYLink
                  href='/chinh-sach-bao-mat'
                  className={`${customClasses.COMMON_GRADIENT} flex items-center justify-between py-3 px-4.5`}
                >
                  <p className='@768:fs-16 fs-14 text-white font-semibold'>Chính sách bảo mật</p>
                  <ChevronRightIcon className='w-6 h-6 text-white' />
                </OBYLink>
              </div>
            </div>
            <div className='@992:col-span-9 @992:order-2 order-1 col-span-12 space-y-5'>
              <h2 className='font-bold text-oby-green @992:fs-26 fs-20'>Chính sách bảo mật</h2>
              <p className='@992:fs-16 fs-14'>
                Chính sách bảo mật này công bố cách thức mà Công ty TNHH AGRIAMAZING (Sau đây gọi tắt là “AGRIAMAZING”
                hoặc “Chúng tôi”) thu thập, lưu trữ và xử lý thông tin hoặc dữ liệu cá nhân (“Thông tin cá nhân”) của
                các khách hàng của mình trong độ tuổi trung niên và cao tuổi thông qua website{' '}
                <OBYLink href='/' title='AGRIAMAZING' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                và Ứng dụng AGRIAMAZING trên thiết bị di động (Sau đây gọi tắt là &quot;App AGRIAMAZING&quot;)
              </p>
              <p className='@992:fs-16 fs-14'>
                Chúng tôi cam kết sẽ bảo mật các Thông tin cá nhân của khách hàng, sẽ nỗ lực hết sức và sử dụng các biện
                pháp thích hợp để các thông tin mà khách hàng cung cấp cho chúng tôi trong quá trình sử dụng website &
                ứng dụng này được bảo mật và bảo vệ khỏi sự truy cập trái phép. Tuy nhiên, AGRIAMAZING không đảm bảo
                ngăn chặn được tất cả các truy cập trái phép. Công ty TNHH AGRIAMAZING không ủy quyền cho bên thứ ba
                thực hiện việc thu thập, lưu trữ thông tin cá nhân của người tiêu dùng trong độ tuổi trung niên và cao
                tuổi. Trong trường hợp truy cập trái phép nằm ngoài khả năng kiểm soát của chúng tôi, AGRIAMAZING sẽ
                không chịu trách nhiệm dưới bất kỳ hình thức nào đối với bất kỳ khiếu nại, tranh chấp hoặc thiệt hại nào
                phát sinh từ hoặc liên quan đến truy cập trái phép đó.
              </p>
              <p className='@992:fs-16 fs-14'>
                Để hiểu rõ hơn về chính sách trong công tác thu thập, lưu trữ và sử dụng thông tin cá nhân của người sử
                dụng website & app AGRIAMAZING, vui lòng đọc các chính sách bảo mật dưới đây:
              </p>
              <h3 className='@992:fs-20 font-semibold'>1. Mục đích và phạm vi thu thập</h3>
              <p className='@992:fs-16 fs-14'>
                Việc thu thập dữ liệu chủ yếu trên website ongbayeu.com & App AGRIAMAZING bao gồm: số điện thoại, tên
                đăng nhập, mật khẩu đăng nhập, địa chỉ khách hàng, hình ảnh và thư điện tử (nếu có). Đây là các thông
                tin mà AGRIAMAZING cần khách hàng cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và AGRIAMAZING sử dụng
                nhằm liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên ongbayeu.com & App AGRIAMAZING, đảm
                bảo quyền lợi cho khách hàng. Bên cạnh đó, chúng tôi cũng thu thập thông tin về số lần viếng thăm, bao
                gồm số trang bạn xem, số links (liên kết) bạn click và những thông tin khác liên quan đến việc kết nối
                đến site của AGRIAMAZING & App AGRIAMAZING. Chúng tôi cũng thu thập các thông tin mà trình duyệt Web
                (Browser) bạn sử dụng mỗi khi truy cập vào{' '}
                <OBYLink href='/' title='AGRIAMAZING' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                & App AGRIAMAZING, bao gồm: địa chỉ IP, loại Browser, ngôn ngữ sử dụng, thời gian và những địa chỉ mà
                Browser truy xuất đến nhằm nâng cao chất lượng phục vụ khách hàng.
              </p>
              <p className='@992:fs-16 fs-14'>
                Các khách hàng sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng
                ký, mật khẩu và hộp thư điện tử của mình. Ngoài ra, khách hàng có trách nhiệm thông báo kịp thời cho{' '}
                <OBYLink href='/' title='AGRIAMAZING' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                & App AGRIAMAZING về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và
                mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
              </p>
              <h3 className='@992:fs-20 font-semibold'>2. Phạm vi sử dụng thông tin</h3>
              <p className='@992:fs-16 fs-14'>
                Website{' '}
                <OBYLink href='/' title='AGRIAMAZING' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                & App AGRIAMAZING sử dụng thông tin khách hàng cung cấp để:
              </p>
              <ul className='pl-5 list-disc @992:fs-16 fs-14'>
                <li>Cung cấp các dịch vụ đến khách hàng trong độ tuổi trung niên và cao tuổi.</li>
                <li>
                  Gửi các thông báo về các hoạt động trao đổi thông tin giữa khách hàng và website{' '}
                  <OBYLink href='/' title='AGRIAMAZING' className='text-oby-primary @992:fs-16 fs-14'>
                    https://ongbayeu.com/
                  </OBYLink>{' '}
                  cũng như App AGRIAMAZING.
                </li>
                <li>
                  Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của khách hàng hoặc các hoạt động giả mạo khách
                  hàng.
                </li>
                <li>
                  Cải thiện trải nghiệm sử dụng dịch vụ của khách hàng thông qua việc phân tích và đánh giá các thông
                  tin và dữ liệu thu thập được.
                </li>
                <li>
                  Đảm bảo tuân thủ các quy định pháp luật hiện hành và các yêu cầu của cơ quan chức năng liên quan đến
                  việc bảo vệ thông tin cá nhân.
                </li>
              </ul>
              <p className='@992:fs-16 fs-14'>
                Chúng tôi sẽ không sử dụng hoặc tiết lộ các thông tin cá nhân của khách hàng cho mục đích ngoài phạm vi
                đã nêu ở trên, trừ khi được phép hoặc yêu cầu bởi cơ quan chức năng hoặc theo quy định pháp luật.
              </p>
              <h3 className='@992:fs-20 font-semibold'>3. Thời gian lưu trữ thông tin</h3>
              <p className='@992:fs-16 fs-14'>
                AGRIAMAZING sẽ lưu trữ thông tin khách hàng trong độ tuổi trung niên và cao tuổi cho đến khi khách hàng
                yêu cầu xoá thông tin hoặc theo yêu cầu của pháp luật hiện hành.
              </p>
              <h3 className='@992:fs-20 font-semibold'>4. Chia sẻ thông tin</h3>
              <p className='@992:fs-16 fs-14'>
                Chúng tôi cam kết sẽ không chia sẻ, bán hoặc cho thuê thông tin cá nhân của khách hàng cho bên thứ ba
                trừ khi được sự đồng ý của khách hàng hoặc được quy định bởi pháp luật. Tuy nhiên, chúng tôi có thể chia
                sẻ thông tin của khách hàng với các đối tác, nhà cung cấp dịch vụ của chúng tôi để thực hiện các dịch vụ
                liên quan đến việc cung cấp dịch vụ của chúng tôi đến khách hàng. Chúng tôi cam kết sẽ chỉ chia sẻ thông
                tin cần thiết và đảm bảo rằng các đối tác, nhà cung cấp dịch vụ của chúng tôi sẽ tuân thủ các quy định
                bảo vệ thông tin cá nhân và các quy định pháp luật liên quan đến bảo vệ thông tin cá nhân. Chúng tôi
                cũng có thể chia sẻ thông tin của khách hàng khi cần thiết để xử lý các tranh chấp phát sinh hoặc để
                ngăn ngừa các hoạt động giả mạo, lừa đảo hoặc các hành vi phá hoại khác.
              </p>
              <h3 className='@992:fs-20 font-semibold'>5. Bảo mật thông tin</h3>
              <p className='@992:fs-16 fs-14'>
                Chúng tôi sử dụng các biện pháp bảo mật thích hợp để bảo vệ thông tin cá nhân của khách hàng khỏi sự
                truy cập trái phép, mất mát hoặc tiết lộ. Chúng tôi sử dụng các công nghệ bảo mật tiên tiến, bao gồm mật
                khẩu bảo vệ, mã hóa dữ liệu và cơ chế giám sát truy cập để đảm bảo an toàn thông tin. Chúng tôi cũng có
                các quy trìnhnội bộ để đảm bảo rằng các thông tin cá nhân của khách hàng được bảo vệ và chỉ có những
                nhân viên có nhu cầu công việc được phép truy cập vào các thông tin này.
              </p>
              <p className='@992:fs-16 fs-14'>
                Tuy nhiên, chúng tôi cũng nhận thức được rằng không có hệ thống bảo mật nào là hoàn toàn an toàn trước
                những mối đe dọa bên ngoài, và do đó chúng tôi không thể cam đoan rằng thông tin cá nhân của khách hàng
                sẽ được bảo mật hoàn toàn. Nếu khách hàng nhận thấy bất kỳ sự vi phạm nào đối với thông tin cá nhân của
                mình, vui lòng liên hệ với chúng tôi ngay để chúng tôi có thể giúp đỡ và giải quyết vấn đề.
              </p>
              <h3 className='@992:fs-20 font-semibold'>6. Quyền của khách hàng</h3>
              <p className='@992:fs-16 fs-14'>
                Khách hàng có quyền yêu cầu truy cập, sửa đổi hoặc xoá các thông tin cá nhân của mìnhđược lưu trữ trong
                hệ thống của chúng tôi. Nếu khách hàng muốn truy cập, sửa đổi hoặc xoá thông tin cá nhân của mình, vui
                lòng liên hệ với chúng tôi thông qua địa chỉ email:{' '}
                <OBYLink
                  href={`mailto:support@ongbayeu.com`}
                  title='AGRIAMAZING - Email'
                  className='text-oby-primary @992:fs-16 fs-14'
                >
                  support@ongbayeu.com
                </OBYLink>
                . Chúng tôi sẽ cố gắng giải quyết yêu cầu của khách hàng trong thời gian sớm nhất có thể.
              </p>
              <h3 className='@992:fs-20 font-semibold'>7. Thay đổi chính sách bảo mật</h3>
              <p className='@992:fs-16 fs-14'>
                Chúng tôi có thể thay đổi chính sách bảo mật nàyđể phản ánh các thay đổi trong quy trình hoạt động của
                chúng tôi hoặc để tuân thủ các quy định pháp luật mới. Chúng tôi sẽ thông báo cho khách hàng về bất kỳ
                thay đổi nào của chính sách bảo mật này bằng cách đăng thông báo trên website{' '}
                <OBYLink href='/' title='AGRIAMAZING' className='text-oby-primary @992:fs-16 fs-14'>
                  https://ongbayeu.com/
                </OBYLink>{' '}
                và trong App AGRIAMAZING. Chúng tôi khuyến khích khách hàng đánh giá lại chính sách bảo mật này thường
                xuyên để hiểu rõ hơn về cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng.
              </p>
              <h3 className='@992:fs-20 font-semibold'>8. Liên hệ</h3>
              <p className='@992:fs-16 fs-14'>
                Nếu có bất kỳ câu hỏi hoặc khiếu nại nào liên quan đến chính sách bảo mật của chúng tôi, khách hàng có
                thể liên hệ với chúng tôi qua địa chỉ email:{' '}
                <OBYLink
                  href={`mailto:ongbayeu.corp@gmail.com`}
                  title='AGRIAMAZING - Email'
                  className='text-oby-primary @992:fs-16 fs-14'
                >
                  ongbayeu.corp@gmail.com
                </OBYLink>
                . Chúng tôi sẽ cố gắngtrả lời thắc mắc của khách hàng trong thời gian sớm nhất có thể và giải quyết các
                vấn đề phát sinh liên quan đến thông tin cá nhân của khách hàng một cách nhanh chóng và hiệu quả nhất.
              </p>
              <p>
                Chúng tôi rất coi trọng việc bảo vệ thông tin cá nhân của khách hàng và cam kết tuân thủ các quy định
                pháp luật liên quan đến bảo vệ thông tin cá nhân. Cảm ơn khách hàng đã tin tưởng và sử dụng dịch vụ của
                chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
