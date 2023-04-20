import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { LoginBodyRequest } from '@/@types/auth.type'
import { ResponseError } from '@/@types/magento.type'

import { useAuthen } from '@/hooks'

import { ErrorMagento, FormSchema, formSchema } from '@/libs/rules'
import { useGlobalState } from '@/libs/state'

import { isAxiosError } from '@/helpers/auth'

import authApi from '@/apis/magento/auth.api'
import cartApi from '@/apis/magento/cart.api'

import { hrefPath } from '@/constants/href.constant'

import Input from '@/components/Input'
import { OBYButton, OBYLink } from '@/components/UI/Element'

type FormLoginSchema = Pick<FormSchema, 'email' | 'password'>
const loginFormSchema = formSchema.pick(['email', 'password'])

export default function Login() {
  useAuthen()
  const [, setToken] = useGlobalState('token')
  const [guestCartId] = useGlobalState('guestCartId')
  const [, setUser] = useGlobalState('user')
  const [, setCartId] = useGlobalState('cartId')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
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

        Cookies.set('token', token)
        Cookies.set('user', JSON.stringify(meData))
        Cookies.set('cartId', guestCartId as string)

        setToken(data.data)
        setUser(meData)
        setCartId(guestCartId)
        toast.success('Đăng nhập thành công!')
        router.push('/')
      },
      onError: (error) => {
        if (isAxiosError<ResponseError>(error)) {
          const formError = error.response?.data
          if (formError?.message === ErrorMagento.failCredentials) {
            setError('email', {
              message: ''
            })
            setError('password', {
              message: 'Email hoặc Mật khẩu không hợp lệ!',
              type: 'Server'
            })
          }
        } else {
          toast.error('Có lỗi xảy ra! Vui lòng thử lại.')
        }
      }
    })
  })

  return (
    <div className='pt-6'>
      <div className='container'>
        <h2 className='fs-20 text-center font-bold text-oby-green'>Đăng Nhập</h2>
        <form noValidate onSubmit={handleSubmitLogin} className='mt-10'>
          <Input
            type='email'
            placeholder='Email'
            name='email'
            errorMessage={errors.email?.message}
            register={register}
          />
          <Input
            type='password'
            placeholder='Mật khẩu'
            name='password'
            className='mt-4'
            errorMessage={errors.password?.message}
            register={register}
          />{' '}
          <OBYButton
            className='border border-transparent bg-oby-primary text-white fs-16 w-full py-2.5 rounded-4 mt-7.5'
            type='submit'
          >
            Đăng Nhập
          </OBYButton>
          <OBYLink href={hrefPath.signup}>Đi tới đăng ký</OBYLink>
        </form>
      </div>
    </div>
  )
}
