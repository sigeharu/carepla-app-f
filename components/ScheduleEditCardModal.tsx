import React, { FormEvent, memo, useState, useRef, VFC } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Schedule } from '../types/types'
import dayjs from 'dayjs'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { useMessage } from '../hooks/useMessage'
import { selectSchedule, setEditedSchedule } from '../slices/scheduleSlice'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'

export interface Props {
  selectedUpdateItem: number
  onCloseUpdateDialog: () => void
  schedule: Schedule
}

const ScheduleEditCardModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedSchedule = useAppSelector(selectSchedule)
  const User = useAppSelector(selectUser)
  const { selectedUpdateItem, onCloseUpdateDialog, schedule } = props
  const { updateScheduleMutation, deleteScheduleMutation } = useMutateSchedule()
  const { showMessage } = useMessage()
  const initialRef = useRef()
  const [customDateFormat, setCustomDataFormat] = useState(
    'yyyy/MM/dd aa hh:mm'
  )
  const onClickTimeNoneHandler = () => {
    setCustomDataFormat('yyyy/MM/dd')
    dispatch(
      setEditedSchedule({
        ...schedule,
        time_none: true,
      })
    )
  }
  const onClickTimeHandler = () => {
    setCustomDataFormat('yyyy/MM/dd aa hh:mm')
    dispatch(
      setEditedSchedule({
        ...schedule,
        time_none: false,
      })
    )
  }
  const ChangeButton = () => {
    if (customDateFormat === 'yyyy/MM/dd aa hh:mm') {
      return <Button onClick={onClickTimeNoneHandler}>時間あり</Button>
    } else {
      return <Button onClick={onClickTimeHandler}>時間なし</Button>
    }
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateScheduleMutation.mutate(editedSchedule)
    showMessage({ title: '予定を更新しました!', status: 'success' })
    onCloseUpdateDialog()
  }

  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInRight"
        initialFocusRef={initialRef}
        isOpen={schedule.id === selectedUpdateItem}
        onClose={onCloseUpdateDialog}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">予定変更画面</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitHandler}>
            <ModalBody>
              <Box>
                <FormControl>
                  <Textarea
                    ref={initialRef}
                    className="mb-3"
                    bg="white"
                    placeholder="予定作成"
                    type="textarea"
                    onChange={(e) =>
                      dispatch(
                        setEditedSchedule({
                          ...editedSchedule,
                          title: e.target.value,
                        })
                      )
                    }
                    value={editedSchedule.title}
                  />
                </FormControl>
                <Center>
                  <HStack>
                    <DatePicker
                      className="px-3 py-2 border border-gray-300 rounded-md"
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
                      dateFormat={customDateFormat}
                    />
                    <ChangeButton />
                  </HStack>
                </Center>
              </Box>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Box>
                  <button
                    className="disabled:opacity-40 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
                    disabled={
                      !editedSchedule.title || !editedSchedule.schedule_date
                    }
                    type="submit"
                  >
                    予定変更
                  </button>
                </Box>
                <Button colorScheme="gray" onClick={onCloseUpdateDialog}>
                  やめる
                </Button>
              </HStack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
export const ScheduleEditCardModalMemo = memo(ScheduleEditCardModal)
