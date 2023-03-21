import http from '@/libs/http'

const categoryApi = {
  GetCategoryList() {
    return http.get('/V1/categories')
  }
}

export default categoryApi
