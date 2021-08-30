import React, { FormEvent, memo, MouseEventHandler, VFC } from 'react'
import { useQueryPartner } from '../hooks/useQueryPartner'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Tag,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  setEditedPartner,
  resetEditedPartner,
  selectPartner,
} from '../slices/partnerSlice'
import { selectUser } from '../slices/userSlice'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { Header } from '../components/Header'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { setEditedApproval } from '../slices/approvalSlice'
import { Apply, Partner, PartnerApply, PartnerApproval } from '../types/types'
import { useQueryPartnerApproval } from '../hooks/useQueryPartnerApproval'
import {
  selectApply,
  selectPartnerApplyApproval,
  setEditedPartnerApplyApproval,
} from '../slices/applySlice'

export interface Props {
  isOpen: boolean
  onClose: () => void
  partnerApply: Apply[]
}

const PartnerApprovalListModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const editedPartnerApplyApproval = useAppSelector(selectPartnerApplyApproval)
  const User = useAppSelector(selectUser)
  const { isOpen, onClose, partnerApply } = props
  // const { data: partnerApproval } = useQueryPartnerApproval()
  const { createPartnerMutation } = useMutatePartner()
  const { status, data } = useQueryPartner()
  const onClickHandler = (apply) => {
    createPartnerMutation.mutate({
      user_id: apply.user_id,
      partner_id: apply.partner_id,
      apply_id: apply.id,
    })
    onClose()
  }
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">パートナー承認画面</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <VStack>
                {partnerApply.map((apply) => (
                  <Box bg="teal.300" p={2} rounded={10} key={apply.id}>
                    <Text>
                      <Tag bg="purple.200">メッセージ</Tag> {apply.comment}
                    </Text>
                    <Text p={2}>
                      <Tag bg="orange.200">申請者</Tag> {apply.user_name}
                    </Text>
                    <Center>
                      <Button size="lg" onClick={() => onClickHandler(apply)}>
                        承認
                      </Button>
                    </Center>
                  </Box>
                ))}
              </VStack>
            </ModalBody>

            <Center>
              <ModalFooter>
                <VStack spacing="3">
                  <Center>
                    <Button size="lg" onClick={onClose}>
                      閉じる
                    </Button>
                  </Center>
                </VStack>
              </ModalFooter>
            </Center>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
export const PartnerApprovalListModalMemo = memo(PartnerApprovalListModal)
