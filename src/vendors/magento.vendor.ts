import axios, { type AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

class MagentoVendor {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = process.env.NEXT_PUBLIC_API_SECRECT_TOKEN || '9wg5kncv7eyj6u57u8f975c576puzi55'
    this.instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/rest/`,
      timeout: 10000
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (Cookies.get('token') && config.headers) {
          config.headers.Authorization = `Bearer ${Cookies.get('token')}`
          return config
        }
        // add any authorization header or other request interceptors
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // add any response interceptors like checking for 401 errors and refreshing tokens
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const magentoAPI = new MagentoVendor().instance

export default magentoAPI
