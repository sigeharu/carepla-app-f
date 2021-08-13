import { memo, useState, VFC } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Box, Button, Center, HStack, Text } from '@chakra-ui/react'
import { useAppSelector } from '../app/hooks'
import { Schedule } from '../types/types'
import dayjs from 'dayjs'
import { selectSchedule, setEditedSchedule } from '../slices/scheduleSlice'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { useMessage } from '../hooks/useMessage'
import { DeleteModalMemo } from './DeleteModal'

export interface Props {
  selectedItem: number
  onCloseDialog: () => void
  schedule: Schedule
}

const ScheduleCompletionModal: VFC<Props> = (props) => {
  const { selectedItem, onCloseDialog, schedule } = props
  const editedSchedule = useAppSelector(selectSchedule)
  const [selectedCompletionDeleteItem, setSelectedCompletionDeleteItem] =
    useState<number>(null)
  const { updateScheduleMutation, deleteScheduleMutation } = useMutateSchedule()
  const { showMessage } = useMessage()
  const onOpenDeleteDialog = (id: number) => {
    setSelectedCompletionDeleteItem(id)
  }
  const onCloseDeleteDialog = () => {
    setSelectedCompletionDeleteItem(null)
  }
  const onClickDeleteHandler = () => {
    deleteScheduleMutation.mutate(schedule.id)
    showMessage({ title: '予定を削除しました', status: 'success' })
  }
  const onClickUpdateHandler = () => {
    updateScheduleMutation.mutate({
      ...schedule,
      completion: false,
    })
    showMessage({ title: '予定を未完了に戻しました!', status: 'success' })
    onCloseDialog()
  }
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={schedule.id === selectedItem}
        onClose={onCloseDialog}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">完了した本日の予定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {schedule.time_none ? (
                ''
              ) : (
                <Text className="text-center text-blue-600">
                  予定時間: {dayjs(schedule.schedule_date).format('HH:mm')}~
                </Text>
              )}
              <Text className="text-center font-bold">{schedule.title}</Text>
            </Box>
          </ModalBody>

          <Center>
            <ModalFooter>
              <HStack spacing="5">
                <Button colorScheme="teal" onClick={onClickUpdateHandler}>
                  未完了に戻す
                </Button>
                <Button
                  colorScheme="orange"
                  onClick={() => onOpenDeleteDialog(schedule.id)}
                >
                  削除
                </Button>
                <DeleteModalMemo
                  selectedDeleteItem={selectedCompletionDeleteItem}
                  onCloseDeleteDialog={onCloseDeleteDialog}
                  schedule={schedule}
                />
                <Button colorScheme="gray" onClick={onCloseDialog}>
                  閉じる
                </Button>
              </HStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}
export const ScheduleCompletionModalMemo = memo(ScheduleCompletionModal)
