interface InputData {
  value: string
  error: string
}

export interface InitialForm {
  [key: string]: InputData
}

export interface RegisterBodyRequest {
  customer: CustomerRequest
  password: string
}

export interface LoginBodyRequest {
  username: string
  password: string
}

interface CustomerRequest {
  email: string
  firstname: string
  lastname: string
}
