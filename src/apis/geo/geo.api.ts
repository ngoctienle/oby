import geoAPI from '@/vendors/geo.vendor'

import { districts } from '@/constants/districts'
import { provines } from '@/constants/provines'
import { wards } from '@/constants/wards'

const GeoAPI = {
  async GetProvine() {
    return provines
  },
  SearchProvine(nameProvine: string) {
    return geoAPI.get(`p/search/?q=${nameProvine}`)
  },
  async GetDistrict(codeProvine: number) {
    return districts.filter((district) => district.province_code === codeProvine)
  },
  SearchDistrict(nameDistrict: string) {
    return geoAPI.get(`d/search/?q=${nameDistrict}`)
  },
  GetWard(codeDistrict: number) {
    return wards.filter((ward) => ward.district_code === codeDistrict)
  }
}

export default GeoAPI
