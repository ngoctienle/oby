import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { FormSchema, formSchema } from '@/libs/rules'
import { generateMetaSEO } from '@/libs/seo'
import { cn } from '@/libs/utils'

import { appInformationConfig } from '@/constants/config.constant'

import Breadcrumb from '@/components/Breadcrumb'
import Input from '@/components/Input'
import { AsyncButton } from '@/components/UI/Button'
import { OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYEmailIcon, OBYLocationIcon, OBYPhoneIcon } from '@/components/UI/OBYIcons'
import { OBYSeo } from '@/components/UI/OBYSeo'

type FormContact = Pick<FormSchema, 'email' | 'fullname' | 'phone' | 'remark'>
const contactFormSchema = formSchema.pick(['email', 'fullname', 'phone', 'remark'])

export default function ContactPage() {
  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Liên Hệ',
    description:
      'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, AGRIAMAZING, ongbayeu.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/lien-he'
  })

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors }
  } = useForm<FormContact>({
    resolver: yupResolver(contactFormSchema)
  })

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const handleSubmitContact = handleSubmit((data) => {})

  return (
    <>
      <OBYSeo {...meta} />
      <section className='@992:pt-4 pt-3 pb-6 bg-white'>
        <Breadcrumb cateName='Liên hệ' />
        <div className='container grid grid-cols-2 gap-24'>
          <div className='@992:pt-10 pt-5 col-span-1'>
            <h2 className='font-bold text-oby-primary @992:fs-26 fs-20 mb-5'>Liên hệ</h2>
            <p className='@992:fs-16 fs-14'>
              Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua các thông tin sau:
            </p>
            <ul className='space-y-4 fs-14 @992:fs-16 mt-6'>
              <li className='flex items-center space-x-3'>
                <OBYLocationIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink
                  href={`https://www.google.com/maps/search/?api=1&query=${appInformationConfig.APP_ADDRESS_MAP}`}
                  title='AGRIAMAZING - Phone'
                >
                  Toà B Masteri Centre Point Đ. D1, Long Bình, Thủ Đức, Thành phố Hồ Chí Minh
                </OBYLink>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYPhoneIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink href={`tel:0789.279.669`} title='AGRIAMAZING - Phone'>
                  090 3122611
                </OBYLink>
              </li>
              <li className='flex items-center space-x-3'>
                <OBYEmailIcon className='w-6 h-6 text-oby-676869' />
                <OBYLink href={`mailto:admin@amazingsbuy.com`} title='AGRIAMAZING - Email'>
                  admin@amazingsbuy.com
                </OBYLink>
              </li>
            </ul>
            <p className='@992:fs-16 fs-14 mt-6'>
              Hãy theo dõi blog của chúng tôi để cập nhật những thông tin mới nhất và những bài viết hữu ích về nông sản
              sạch, thực phẩm an toàn và decor sáng tạo. Cảm ơn bạn đã đồng hành cùng Agriamazing!
            </p>
            <div className='w-full h-[216px] relative mt-7'>
              <OBYImage
                src='/images/contact-banner.png'
                display='responsive'
                alt='lien-he'
                title='lien-he'
                className='object-contain'
              />
            </div>
          </div>
          <div className='@992:pt-10 pt-7 px-10 col-span-1 rounded-4 border border-oby-DFDFDF shadow-lg h-full'>
            <h2 className='font-bold text-oby-primary @992:fs-26 fs-20 mb-5 text-center'>Đăng ký tư vấn ngay</h2>
            <p className='@992:fs-16 fs-14 mt-6'>
              Nếu có bất kỳ yêu cầu hoặc thông tin gì, bạn có thể đăng ký để Agriamazing có thể lắng nghe và hỗ trợ
              ngay.
            </p>
            <form
              noValidate
              onSubmit={handleSubmitContact}
              className='mt-7.5 @768:max-w-[500px] mx-auto pb-15 space-y-4'
            >
              <Input
                type='fullname'
                placeholder='Họ và Tên'
                name='fullname'
                errorMessage={errors.fullname?.message}
                register={register}
              />
              <Input
                type='email'
                placeholder='Email'
                name='email'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                type='phone'
                placeholder='Số điện thoại'
                name='phone'
                errorMessage={errors.phone?.message}
                register={register}
              />
              <textarea
                name='remark'
                rows={5}
                placeholder='Ghi chú yêu cầu và vấn đề của bạn để được hỗ trợ'
                className='py-2.5 @768:px-4 px-3 border border-oby-DFDFDF rounded-2.5 @768:rounded-4 bg-white outline-none w-full'
              ></textarea>
              <AsyncButton
                isGradient
                type='submit'
                isLoading={false}
                // isLoading={loginMutation.isLoading}
                className={cn('w-full fs-16 mt-8')}
              >
                ĐĂNG KÝ VÀ TƯ VẤN NGAY
              </AsyncButton>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
