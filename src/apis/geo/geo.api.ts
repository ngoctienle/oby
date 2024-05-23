import geoAPI from '@/vendors/geo.vendor'
import { promises as fs } from 'fs'
import path from 'path'

import { districts } from '@/constants/districts'
import { provines } from '@/constants/provines'
import { wards } from '@/constants/wards'

export async function fetchJsonFile(fileName: string) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'public/json/')
    const fileContents = await fs.readFile(jsonDirectory + fileName, 'utf8')

    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Failed to fetch the JSON file:', error)
    return null
  }
}

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
