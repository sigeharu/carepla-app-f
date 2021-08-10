import { DatePicker } from '../components/DatePicker'
import { useForm } from 'react-hook-form'

type FormValues = {
  datetime: string
}

const EditPage = () => {
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>()

  return (
    <DatePicker
      label="datetime"
      name="datetime"
      control={control}
      error={errors.datetime?.message}
    />
  )
}

export default EditPage
