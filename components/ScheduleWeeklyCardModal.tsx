import { memo, VFC } from 'react'
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
import { Schedule } from '../types/types'
import dayjs from 'dayjs'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { useMessage } from '../hooks/useMessage'
import { selectSchedule, setEditedSchedule } from '../slices/scheduleSlice'
import { useAppSelector } from '../app/hooks'

export interface Props {
  selectedItem: number
  onCloseDialog: () => void
  schedule: Schedule
}

const ScheduleWeeklyCardModal: VFC<Props> = (props) => {
  const { selectedItem, onCloseDialog, schedule } = props
  const editedSchedule = useAppSelector(selectSchedule)
  const { updateScheduleMutation, deleteScheduleMutation } = useMutateSchedule()
  const { showMessage } = useMessage()
  const onClickDeleteHandler = () => {
    deleteScheduleMutation.mutate(schedule.id)
    showMessage({ title: '削除しました', status: 'success' })
  }
  const onClickUpdateHandler = () => {
    updateScheduleMutation.mutate({
      ...editedSchedule,
      completion: false,
    })
    showMessage({ title: '予定を未完了に戻しました!', status: 'info' })
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
          <ModalHeader className="text-center">予定管理</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text className="text-center text-blue-600">
                予定時間: {dayjs(schedule.schedule_date).format('HH:mm')}~
              </Text>
              <Text className="text-center font-bold">{schedule.title}</Text>
            </Box>
          </ModalBody>

          <Center>
            <ModalFooter>
              <HStack>
                <Button colorScheme="teal" onClick={onClickUpdateHandler}>
                  未完了に戻す
                </Button>
                <Button colorScheme="orange" onClick={onClickDeleteHandler}>
                  削除
                </Button>
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
export const ScheduleWeeklyCardModalMemo = memo(ScheduleWeeklyCardModal)
