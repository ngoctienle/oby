import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'firstname'
    | 'lastname'
    | 'confirm_password'
    | 'fullname'
    | 'phone'
    | 'remark']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng nhập Email của bạn!'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng!'
    },
    maxLength: {
      value: 100,
      message: 'Độ dài Email vượt quá 100 ký tự!'
    },
    minLength: {
      value: 5,
      message: 'Độ dài Email phải lớn hơn hoặc bằng 5 ký tự!'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng nhập Mật khẩu của bạn!'
    },
    maxLength: {
      value: 100,
      message: 'Độ dài Mật khẩu vượt quá 100 ký tự!'
    },
    minLength: {
      value: 5,
      message: 'Độ dài Mật khẩu phải lớn hơn hoặc bằng 5 ký tự!'
    }
  },
  confirm_password: {
    required: { value: true, message: 'Vui lòng nhập lại Mật khẩu của bạn!' },
    maxLength: {
      value: 100,
      message: 'Độ dài phải dưới 100 ký tự!'
    },
    minLength: {
      value: 8,
      message: 'Độ dài phải từ 8 ký tự!'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Vui lòng nhập chính xác Mật khẩu của bạn!'
        : undefined
  },
  firstname: {
    required: {
      value: true,
      message: 'Vui lòng nhập Tên của bạn!'
    },
    maxLength: {
      value: 100,
      message: 'Độ dài Tên vượt quá 100 ký tự!'
    },
    minLength: {
      value: 3,
      message: 'Độ dài Tên phải lớn hơn hoặc bằng 3 ký tự!'
    }
  },
  lastname: {
    required: {
      value: true,
      message: 'Vui lòng nhập Họ và Tên lót của bạn!'
    },
    maxLength: {
      value: 100,
      message: 'Độ dài Họ và Tên lót vượt quá 100 ký tự!'
    },
    minLength: {
      value: 3,
      message: 'Độ dài Họ và Tên lót phải lớn hơn hoặc bằng 3 ký tự!'
    }
  },
  phone: {
    required: {
      value: true,
      message: 'Vui lòng nhập số điện thoại của bạn!'
    },
    pattern: {
      value: /^(?:(?:\+?84|0)(?:\s|\-|\.)?)?\(?([1|2|3|5|7|8|9]{2})\)?(?:\s|\-|\.)?([4|6|8|9]{1})([0-9]{7})$/,
      message: 'Số điện thoại không hợp lệ!'
    }
  },
  fullname: {
    required: {
      value: true,
      message: 'Vui lòng nhập Họ và Tên của bạn!'
    },
    maxLength: {
      value: 100,
      message: 'Độ dài Họ và Tên vượt quá 100 ký tự!'
    },
    minLength: {
      value: 3,
      message: 'Độ dài Họ và Tên phải lớn hơn hoặc bằng 3 ký tự!'
    }
  },
  remark: {
    required: {
      value: true,
      message: 'Vui lòng nhập Ghi chú của bạn!'
    },
    maxLength: {
      value: 300,
      message: 'Độ dài Ghi chú vượt quá 300 ký tự!'
    }
  }
})

const handleYupConfirmPw = (refString: string) => {
  return yup
    .string()
    .required('Vui lòng nhập lại Mật khẩu của bạn!')
    .min(8, 'Độ dài phải từ 8 ký tự!')
    .max(100, 'Độ dài phải dưới 100 ký tự!')
    .oneOf([yup.ref(refString)], 'Vui lòng nhập chính xác Mật khẩu của bạn!')
}

export const formSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập Email của bạn!')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email không đúng định dạng!'
    )
    .min(5, 'Độ dài phải từ 5 ký tự!')
    .max(100, 'Độ dài phải dưới 100 ký tự!'),
  password: yup
    .string()
    .required('Vui lòng nhập Mật khẩu của bạn!')
    .min(8, 'Độ dài phải từ 8 ký tự!')
    .max(100, 'Độ dài phải dưới 100 ký tự!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`-]).+$/,
      'Mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!'
    ),
  confirm_password: handleYupConfirmPw('password'),
  firstname: yup
    .string()
    .required('Vui lòng nhập Tên của bạn!')
    .trim()
    .min(2, 'Độ dài không hợp lệ!')
    .max(100, 'Độ dài không hợp lệ!'),
  lastname: yup
    .string()
    .required('Vui lòng nhập Họ của bạn!')
    .trim()
    .min(2, 'Độ dài không hợp lệ!')
    .max(100, 'Độ dài không hợp lệ!')
})

export type FormSchema = yup.InferType<typeof formSchema>

export const ErrorMagento = {
  emailExisted: 'A customer with the same email address already exists in an associated website.',
  failCredentials:
    'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.',
  failCoupon: "The coupon code isn't valid. Verify the code and try again."
}

export const fillPaymentForm = yup.object({
  fullname: yup
    .string()
    .required('Vui lòng nhập Họ và tên của bạn!')
    .min(2, 'Độ dài không hợp lệ!')
    .matches(
      /^[^\d`~!@#$%^&*()+=|\\\[\]{};':"<>?,./_]+(\s+[^\d`~!@#$%^&*()+=|\\\[\]{};':"<>?,./_]+){1,}$/u,
      'Vui lòng nhập đầy đủ Họ và tên!'
    )
    .max(160, 'Độ dài không hợp lệ!'),
  email: yup
    .string()
    .required('Vui lòng nhập Email của bạn!')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email không đúng định dạng!'
    )
    .min(5, 'Độ dài phải từ 5 ký tự!')
    .max(100, 'Độ dài phải dưới 100 ký tự!'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại của bạn!')
    .matches(/^\+?[0-9]{10,12}$/, 'Số điện thoại không hợp lệ!'),
  provine: yup.string().required('Vui lòng chọn Tỉnh/Thành phố!'),
  district: yup.string().required('Vui lòng chọn Quận/Huyện!'),
  ward: yup.string().required('Vui lòng chọn Phường/Xã!'),
  address: yup.string().required('Vui lòng nhập địa chỉ cụ thể!').max(200, 'Độ dài tối đa 200 ký tự!'),
  note: yup.string()
})

export type FillPaymentForm = yup.InferType<typeof fillPaymentForm>

export const anotherForm = yup.object({
  coupon: yup.string().trim().required('Vui lòng nhập mã giảm giá!'),
  name: yup.string().trim().required()
})

export type AnotherForm = yup.InferType<typeof anotherForm>

export const contactForm = yup.object({
  fullname: yup
    .string()
    .required('Vui lòng nhập Họ và tên của bạn!')
    .min(2, 'Độ dài không hợp lệ!')
    .matches(
      /^[^\d`~!@#$%^&*()+=|\\\[\]{};':"<>?,./_]+(\s+[^\d`~!@#$%^&*()+=|\\\[\]{};':"<>?,./_]+){1,}$/u,
      'Vui lòng nhập đầy đủ Họ và tên!'
    )
    .max(160, 'Độ dài không hợp lệ!'),
  email: yup
    .string()
    .required('Vui lòng nhập Email của bạn!')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email không đúng định dạng!'
    )
    .min(5, 'Độ dài phải từ 5 ký tự!')
    .max(100, 'Độ dài phải dưới 100 ký tự!'),
  phone: yup
    .string()
    .required('Vui lòng nhập số điện thoại của bạn!')
    .matches(/^\+?[0-9]{10,12}$/, 'Số điện thoại không hợp lệ!'),
  remark: yup.string()
})

export type ContactForm = yup.InferType<typeof contactForm>
