import { SITE_URL } from '@/constants/domain.constant'

export const generateBlogImage = (image: string) => {
  return `${SITE_URL}/media/mageplaza/blog/post/${image}`
}

export const generateCateNameById = (id: number) => {
  const arr = [
    {
      id: 2,
      name: 'Dinh dưỡng'
    },
    {
      id: 3,
      name: 'Đời sống'
    },
    {
      id: 4,
      name: 'Sức khỏe'
    }
  ]
  const category = arr.find((item) => item.id === id)

  if (category) {
    return category.name
  }
}
