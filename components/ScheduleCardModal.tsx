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
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react'
import { Schedule } from '../types/types'
import dayjs from 'dayjs'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { useMessage } from '../hooks/useMessage'
import { DeleteModalMemo } from './DeleteModal'
import {
  selectSchedule,
  setEditedSchedule,
  resetEditedSchedule,
} from '../slices/scheduleSlice'
import { ScheduleEditCardModalMemo } from './ScheduleEditCardModal'

export interface Props {
  selectedItem: number
  onCloseDialog: () => void
  schedule: Schedule
}

const ScheduleCardModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedSchedule = useAppSelector(selectSchedule)
  const { selectedItem, onCloseDialog, schedule } = props
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<number>(null)
  const [selectedUpdateItem, setSelectedUpdateItem] = useState<number>(null)
  const { updateScheduleMutation, deleteScheduleMutation } = useMutateSchedule()
  const { showMessage } = useMessage()
  const now = dayjs()

  const onOpenUpdateDialog = (id: number) => {
    setSelectedUpdateItem(id)
  }
  const onCloseUpdateDialog = () => {
    setSelectedUpdateItem(null)
    dispatch(resetEditedSchedule())
  }

  const onOpenDeleteDialog = (id: number) => {
    setSelectedDeleteItem(id)
  }
  const onCloseDeleteDialog = () => {
    setSelectedDeleteItem(null)
  }
  const onClickHandler = () => {
    deleteScheduleMutation.mutate(schedule.id)
    showMessage({ title: '削除しました', status: 'success' })
  }

  const onClickCompletionUpdateHandler = () => {
    editedSchedule.takeover
      ? updateScheduleMutation.mutate({
          ...schedule,
          completion: true,
          takeover: false,
          schedule_date: new Date(),
        })
      : updateScheduleMutation.mutate({
          ...schedule,
          completion: true,
          takeover: false,
        })
    showMessage({ title: '予定を完了しました!', status: 'success' })
    onCloseDialog()
  }
  const onClickTakeoverUpdateHandler = () => {
    updateScheduleMutation.mutate({
      ...schedule,
      takeover: true,
    })
    showMessage({
      title: '完了しなかった場合､明日以降も予定を継続します!',
      status: 'success',
    })
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
              <VStack>
                <HStack>
                  <Button
                    colorScheme="teal"
                    onClick={onClickCompletionUpdateHandler}
                  >
                    予定完了
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={() => {
                      dispatch(
                        setEditedSchedule({
                          ...schedule,
                        })
                      ),
                        onOpenUpdateDialog(schedule.id)
                    }}
                  >
                    変更
                  </Button>
                  <ScheduleEditCardModalMemo
                    selectedUpdateItem={selectedUpdateItem}
                    onCloseUpdateDialog={onCloseUpdateDialog}
                    schedule={schedule}
                  />
                  <Button
                    colorScheme="red"
                    onClick={() => onOpenDeleteDialog(schedule.id)}
                  >
                    削除
                  </Button>
                  <DeleteModalMemo
                    selectedDeleteItem={selectedDeleteItem}
                    onCloseDeleteDialog={onCloseDeleteDialog}
                    schedule={schedule}
                  />
                </HStack>
                <HStack>
                  <Button colorScheme="purple">週間予定に設定</Button>
                  <Button colorScheme="gray" onClick={onCloseDialog}>
                    閉じる
                  </Button>
                </HStack>
              </VStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}
export const ScheduleCardModalMemo = memo(ScheduleCardModal)
