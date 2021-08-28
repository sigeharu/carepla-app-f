import React, { FormEvent, memo, VFC } from 'react'
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
import { Partner, PartnerApproval } from '../types/types'
import { useQueryPartnerApproval } from '../hooks/useQueryPartnerApproval'
import { useQueryApply } from '../hooks/useQueryApply'

export interface Props {
  selectedPartnerApprovalCheckItem: number
  onClosePartnerApprovalCheckDialog: () => void
}

const PartnerApprovalCheckModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const User = useAppSelector(selectUser)
  const {
    selectedPartnerApprovalCheckItem,
    onClosePartnerApprovalCheckDialog,
  } = props
  const { data: partnerApply } = useQueryApply()
  const { createGroupMutation } = useMutatePartner()
  const { status, data } = useQueryPartner()
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={User.id === selectedPartnerApprovalCheckItem}
        onClose={onClosePartnerApprovalCheckDialog}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">パートナー申請</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <VStack></VStack>
            </ModalBody>

            <Center>
              <ModalFooter>
                <VStack spacing="3">
                  <Center>
                    <Button size="lg">パートナー申請</Button>
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
export const PartnerApprovalCheckModalMemo = memo(PartnerApprovalCheckModal)
