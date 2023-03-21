import axios, { type AxiosInstance } from 'axios'

class HTTP {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://13.212.189.157/rest/all',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer iik22r1zsip6cr77v7nukhoxntv9yc4g'
      }
    })
  }
}

const http = new HTTP().instance

export default http
