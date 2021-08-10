import React, { VFC, memo, FormEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectSchedule, setEditedSchedule } from '../slices/scheduleSlice'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { selectUser } from '../slices/userSlice'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'

import { Box, Button, Center, Input, Textarea, VStack } from '@chakra-ui/react'

registerLocale('ja', ja)

const ScheduleEditForm: VFC = () => {
  const dispatch = useAppDispatch()
  const editedSchedule = useAppSelector(selectSchedule)
  const User = useAppSelector(selectUser)
  const { createScheduleMutation, updateScheduleMutation } = useMutateSchedule()
  const [startDate, setStartDate] = useState(new Date())
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedSchedule.id === null)
      createScheduleMutation.mutate(editedSchedule)
    else {
      updateScheduleMutation.mutate(editedSchedule)
    }
  }
  if (updateScheduleMutation.isLoading) {
    return <span>Updating...</span>
  }
  if (createScheduleMutation.isLoading) {
    return <span>Creating...</span>
  }
  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Textarea
          className="mb-3"
          bg="white"
          placeholder="予定作成"
          type="text"
          onChange={(e) =>
            dispatch(
              setEditedSchedule({
                ...editedSchedule,
                title: e.target.value,
                user_id: User.id,
              })
            )
          }
          value={editedSchedule.title}
        />
        <Center>
          <DatePicker
            className="mb-3 px-3 py-2 border border-gray-300 rounded-md"
            selected={
              editedSchedule.schedule_date
                ? new Date(editedSchedule.schedule_date)
                : new Date()
            }
            onChange={(date) =>
              dispatch(
                setEditedSchedule({
                  ...editedSchedule,
                  schedule_date: date,
                })
              )
            }
            locale="ja"
            timeInputLabel="Time:"
            timeIntervals={15}
            showTimeSelect
            dateFormat="yyyy/MM/dd aa hh:mm"
          />
        </Center>
        <Center>
          <button
            className="disabled:opacity-40 mb-10 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
            disabled={!editedSchedule.title || !editedSchedule.schedule_date}
          >
            {editedSchedule.id === null ? '予定作成' : '予定変更'}
          </button>
        </Center>
      </form>
    </Box>
  )
}

export const ScheduleEditFormMemo = memo(ScheduleEditForm)
