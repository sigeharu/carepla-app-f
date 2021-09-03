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
import { Partner } from '../types/types'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { useMessage } from '../hooks/useMessage'

export interface Props {
  selectedDeleteItem: number
  onCloseDeleteDialog: () => void
  partner: Partner
}

const GroupDeleteModal: VFC<Props> = (props) => {
  const { selectedDeleteItem, onCloseDeleteDialog, partner } = props
  const { deleteGroupMutation } = useMutatePartner()
  const { showMessage } = useMessage()
  const onClickHandler = () => {
    deleteGroupMutation.mutate(partner.id)
    showMessage({ title: '削除しました', status: 'success' })
  }
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInRight"
        isOpen={partner.id === selectedDeleteItem}
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
                  <Button
                    bg="orange.300"
                    textColor="white"
                    onClick={onClickHandler}
                  >
                    削除
                  </Button>
                  <Button
                    bg="purple.300"
                    textColor="white"
                    onClick={onCloseDeleteDialog}
                  >
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
export const GroupDeleteModalMemo = memo(GroupDeleteModal)
