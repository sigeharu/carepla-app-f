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
import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react'
import { Schedule } from '../types/types'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { useMessage } from '../hooks/useMessage'

export interface Props {
  selectedDeleteItem: number
  onCloseDeleteDialog: () => void
  schedule: Schedule
}

const DeleteModal: VFC<Props> = (props) => {
  const { selectedDeleteItem, onCloseDeleteDialog, schedule } = props
  const { deleteScheduleMutation } = useMutateSchedule()
  const { showMessage } = useMessage()
  const onClickHandler = () => {
    deleteScheduleMutation.mutate(schedule.id)
    showMessage({ title: '削除しました', status: 'success' })
  }
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInRight"
        isOpen={schedule.id === selectedDeleteItem}
        onClose={onCloseDeleteDialog}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">確認画面</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text className="text-center font-bold">
                本当に削除してもよろしいですか?
              </Text>
            </Box>
          </ModalBody>

          <Center>
            <ModalFooter>
              <VStack>
                <HStack>
                  <Button colorScheme="red" onClick={onClickHandler}>
                    削除
                  </Button>
                  <Button colorScheme="gray" onClick={onCloseDeleteDialog}>
                    やめる
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
export const DeleteModalMemo = memo(DeleteModal)
