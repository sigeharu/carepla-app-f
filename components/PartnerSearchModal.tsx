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
import dayjs from 'dayjs'
import { Partner, Schedule } from '../types/types'
import React, { FormEvent, memo, useRef, VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectPartner, setEditedPartner } from '../slices/partnerSlice'
import { selectApproval, setEditedApproval } from '../slices/approvalSlice'
import { selectUser } from '../slices/userSlice'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { useMutateApproval } from '../hooks/useMutateApproval'
import { useMessage } from '../hooks/useMessage'

export interface Props {
  selectedGroupPartnerItem: number
  onCloseGroupPartnerDialog: () => void
  partner: Partner
}

const PartnerSearchModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedApproval = useAppSelector(selectApproval)
  const User = useAppSelector(selectUser)
  const { selectedGroupPartnerItem, onCloseGroupPartnerDialog, partner } = props
  const { createPartnerMutation } = useMutatePartner()
  const { createApprovalMutation } = useMutateApproval()
  const { showMessage } = useMessage()
  const initialRef = useRef()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createApprovalMutation.mutate(editedApproval)
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
                        setEditedApproval({
                          ...editedApproval,
                          comment: e.target.value,
                          from_user: User.id,
                          for_user: partner.admin_user,
                        })
                      )
                    }
                    value={editedApproval.comment}
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
export const PartnerSearchModalMemo = memo(PartnerSearchModal)
