import React, { VFC, memo, FormEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectSchedule, setEditedSchedule } from '../slices/scheduleSlice'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { selectUser } from '../slices/userSlice'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'

import {
  Box,
  Button,
  Center,
  Checkbox,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { isDisabled } from '@chakra-ui/utils'

registerLocale('ja', ja)

const ScheduleEditForm: VFC = () => {
  const dispatch = useAppDispatch()
  const editedSchedule = useAppSelector(selectSchedule)
  const User = useAppSelector(selectUser)
  const { createScheduleMutation, updateScheduleMutation } = useMutateSchedule()
  const [customDateFormat, setCustomDataFormat] = useState(
    'yyyy/MM/dd aa hh:mm'
  )
  const onClickTimeNoneHandler = () => {
    setCustomDataFormat('yyyy/MM/dd')
    dispatch(
      setEditedSchedule({
        ...editedSchedule,
        time_none: true,
        takeover: true,
      })
    )
  }
  const onClickTimeHandler = () => {
    setCustomDataFormat('yyyy/MM/dd aa hh:mm')
    dispatch(
      setEditedSchedule({
        ...editedSchedule,
        time_none: false,
        takeover: false,
      })
    )
  }
  const ChangeButton = () => {
    if (customDateFormat === 'yyyy/MM/dd aa hh:mm') {
      return <Button onClick={onClickTimeNoneHandler}>時間設定あり</Button>
    } else {
      return <Button onClick={onClickTimeHandler}>時間設定なし</Button>
    }
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createScheduleMutation.mutate(editedSchedule)
    onClickTimeHandler()
  }
  if (createScheduleMutation.isLoading) {
    return <span>Creating...</span>
  }
  return (
    <VStack>
      <form onSubmit={submitHandler}>
        <Textarea
          className="mb-2"
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
        <DatePicker
          className="px-12 py-2 border text-center  border-gray-300 rounded-md"
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
          timeInputLabel="時間:"
          timeIntervals={15}
          showTimeSelect
          dateFormat={customDateFormat}
        />
        <HStack spacing={2} mt={2}>
          <ChangeButton />
          <Button>週間予定に設定</Button>
        </HStack>
        <Center>
          <Button
            mt={2}
            textColor="white"
            bg="orange.400"
            disabled={!editedSchedule.title || !editedSchedule.schedule_date}
          >
            予定作成
          </Button>
        </Center>
      </form>
    </VStack>
  )
}

export const ScheduleEditFormMemo = memo(ScheduleEditForm)
