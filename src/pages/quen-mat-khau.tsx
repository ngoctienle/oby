import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormSchema, formSchema } from '@/libs/rules'
import { generateMetaSEO } from '@/libs/seo'
import { cn } from '@/libs/utils'

import authApi from '@/apis/magento/auth.api'

import { hrefPath } from '@/constants/href.constant'

import Input from '@/components/Input'
import { AsyncButton } from '@/components/UI/Button'
import { OBYButton, OBYImage, OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

type ForgotSchema = Pick<FormSchema, 'email'>
const forgotSchema = formSchema.pick(['email'])

export default function ForgotPWPage() {
  const [data, setData] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotSchema>({
    resolver: yupResolver(forgotSchema)
  })

  const forgotMutation = useMutation({
    mutationFn: (email: string) => authApi.ForgotPassword(email)
  })

  const handleSubmitForgot = handleSubmit((data) => {
    console.log(data)
    const { email } = data
    forgotMutation.mutate(email, {
      onSuccess: (data) => {
        setData(data.data)
        setEmail(email)
      }
    })
  })

  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Quên Mật Khẩu',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/quen-mat-khau'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <div className='pt-6 @992:pt-10'>
        <div className='container'>
          <h2 className='fs-20 @992:fs-26 text-center font-bold text-oby-green'>Quên mật khẩu{data ? '?' : ''}</h2>
          {!data ? (
            <>
              <p className='text-center mt-4 text-oby-9A9898'>Vui lòng nhập email để lấy lại mật khẩu</p>
              <form noValidate onSubmit={handleSubmitForgot} className='mt-7.5 @768:max-w-[500px] mx-auto pb-15'>
                <Input
                  type='email'
                  placeholder='Địa chỉ email'
                  name='email'
                  errorMessage={errors.email?.message}
                  register={register}
                />
                <AsyncButton type='submit' isLoading={forgotMutation.isLoading} className={cn('w-full fs-16 mt-6')}>
                  Lấy lại mật khẩu
                </AsyncButton>
              </form>
            </>
          ) : (
            <div className='@768:max-w-[500px] mx-auto'>
              <div className='relative w-16 h-16 my-4 mx-auto'>
                <OBYImage src='/images/sending.png' alt='Gửi Email' display='responsive' />
              </div>
              <p className='@992:fs-16 fs-14 mb-2 text-center'>
                Link tạo mật khẩu mới của bạn vừa được gửi đến email <span className='text-oby-primary'>{email}</span>
              </p>
              <p className='@992:fs-16 fs-14 text-center'>Vui lòng kiểm tra lại hộp thư đến hoặc hộp thư spam.</p>
              <OBYButton asChild variant='outline' className={cn('mt-7.5 w-full')}>
                <OBYLink href={hrefPath.home}>Đóng</OBYLink>
              </OBYButton>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
