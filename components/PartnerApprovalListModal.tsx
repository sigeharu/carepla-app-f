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
import { useQueryPartnerApply } from '../hooks/useQueryPartnerApply'
import {
  selectApply,
  selectPartnerApplyApproval,
  setEditedPartnerApplyApproval,
} from '../slices/applySlice'

export interface Props {
  isOpen: boolean
  onClose: () => void
  applying: Apply[]
}

const PartnerApprovalListModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const editedPartnerApplyApproval = useAppSelector(selectPartnerApplyApproval)
  const User = useAppSelector(selectUser)
  const { isOpen, onClose, applying } = props
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
          <ModalHeader className="text-center">γγΌγγγΌζΏθͺη»ι’</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <VStack>
                {applying.map((apply) => (
                  <Box bg="teal.300" p={2} rounded={10} key={apply.id}>
                    <Text>
                      <Tag bg="purple.200">γ‘γγ»γΌγΈ</Tag> {apply.comment}
                    </Text>
                    <Text p={2}>
                      <Tag bg="orange.200">η³θ«θ</Tag> {apply.user_name}
                    </Text>
                    <Center>
                      <HStack>
                        <Button onClick={() => onClickHandler(apply)}>
                          η³θ«γζΏθͺ
                        </Button>
                        <Button>η³θ«γζε¦</Button>
                      </HStack>
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
                      ιγγ
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
