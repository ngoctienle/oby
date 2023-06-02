import { SITE_URL } from '@/constants/domain.constant'

export const generateBlogImage = (image: string) => {
  return `${SITE_URL}/media/mageplaza/blog/post/${image}`
}

export const generateCateNameById = (id: number) => {
  const arr = [
    {
      id: 5,
      name: 'Dinh dưỡng và sức khỏe'
    },
    {
      id: 6,
      name: 'Thông tin y dược'
    },
    {
      id: 7,
      name: 'Bệnh người già'
    },
    {
      id: 8,
      name: 'Tin tức'
    },
    {
      id: 9,
      name: 'Thời trang'
    },
    {
      id: 10,
      name: 'Làm đẹp'
    },
    {
      id: 11,
      name: 'Nhịp sống xưa'
    }
  ]
  const category = arr.find((item) => item.id === id)

  if (category) {
    return category.name
  }
}
