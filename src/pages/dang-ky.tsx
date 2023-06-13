import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { RegisterBodyRequest } from '@/@types/auth.type'
import { ResponseError } from '@/@types/magento.type'

import { ErrorMagento, FormSchema, formSchema } from '@/libs/rules'
import { generateMetaSEO } from '@/libs/seo'
import { cn } from '@/libs/utils'

import { isAxiosError } from '@/helpers/auth'

import authApi from '@/apis/magento/auth.api'

import { hrefPath } from '@/constants/href.constant'

import Input from '@/components/Input'
import { AsyncButton } from '@/components/UI/Button'
import { OBYButton, OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

type FormRegister = Pick<FormSchema, 'email' | 'password' | 'firstname' | 'lastname'>
const registerFormSchema = formSchema.pick(['email', 'password', 'firstname', 'lastname'])

export default function Signup() {
  const router = useRouter()
  const { query } = router
  const queryRedirect = Object.values(query)[0] ?? hrefPath.login

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormRegister>({
    resolver: yupResolver(registerFormSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: RegisterBodyRequest) => authApi.RegisterAccount(body)
  })

  const handleSubmitRegister = handleSubmit((data) => {
    console.log(data)
    const { email, password, firstname, lastname } = data
    const body: RegisterBodyRequest = {
      customer: {
        email,
        firstname,
        lastname
      },
      password
    }
    registerMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Đăng ký tài khoản thành công!')
        if (typeof queryRedirect === 'string') {
          router.push(queryRedirect)
        }
      },
      onError: (error) => {
        if (isAxiosError<ResponseError>(error)) {
          const formError = error.response?.data
          if (formError?.message === ErrorMagento.emailExisted) {
            setError('email', {
              message: 'Email này đã tồn tại!'
            })
          } else {
            toast.error('Có lỗi xảy ra! Vui lòng thử lại!')
          }
        }
      }
    })
  })

  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Đăng Ký',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/dang-ky'
  })

  return (
    <>
      <OBYSeo {...meta} />
      <div className='pt-6 @992:pt-10'>
        <div className='container'>
          <h2 className='fs-20 @992:fs-26 text-center font-bold text-oby-green'>Đăng ký</h2>
          <form
            noValidate
            onSubmit={handleSubmitRegister}
            className='mt-7.5 @768:max-w-[500px] mx-auto pb-15 border-b border-b-oby-DFDFDF'
          >
            <Input
              type='email'
              placeholder='Email'
              name='email'
              errorMessage={errors.email?.message}
              register={register}
            />
            <Input
              type='text'
              placeholder='Tên'
              name='firstname'
              className='@768:mt-4.5 mt-4'
              errorMessage={errors.firstname?.message}
              register={register}
            />
            <Input
              type='text'
              placeholder='Họ và Tên lót'
              name='lastname'
              className='@768:mt-4.5 mt-4'
              errorMessage={errors.lastname?.message}
              register={register}
            />
            <Input
              type='password'
              placeholder='Mật khẩu'
              name='password'
              className='@768:mt-4.5 mt-4'
              errorMessage={errors.password?.message}
              register={register}
            />
            <AsyncButton isLoading={registerMutation.isLoading} className={cn('w-full mt-7.5 fs-16')} type='submit'>
              Đăng Ký
            </AsyncButton>
            <p className='text-center @768:fs-14 fs-12 text-oby-9A9898 mt-4.5'>
              Bằng việc Tiếp tục, bạn đã chấp nhận{' '}
              <OBYButton variant='link' size='link' asChild>
                <OBYLink href={hrefPath.home} title='Điều khoản sử dụng'>
                  điều khoản sử dụng
                </OBYLink>
              </OBYButton>
            </p>
          </form>
          <p className='mt-5 fs-14 @768:fs-16 text-center'>
            Bạn đã có tài khoản?{' '}
            <OBYButton variant='link' size='link' asChild>
              <OBYLink
                href={queryRedirect !== hrefPath.login ? hrefPath.login + `?cb=${queryRedirect}` : hrefPath.login}
              >
                Đăng nhập ngay
              </OBYLink>
            </OBYButton>
          </p>
        </div>
      </div>
    </>
  )
}
