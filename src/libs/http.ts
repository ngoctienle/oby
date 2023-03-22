import axios, { type AxiosInstance } from 'axios'

class HTTP {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://13.212.189.157/rest/all/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer iik22r1zsip6cr77v7nukhoxntv9yc4g`
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        // add any authorization header or other request interceptors
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

const http = new HTTP().instance

export default http
