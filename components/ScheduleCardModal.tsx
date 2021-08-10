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

export interface Props {
  selectedItem: number
  onCloseDialog: () => void
  schedule: Schedule
}

const ScheduleCardModal: VFC<Props> = (props) => {
  const { selectedItem, onCloseDialog, schedule } = props
  const { updateScheduleMutation, deleteScheduleMutation } = useMutateSchedule()
  const { showMessage } = useMessage()
  const onClickHandler = () => {
    deleteScheduleMutation.mutate(schedule.id)
    showMessage({ title: '削除しました', status: 'success' })
  }
  const onClickUpdateHandler = () => {
    updateScheduleMutation.mutate({
      id: schedule.id,
      schedule_date: schedule.schedule_date,
      title: schedule.title,
      user_id: schedule.user_id,
      completion: true,
    })
    showMessage({ title: '予定を完了しました!', status: 'success' })
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
          <ModalHeader className="text-center">本日の予定</ModalHeader>
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
                  予定完了
                </Button>
                <Button colorScheme="orange" onClick={onClickHandler}>
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
export const ScheduleCardModalMemo = memo(ScheduleCardModal)
