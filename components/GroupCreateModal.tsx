import React, { memo, useRef, VFC } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Box, Button, Center, HStack, Tag, Text } from '@chakra-ui/react'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { useMessage } from '../hooks/useMessage'
import { useAppSelector } from '../app/hooks'
import { selectPartner } from '../slices/partnerSlice'

export interface Props {
  isOpen: boolean
  onClose: () => void
}

const GroupCreateModal: VFC<Props> = (props) => {
  const editedPartner = useAppSelector(selectPartner)
  const { isOpen, onClose } = props
  const { createGroupMutation } = useMutatePartner()
  const { showMessage } = useMessage()
  const initialRef = useRef()
  const clickHandler = () => {
    createGroupMutation.mutate(editedPartner)
    showMessage({ title: 'あなたのグループを作成しました!', status: 'success' })
    onClose()
  }
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInRight"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">
            グループ作成確認画面
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Text className="font-bold" textColor="orange.600" p={2} mb={1}>
                本当にこの内容でよろしいですか?
              </Text>
            </Center>
            <Box bg="orange.100" p={2} rounded={10}>
              <Text className="font-bold" p={2}>
                <Tag colorScheme="purple" fontStyle="italic">
                  グループ名
                </Tag>{' '}
                {editedPartner.partner_group}
              </Text>
            </Box>
            <Box bg="orange.100" p={2} mt={2} rounded={10}>
              <Text className="font-bold" p={2}>
                <Tag colorScheme="purple" fontStyle="italic">
                  グループ説明
                </Tag>{' '}
                {editedPartner.partner_group_description}
              </Text>
            </Box>
          </ModalBody>
          <Center>
            <ModalFooter>
              <HStack>
                <Button
                  className="disabled:opacity-40 py-2 px-3 text-white rounded"
                  bg="orange.300"
                  disabled={
                    !editedPartner.partner_group ||
                    !editedPartner.partner_group_description
                  }
                  onClick={clickHandler}
                >
                  グループ作成
                </Button>

                <Button bg="purple.300" textColor="white" onClick={onClose}>
                  やめる
                </Button>
              </HStack>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}
export const GroupCreateModalMemo = memo(GroupCreateModal)
