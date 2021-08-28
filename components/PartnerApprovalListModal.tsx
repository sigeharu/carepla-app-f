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
import { Apply, Partner, PartnerApply, PartnerApproval } from '../types/types'
import { useQueryPartnerApproval } from '../hooks/useQueryPartnerApproval'

export interface Props {
  isOpen: boolean
  onClose: () => void
  partnerApply: Apply[]
}

const PartnerApprovalListModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const User = useAppSelector(selectUser)
  const { isOpen, onClose, partnerApply } = props
  // const { data: partnerApproval } = useQueryPartnerApproval()
  const { createGroupMutation } = useMutatePartner()
  const { status, data } = useQueryPartner()
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
                    <Text>{apply.comment}</Text>
                    <Text>{apply.user_name}</Text>
                  </Box>
                ))}
              </VStack>
            </ModalBody>

            <Center>
              <ModalFooter>
                <VStack spacing="3">
                  <Center>
                    <Button size="lg">承認</Button>
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
