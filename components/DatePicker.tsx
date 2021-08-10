import 'react-datepicker/dist/react-datepicker.css'

import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Control, Controller, Path } from 'react-hook-form'

type Props<T> = {
  label: string
  name: Path<T>
  error?: string
  control: Control<T>
  timeIntervals?: number
}

export const DatePicker = <T,>({
  label,
  name,
  control,
  error,
  timeIntervals = 15,
}: Props<T>) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeSelect
              timeIntervals={timeIntervals}
              onChange={onChange}
              selected={value as Date}
            />
          )}
        />
      </div>
      <span>{error}</span>
    </>
  )
}
