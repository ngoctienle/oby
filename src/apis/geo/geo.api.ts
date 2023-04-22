import geoAPI from '@/vendors/geo.vendor'

import { District, Provine } from '@/@types/geo.type'

const GeoAPI = {
  GetProvine() {
    return geoAPI.get<Provine[]>('p/')
  },
  GetDistrict(codeProvine: number) {
    return geoAPI.get<Provine>(`p/${codeProvine}?depth=2`)
  },
  GetWard(codeDistrict: number) {
    return geoAPI.get<District>(`d/${codeDistrict}?depth=2`)
  }
}

export default GeoAPI
