import axios, { type AxiosInstance } from 'axios'

class HTTP {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: '',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new HTTP().instance

export default http
