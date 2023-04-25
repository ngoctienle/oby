import geoAPI from '@/vendors/geo.vendor'

import { District, Provine } from '@/@types/geo.type'

const GeoAPI = {
  GetProvine() {
    return geoAPI.get<Provine[]>('p/')
  },
  SearchProvine(nameProvine: string) {
    return geoAPI.get(`p/search/?q=${nameProvine}`)
  },
  GetDistrict(codeProvine: number) {
    return geoAPI.get<Provine>(`p/${codeProvine}?depth=2`)
  },
  SearchDistrict(nameDistrict: string) {
    return geoAPI.get(`d/search/?q=${nameDistrict}`)
  },
  GetWard(codeDistrict: number) {
    return geoAPI.get<District>(`d/${codeDistrict}?depth=2`)
  }
}

export default GeoAPI
