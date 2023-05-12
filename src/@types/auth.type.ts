/* eslint-disable @typescript-eslint/no-empty-interface */
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

export interface CustomerMe {
  customer: Customer
  password: string
  redirectUrl: string
}

export interface Customer {
  id: number
  group_id: number
  default_billing: string
  default_shipping: string
  confirmation: string
  created_at: string
  updated_at: string
  created_in: string
  dob: string
  email: string
  firstname: string
  lastname: string
  middlename: string
  prefix: string
  suffix: string
  gender: number
  store_id: number
  taxvat: string
  website_id: number
  addresses?: Address[]
  disable_auto_group_change: number
  extension_attributes: ExtensionAttributes3
  custom_attributes: CustomAttribute2[]
}

export interface Address {
  id?: number
  customer_id?: number
  region: Region
  region_id?: number
  country_id: string
  street: string[]
  company?: string
  telephone: string
  fax?: string
  postcode: string
  city: string
  firstname: string
  lastname: string
  middlename?: string
  prefix?: string
  suffix?: string
  vat_id?: string
  default_shipping: boolean
  default_billing: boolean
  extension_attributes?: ExtensionAttributes2
  custom_attributes?: CustomAttribute[]
}

export interface Region {
  region_code: string
  region: string
  region_id?: number
  extension_attributes?: ExtensionAttributes
}

export interface ExtensionAttributes {}

export interface ExtensionAttributes2 {}

export interface CustomAttribute {
  attribute_code: string
  value: string
}

export interface ExtensionAttributes3 {
  company_attributes: CompanyAttributes
  assistance_allowed: number
  is_subscribed: boolean
}

export interface CompanyAttributes {
  customer_id: number
  company_id: number
  job_title: string
  status: number
  telephone: string
  extension_attributes: ExtensionAttributes4
}

export interface ExtensionAttributes4 {}

export interface CustomAttribute2 {
  attribute_code: string
  value: string
}

export interface BodyUpdate {
  customer: {
    default_billing?: string
    default_shipping?: string
    confirmation?: string
    created_at?: string
    updated_at?: string
    created_in?: string
    dob?: string
    email?: string
    firstname?: string
    lastname?: string
    middlename?: string
    prefix?: string
    suffix?: string
    gender?: number
    store_id?: number
    taxvat?: string
    website_id?: number
    addresses?: Address[]
    disable_auto_group_change?: number
    extension_attributes?: ExtensionAttributes3
    custom_attributes?: CustomAttribute2[]
  }
  password?: string
  redirectUrl?: string
}
