import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { RegisterBodyRequest } from '@/@types/auth.type'
import { ResponseError } from '@/@types/magento.type'

import { ErrorMagento, FormSchema, formSchema } from '@/libs/rules'

import { isAxiosError } from '@/helpers/auth'

import authApi from '@/apis/magento/auth.api'

import { hrefPath } from '@/constants/href.constant'

import Input from '@/components/Input'
import { OBYButton } from '@/components/UI/Element'

export default function Signup() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: RegisterBodyRequest) => authApi.RegisterAccount(body)
  })

  const handleSubmitRegister = handleSubmit((data) => {
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
        router.push(hrefPath.login)
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

  return (
    <div className='pt-6'>
      <div className='container'>
        <h2 className='fs-20 text-center font-bold text-oby-green'>Đăng Ký</h2>
        <form noValidate onSubmit={handleSubmitRegister} className='mt-10'>
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
            className='mt-4'
            errorMessage={errors.firstname?.message}
            register={register}
          />
          <Input
            type='text'
            placeholder='Họ và Tên lót'
            name='lastname'
            className='mt-4'
            errorMessage={errors.lastname?.message}
            register={register}
          />
          <Input
            type='password'
            placeholder='Mật khẩu'
            name='password'
            className='mt-4'
            errorMessage={errors.password?.message}
            register={register}
          />
          <OBYButton
            className='border border-transparent bg-oby-primary text-white fs-16 w-full py-2.5 rounded-4 mt-7.5'
            type='submit'
          >
            Đăng Ký
          </OBYButton>
        </form>
      </div>
    </div>
  )
}
