import magentoAPI from '@/vendors/magento.vendor'

import { BodyUpdate, Customer, LoginBodyRequest, RegisterBodyRequest, ResetPWRequest } from '@/@types/auth.type'

const authApi = {
  RegisterAccount(body: RegisterBodyRequest) {
    return magentoAPI.post('V1/customers', body)
  },
  LoginAccount(body: LoginBodyRequest) {
    return magentoAPI.post('V1/integration/customer/token', body)
  },
  FetchMe(token: string) {
    return magentoAPI.get<Customer>('V1/customers/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  UpdateMe(id: number, body: BodyUpdate) {
    return magentoAPI.put<Customer>(`V1/customers/${id}`, body, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  ForgotPassword(email: string) {
    return magentoAPI.put<boolean>('V1/customers/password', { email, template: 'email_reset', websiteId: 1 })
  },
  ValidateToken(id: string, token: string) {
    return magentoAPI.get<boolean>(`V1/customers/${id}/password/resetLinkToken/${token}`)
  },
  FetchCustomer(id: string) {
    return magentoAPI.get<Customer>(`V1/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRECT_TOKEN}`
      }
    })
  },
  ResetPassword(body: ResetPWRequest) {
    return magentoAPI.post<boolean>('V1/customers/resetPassword', body)
  }
}

export default authApi
