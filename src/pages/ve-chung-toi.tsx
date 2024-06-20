import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { generateMetaSEO } from '@/libs/seo'

import { customClasses } from '@/constants/config.constant'

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
      <section className='@992:pt-4 pt-3 bg-white'>
        <Breadcrumb cateName='Về chúng tôi' />
        <div className='container'>
          <div className='grid grid-cols-12 @992:gap-10 gap-6'>
            <div className='@992:col-span-3 @992:order-1 order-2 col-span-12'>
              <div className='@768:py-3 py-2.5 rounded-2 bg-white max-h-fit bsd'>
                <OBYLink
                  href='/ve-chung-toi'
                  className={`${customClasses.COMMON_GRADIENT} flex items-center justify-between py-3 px-4.5`}
                >
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
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>🌱 Giới Thiệu Về Agriamazing 🌱</h3>
              <p className='@992:fs-16 fs-14'>
                Chào mừng bạn đến với Agriamazing! Chúng tôi là một doanh nghiệp tiên phong trong lĩnh vực cung cấp nông
                sản sạch, thực phẩm an toàn và các sản phẩm decor sáng tạo thủ công. Với niềm đam mê và tâm huyết,
                Agriamazing không chỉ mang đến những sản phẩm chất lượng cao mà còn lan tỏa giá trị của sự bền vững và
                sáng tạo đến mọi gia đình.
              </p>
              <div className='my-6 grid grid-cols-12 @768:gap-4 gap-2.5'>
                <div className='col-span-5'>
                  <div className='relative @768:h-[418px] h-[161px] w-full rounded-2 overflow-hidden p-3'>
                    <OBYImage
                      src='/images/agr-about-1.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                    <div className='relative w-[136px] h-[47px] p-3'>
                      <OBYImage display='responsive' src='/images/new_logo.svg' alt='AGRIAMAZING' />
                    </div>
                  </div>
                </div>
                <div className='col-span-7'>
                  <div className='flex flex-col @768:gap-4 gap-2.5'>
                    <div className='relative w-full @768:h-[201px] h-[76px] rounded-2 overflow-hidden p-3'>
                      <OBYImage
                        src='/images/agr-about-2.png'
                        alt='Về chúng tôi'
                        display='responsive'
                        className='object-cover'
                      />
                      <div className='relative w-[76px] h-[26px] p-3'>
                        <OBYImage display='responsive' src='/images/new_logo.svg' alt='AGRIAMAZING' />
                      </div>
                    </div>
                    <div className='relative w-full @768:h-[201px] h-[76px] rounded-2 overflow-hidden p-3'>
                      <OBYImage
                        src='/images/agr-about-3.png'
                        alt='Về chúng tôi'
                        display='responsive'
                        className='object-cover'
                      />
                      <div className='relative w-[76px] h-[26px] p-3'>
                        <OBYImage display='responsive' src='/images/new_logo.svg' alt='AGRIAMAZING' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Sứ Mệnh và Tầm Nhìn</h3>
              <p className='@992:fs-16 fs-14'>
                Công ty Agriamazing được thành lập với sứ mệnh mang đến cho người tiêu dùng những sản phẩm nông sản
                sạch, thực phẩm an toàn và các sản phẩm decore sáng tạo thủ công tốt cho sức khỏe. Chúng tôi cam kết
                không chỉ cung cấp những sản phẩm chất lượng cao, mà còn góp phần thúc đẩy sự phát triển bền vững của
                nông nghiệp và làng nghề thủ công truyền thống.
              </p>
              <div className='my-4  @768:h-[340px] h-[180px] w-full  relative rounded-2 p-3'>
                <OBYImage
                  src='/images/agr-about-4.png'
                  alt='Về chúng tôi'
                  display='responsive'
                  className='object-cover'
                />
                <div className='relative w-[136px] h-[47px] p-3'>
                  <OBYImage display='responsive' src='/images/new_logo.svg' alt='AGRIAMAZING' />
                </div>
              </div>

              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Sản Phẩm Nông Sản Sạch</h3>
              <p className='@992:fs-16 fs-14'>
                Agriamazing chuyên cung cấp các loại nông sản sạch, đảm bảo an toàn vệ sinh thực phẩm từ nguồn gốc đến
                tay người tiêu dùng. Chúng tôi hợp tác trực tiếp với các trang trại hữu cơ, kiểm soát chặt chẽ quy trình
                trồng trọt và thu hoạch để mang lại những sản phẩm tươi ngon, giàu dinh dưỡng. Các loại nông sản của
                chúng tôi bao gồm:
              </p>
              <ul className='list-disc pl-6 @992:fs-16 fs-14 space-y-2.5'>
                <li>Rau củ quả hữu cơ</li>
                <li>Trái cây theo mùa</li>
                <li> Ngũ cốc và các sản phẩm từ ngũ cốc</li>
              </ul>
              <div className='my-4 grid grid-cols-12 gap-4'>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] rounded-2 overflow-hidden'>
                    <OBYImage
                      src='/images/agr-about-5.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] mt-6 rounded-2 overflow-hidden'>
                    <OBYImage
                      src='/images/agr-about-6.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] rounded-2 overflow-hidden'>
                    <OBYImage
                      src='/images/agr-about-7.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
                <div className='col-span-3'>
                  <div className='relative @768:h-[360px] h-[139px] mt-6 rounded-2 overflow-hidden'>
                    <OBYImage
                      src='/images/agr-about-8.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover'
                    />
                  </div>
                </div>
              </div>

              <h3 className='font-semibold @992:fs-20 fs-16 mb-4'>Thực Phẩm An Toàn</h3>
              <p className='@992:fs-16 fs-14'>
                Bên cạnh nông sản, Agriamazing còn cung cấp đa dạng các loại thực phẩm an toàn, từ các loại thịt cá,
                trứng sữa đến các sản phẩm chế biến sẵn. Tất cả đều được lựa chọn kỹ lưỡng và kiểm nghiệm chất lượng
                trước khi đến tay người tiêu dùng. Chúng tôi tin rằng sức khỏe của khách hàng là ưu tiên hàng đầu và cam
                kết mang đến những sản phẩm không chứa chất bảo quản, phụ gia độc hại.
              </p>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>Sản Phẩm Decor Sáng Tạo Thủ Công</h3>
              <p className='@992:fs-16 fs-14'>
                Agriamazing cũng tự hào giới thiệu đến khách hàng các sản phẩm decor sáng tạo thủ công, được làm từ các
                nguyên liệu tự nhiên, thân thiện với môi trường. Các sản phẩm này không chỉ mang giá trị thẩm mỹ cao mà
                còn tốt cho sức khỏe, phù hợp để trang trí không gian sống và làm quà tặng ý nghĩa. Một số sản phẩm tiêu
                biểu bao gồm:
              </p>
              <ul className='list-disc pl-6 @992:fs-16 fs-14 space-y-2.5'>
                <li>Đồ gốm sứ thủ công</li>
                <li>Tranh thêu, tranh vẽ tay</li>
                <li>Đồ nội thất và trang trí từ gỗ, tre, nứa</li>
              </ul>
              <div className='my-6 flex @768:flex-row flex-col-reverse gap-6'>
                <div className='col-span-6 flex flex-col max-w-[411px]'>
                  <div className='relative w-full @992:h-[416px] h-[239px]'>
                    <OBYImage
                      src='/images/agr-about-9.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover rounded-2'
                    />
                  </div>
                  <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>Cam Kết Của Chúng Tôi</h3>
                  <ul className='list-decimal pl-6 @992:fs-16 fs-14 space-y-1 leading-[21px]'>
                    <li>
                      Chất Lượng Hàng Đầu: Tất cả sản phẩm của Agriamazing đều được chọn lọc và kiểm tra kỹ lưỡng, đảm
                      bảo chất lượng tốt nhất.
                    </li>
                    <li>
                      Giá Cả Hợp Lý: Chúng tôi luôn nỗ lực để cung cấp sản phẩm với giá cả phải chăng, mang lại giá trị
                      tốt nhất cho khách hàng.
                    </li>
                    <li>
                      Dịch Vụ Khách Hàng Tận Tâm: Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ và giải
                      đáp mọi thắc mắc của bạn.
                    </li>
                  </ul>
                </div>
                <div className='col-span-6 flex flex-col gap-6'>
                  <div className='relative @992:w-[452px] w-full @992:h-[196px] h-[239px]'>
                    <OBYImage
                      src='/images/agr-about-10.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover rounded-2'
                    />
                  </div>
                  <div className='relative @992:w-[452px] w-full @992:h-[196px] h-[239px]'>
                    <OBYImage
                      src='/images/agr-about-11.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover rounded-2'
                    />
                  </div>
                  <div className='relative @992:w-[452px] w-full h-[239px]'>
                    <OBYImage
                      src='/images/agr-about-12.png'
                      alt='Về chúng tôi'
                      display='responsive'
                      className='object-cover rounded-2'
                    />
                  </div>
                </div>
              </div>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>Kết Luận</h3>
              <p className='@992:fs-16 fs-14 mb-2.5'>
                Agriamazing không chỉ là một đơn vị kinh doanh, mà còn là người bạn đồng hành đáng tin cậy trong hành
                trình tìm kiếm những sản phẩm nông sản sạch, thực phẩm an toàn và đồ decor sáng tạo thủ công. Chúng tôi
                mong muốn góp phần nâng cao chất lượng cuộc sống và bảo vệ sức khỏe cho mỗi gia đình. Hãy đến với
                Agriamazing để trải nghiệm sự khác biệt và cùng chúng tôi xây dựng một tương lai xanh, sạch và bền vững!
              </p>
              <h3 className='font-semibold @992:fs-20 fs-16 mb-4 mt-6'>Đối tác</h3>
              <div className='relative w-full h-[56px] mb-[20px]'>
                <OBYImage
                  src='/images/agr-about-13.png'
                  alt='Về chúng tôi'
                  display='responsive'
                  className='object-cover rounded-2'
                />
              </div>
              <div className='relative w-full h-[56px] mb-[339px]'>
                <OBYImage
                  src='/images/agr-about-13.png'
                  alt='Về chúng tôi'
                  display='responsive'
                  className='object-cover rounded-2'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
