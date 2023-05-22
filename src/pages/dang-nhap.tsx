import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { LoginBodyRequest } from '@/@types/auth.type'
import { ResponseError } from '@/@types/magento.type'

import { ErrorMagento, FormSchema, formSchema } from '@/libs/rules'
import { generateMetaSEO } from '@/libs/seo'
import { useGlobalState } from '@/libs/state'
import { cn } from '@/libs/utils'

import { isAxiosError } from '@/helpers/auth'

import authApi from '@/apis/magento/auth.api'
import cartApi from '@/apis/magento/cart.api'

import { hrefPath } from '@/constants/href.constant'

import Input from '@/components/Input'
import { AsyncButton } from '@/components/UI/Button'
import { OBYButton, OBYLink } from '@/components/UI/Element'
import { OBYSeo } from '@/components/UI/OBYSeo'

type FormLoginSchema = Pick<FormSchema, 'email' | 'password'>
const loginFormSchema = formSchema.pick(['email', 'password'])

export default function Login() {
  const [, setToken] = useGlobalState('token')
  const [guestCartId] = useGlobalState('guestCartId')
  const [, setUser] = useGlobalState('user')
  const [, setCartId] = useGlobalState('cartId')
  const router = useRouter()
  const { query } = router
  const queryRedirect = Object.values(query)[0] ?? hrefPath.home

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLoginSchema>({
    resolver: yupResolver(loginFormSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: LoginBodyRequest) => authApi.LoginAccount(body)
  })

  const handleSubmitLogin = handleSubmit((data) => {
    const { email, password } = data
    const body: LoginBodyRequest = {
      username: email,
      password
    }

    loginMutation.mutate(body, {
      onSuccess: async (data) => {
        const token = data.data
        const { data: meData } = await authApi.FetchMe(token)
        await cartApi.MergeCart(guestCartId as string, token, {
          customerId: meData.id,
          storeId: 1
        })
        Cookies.set('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
        Cookies.set('user', JSON.stringify(meData), { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
        Cookies.set('cartId', guestCartId as string, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })

        setToken(data.data)
        setUser(meData)
        setCartId(guestCartId)
        toast.success('Đăng nhập thành công!')

        if (typeof queryRedirect === 'string') {
          router.push(queryRedirect)
        }
      },
      onError: (error) => {
        if (isAxiosError<ResponseError>(error)) {
          const formError = error.response?.data
          if (formError?.message === ErrorMagento.failCredentials) {
            toast.error('Email hoặc Mật khẩu không hợp lệ!')
          }
        } else {
          toast.error('Có lỗi xảy ra! Vui lòng thử lại.')
        }
      }
    })
  })

  const meta = generateMetaSEO({
    title: 'Ông Bà Yêu',
    template: 'Đăng Nhập',
    description:
      'Ông Bà Yêu là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`OBY, Ông Bà Yêu, ongbayeu.com`],
    og_image_alt: 'Ông Bà Yêu',
    slug: '/dang-nhap'
  })

  return (
    <>
      <OBYSeo {...meta} />
      <div className='pt-6 @992:pt-10'>
        <div className='container'>
          <h2 className='fs-20 @992:fs-26 text-center font-bold text-oby-green'>Đăng nhập</h2>
          <form
            noValidate
            onSubmit={handleSubmitLogin}
            className='mt-7.5 @768:max-w-[500px] mx-auto pb-15 border-b border-b-oby-DFDFDF'
          >
            <Input
              type='email'
              placeholder='Địa chỉ email'
              name='email'
              errorMessage={errors.email?.message}
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
            <OBYButton
              variant='link'
              size='link'
              asChild
              className={cn('@768:mt-4.5 mt-4 flex ml-auto @768:fs-16 fs-14')}
            >
              <OBYLink href={hrefPath.home} title='Quên mật khẩu?'>
                Quên mật khẩu?
              </OBYLink>
            </OBYButton>
            <AsyncButton type='submit' isLoading={loginMutation.isLoading} className={cn('w-full fs-16 mt-6')}>
              Đăng nhập
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
            Bạn chưa có tài khoản?{' '}
            <OBYButton variant='link' size='link' asChild>
              <OBYLink
                href={queryRedirect !== hrefPath.home ? hrefPath.signup + `?cb=${queryRedirect}` : hrefPath.signup}
              >
                Đăng ký ngay
              </OBYLink>
            </OBYButton>
          </p>
        </div>
      </div>
    </>
  )
}
