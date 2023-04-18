import atob from 'atob'

export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    return null
  }
}

export const validateEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regex.test(String(email).toLocaleLowerCase())
}

export const handleError = (key: string, value: string): string => {
  let errorMessage = ''
  if (value.trim().length === 0) {
    return 'Trường này là bắt buộc!'
  }

  switch (key) {
    case 'email':
      if (!validateEmail(value)) {
        errorMessage = 'Email không đúng định dạng!'
      } else {
        errorMessage = ''
      }
      break
    case 'password':
      if (value.length <= 6) {
        errorMessage = 'Password phải nhiều hơn 6 ký tự'
      } else {
        errorMessage = ''
      }
      break
  }

  return errorMessage
}
