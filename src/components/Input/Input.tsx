import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

import twclsx from '@/libs/twclsx'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  errorMessage,
  classNameError,
  classNameInput,
  className,
  name,
  register,
  rules,
  ...restParams
}: IInputProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const registerResult = register && name ? register(name, rules) : null

  const toggleVisible = () => {
    setVisible((prev) => !prev)
  }

  const handleType = () => {
    if (restParams.type === 'password') {
      return visible ? 'text' : 'password'
    }
    return restParams.type
  }

  return (
    <>
      <div className={twclsx('relative', className)}>
        <input
          className={twclsx(
            classNameInput,
            'py-2.5 @768:px-4 px-3 border border-oby-DFDFDF rounded-2.5 @768:rounded-4 bg-white outline-none placeholder:fs-14 @768:placeholder:fs-16 placeholder:text-oby-9A9898 w-full h-full focus:border-oby-primary transition-colors',
            (errorMessage?.length === 0 || errorMessage) && 'border-oby-red focus:border-oby-red'
          )}
          {...registerResult}
          {...restParams}
          type={handleType()}
        />
        {restParams.type === 'password' && visible && (
          <EyeIcon
            className='absolute w-6 h-6 top-1/2 -translate-y-1/2 cursor-pointer right-3 @768:right-4'
            type='button'
            onClick={toggleVisible}
          />
        )}
        {restParams.type === 'password' && !visible && (
          <EyeSlashIcon
            className='absolute w-6 h-6 top-1/2 -translate-y-1/2 cursor-pointer right-3 @768:right-4'
            type='button'
            onClick={toggleVisible}
          />
        )}
      </div>
      {errorMessage && (
        <p className={twclsx(classNameError, 'mt-2 @768:mt-2.5 fs-12 text-oby-red @768:fs-14')}>{errorMessage}</p>
      )}
    </>
  )
}
