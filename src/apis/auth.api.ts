import http from '@/libs/http'

const authApi = {
  RegisterAccount(body: { email: string; password: string }) {
    return http.post('/register', body)
  }
}

export default authApi
