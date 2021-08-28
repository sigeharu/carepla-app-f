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
  FormLabel,
  HStack,
  Tag,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Partner } from '../types/types'
import React, { FormEvent, memo, useRef, VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectApply, setEditedApply } from '../slices/applySlice'
import { selectUser } from '../slices/userSlice'
import { useMutateApply } from '../hooks/useMutateApply'
import { useMessage } from '../hooks/useMessage'

export interface Props {
  selectedGroupPartnerItem: number
  onCloseGroupPartnerDialog: () => void
  partner: Partner
}

const GroupApplyModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedApply = useAppSelector(selectApply)
  const User = useAppSelector(selectUser)
  const { selectedGroupPartnerItem, onCloseGroupPartnerDialog, partner } = props
  const { createApplyMutation } = useMutateApply()
  const { showMessage } = useMessage()
  const initialRef = useRef()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createApplyMutation.mutate(editedApply)
    showMessage({ title: 'パートナー申請しました!', status: 'success' })
  }
  return (
    <Box>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={partner.id === selectedGroupPartnerItem}
        onClose={onCloseGroupPartnerDialog}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">パートナー申請</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitHandler}>
            <ModalBody>
              <Box>
                <Box bg="white" p={2} rounded={10}>
                  <Text bg="white" p={2} rounded={10}>
                    <Tag colorScheme="purple" fontSize="sm" textColor="gray">
                      グループ名
                    </Tag>{' '}
                    {partner.partner_group}
                  </Text>

                  <Text bg="white" p={2} rounded={10}>
                    <Tag colorScheme="teal" fontSize="sm" textColor="gray">
                      管理者
                    </Tag>{' '}
                    {partner.users.map(
                      (user) => partner.admin_user === user.id && user.name
                    )}
                  </Text>
                </Box>
                <FormControl>
                  <Textarea
                    ref={initialRef}
                    className="mb-3"
                    bg="orange.100"
                    placeholder="パートナー申請のコメントを入力してください"
                    type="textarea"
                    onChange={(e) =>
                      dispatch(
                        setEditedApply({
                          ...editedApply,
                          comment: e.target.value,
                          partner_id: partner.id,
                          user_id: User.id,
                          user_name: User.name,
                          for_user: partner.admin_user,
                        })
                      )
                    }
                    value={editedApply.comment}
                  />
                </FormControl>
              </Box>
            </ModalBody>

            <Center>
              <ModalFooter>
                <VStack spacing="3">
                  <HStack spacing="5">
                    <Button bg="teal.500" textColor="white" type="submit">
                      申請
                    </Button>
                    <Button bg="purple.300" textColor="white">
                      閉じる
                    </Button>
                  </HStack>
                </VStack>
              </ModalFooter>
            </Center>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}
export const GroupApplyModalMemo = memo(GroupApplyModal)
