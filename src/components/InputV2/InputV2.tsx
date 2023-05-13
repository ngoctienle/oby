import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form'

import twclsx from '@/libs/twclsx'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const { type, onChange, className, classNameInput, classNameError, value = '', ...restParams } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = e.target.value

    const isNumber = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (isNumber || type !== 'number') {
      //Update LocalState value
      setLocalValue(valueFromInput)
      //Call field.onChange for updating into state of RHF
      field.onChange(e)
      //Running onChange callback from parents
      onChange && onChange(e)
    }
  }

  return (
    <>
      <div className={twclsx('relative', className)}>
        <input
          type={type}
          className={twclsx(
            classNameInput,
            'py-2.5 @768:px-4 px-3 border border-oby-DFDFDF rounded-2.5 @768:rounded-4 bg-white outline-none placeholder:fs-14 @768:placeholder:fs-16 placeholder:text-oby-9A9898 w-full h-full focus:border-oby-primary transition-colors disabled:bg-oby-F6F7F8 disabled:cursor-not-allowed @992:fs-16 fs-14',
            (fieldState.error?.message?.length === 0 || fieldState.error?.message) &&
              'border-oby-red focus:border-oby-red'
          )}
          {...restParams}
          {...field}
          onChange={handleChange}
          value={value || localValue}
        />
      </div>
      {fieldState.error?.message && (
        <p className={twclsx(classNameError, 'mt-2 @768:mt-2.5 fs-12 text-oby-red @768:fs-14')}>
          {fieldState.error?.message}
        </p>
      )}
    </>
  )
}

export default InputV2
