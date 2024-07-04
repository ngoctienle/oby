import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { ResetPWRequest } from '@/@types/auth.type'

import { FormSchema, formSchema } from '@/libs/rules'
import { generateMetaSEO } from '@/libs/seo'
import { cn } from '@/libs/utils'

import authApi from '@/apis/magento/auth.api'

import { hrefPath } from '@/constants/href.constant'

import Input from '@/components/Input'
import { AsyncButton } from '@/components/UI/Button'
import { OBYSeo } from '@/components/UI/OBYSeo'

type FormResetSchema = Pick<FormSchema, 'password' | 'confirm_password'>
const resetFormSchema = formSchema.pick(['password', 'confirm_password'])

interface ResetPWProps {
  id: string
  token: string
  isValid: boolean
}

interface IParams extends ParsedUrlQuery {
  id: string
  token: string
}

export default function ResetPwPage({ id, token, isValid: isValidServer }: ResetPWProps) {
  const [isValid, setIsValid] = useState(isValidServer)
  const router = useRouter()
  const { data: customerRes } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => authApi.FetchCustomer(id),
    enabled: isValid
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormResetSchema>({
    resolver: yupResolver(resetFormSchema)
  })

  const resetMutation = useMutation({
    mutationFn: (body: ResetPWRequest) => authApi.ResetPassword(body)
  })

  const handleSubmitResetPW = handleSubmit((data) => {
    const email = customerRes?.data.email as string
    const { password: newPassword } = data
    const body: ResetPWRequest = {
      email,
      newPassword,
      resetToken: token
    }
    resetMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Mật khẩu của bạn được đổi thành công!')
        router.push(hrefPath.login)
      },
      onError: () => {
        setIsValid(false)
      }
    })
  })
  const meta = generateMetaSEO({
    title: 'AGRIAMAZING',
    template: 'Tạo Mật Khẩu',
    description:
      'AGRIAMAZING là một cửa hàng trực tuyến chuyên cung cấp các sản phẩm tổng hợp nhằm phục vụ cho người cao tuổi cùng với dịch vụ hỗ trợ khách hàng đặc biệt, đem đến cho khách hàng một cuộc sống chất lượng nhất.',
    keywords: [`AMZ, AGRIAMAZING, agriamazing.com`],
    og_image_alt: 'AGRIAMAZING',
    slug: '/tao-mat-khau'
  })
  return (
    <>
      <OBYSeo {...meta} />
      <div className='pt-6 @992:pt-10 bg-white'>
        <div className='container'>
          <h2 className='fs-20 @992:fs-26 text-center font-bold text-black'>Nhập mật khẩu mới</h2>
          <p className='text-center mt-4 text-oby-9A9898'>Vui lòng nhập mật khẩu mới của bạn</p>
          <form noValidate onSubmit={handleSubmitResetPW} className='mt-7.5 @768:max-w-[500px] mx-auto pb-15'>
            {!isValid && (
              <div className='px-4 py-1 text-oby-red/70 text-center bg-oby-red/20 @768:mb-4.5 mb-4 rounded-2.5'>
                Token của bạn không hợp lệ hoặc đã hết hạn!
              </div>
            )}
            <Input
              type='password'
              placeholder='Mật khẩu'
              name='password'
              errorMessage={errors.password?.message}
              register={register}
            />
            <Input
              type='password'
              placeholder='Nhập lại Mật khẩu'
              name='confirm_password'
              className='@768:mt-4.5 mt-4'
              errorMessage={errors.confirm_password?.message}
              register={register}
            />
            <AsyncButton
              isGradient
              type='submit'
              isLoading={resetMutation.isLoading}
              isError={!isValid}
              className={cn('w-full fs-16 mt-6')}
            >
              XÁC NHẬN
            </AsyncButton>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ResetPWProps> = async ({ query }) => {
  const { id, token } = query as IParams

  try {
    const { data: isValid } = await authApi.ValidateToken(id as string, token as string)
    return {
      props: {
        id,
        token,
        isValid
      }
    }
  } catch (error) {
    return {
      props: {
        id,
        token,
        isValid: false
      }
    }
  }
}
