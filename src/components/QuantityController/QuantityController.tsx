import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

import InputNumber, { InputNumberProps } from '@/components/InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onTyping?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
  isLoading?: boolean
}

export default function QuantityController({
  max,
  isLoading,
  onIncrease,
  onDecrease,
  onTyping,
  onFocusOut,
  classNameWrapper = '',
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onTyping && onTyping(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(e.target.value))
  }

  return (
    <div className={'flex items-center rounded-4 border border-oby-DFDFDF ' + classNameWrapper}>
      <button
        className={`flex items-center justify-center h-6 w-6 disabled:cursor-not-allowed`}
        onClick={decrease}
        disabled={localValue === 1 || isLoading}
      >
        <MinusIcon className={`h-5 w-5 ${localValue === 1 && 'text-oby-DFDFDF'}`} />
      </button>
      <InputNumber
        className='flex w-[50px] flex-shrink-0 items-center overflow-hidden '
        classNameError='hidden'
        classNameInput='px-2 w-full h-full border-none bg-transparent text-center outline-none fs-18 text-oby-primary'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value || localValue}
        {...rest}
      />
      <button
        className='h-6 w-6 flex items-center justify-center disabled:cursor-not-allowed'
        onClick={increase}
        disabled={localValue === max || isLoading}
      >
        <PlusIcon className={`h-5 w-5 ${localValue === max && 'text-oby-DFDFDF'}`} />
      </button>
    </div>
  )
}
