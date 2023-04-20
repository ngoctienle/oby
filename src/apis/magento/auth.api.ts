import magentoAPI from '@/vendors/magento.vendor'

import { LoginBodyRequest, RegisterBodyRequest } from '@/@types/auth.type'

const authApi = {
  RegisterAccount(body: RegisterBodyRequest) {
    return magentoAPI.post('V1/customers', body)
  },
  LoginAccount(body: LoginBodyRequest) {
    return magentoAPI.post('V1/integration/customer/token', body)
  },
  FetchMe(token: string) {
    return magentoAPI.get('V1/customers/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export default authApi
