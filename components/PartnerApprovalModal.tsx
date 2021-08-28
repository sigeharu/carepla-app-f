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
import { Partner } from '../types/types'

export interface Props {
  selectedItem: number
  onCloseDialog: () => void
  partner: Partner
}

const PartnerApprovalModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const User = useAppSelector(selectUser)
  const { selectedItem, onCloseDialog, partner } = props
  const { createGroupMutation } = useMutatePartner()
  const { status, data } = useQueryPartner()
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={partner.id === selectedItem}
        onClose={onCloseDialog}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">パートナー申請</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <VStack>
                <Box bg="orange.300" p={4} mt={2} rounded={10} autoFocus>
                  <Box mb={4} rounded={10}>
                    <Text fontStyle="italic">グループ名</Text>
                    <Text bg="white" p={2} mx={2} mb={2} rounded={10}>
                      {partner.partner_group}
                    </Text>
                    <Text fontStyle="italic">グループ説明</Text>
                    <Text bg="white" p={2} mx={2} mb={2} rounded={10}>
                      {partner.partner_group_description}
                    </Text>
                    <Text fontStyle="italic">管理者</Text>
                    <Text bg="white" p={2} mx={2} mb={2} rounded={10}>
                      {partner.admin_user === User.id && User.name}
                    </Text>

                    <Text fontStyle="italic">パートナー</Text>

                    {partner.users.map(
                      (user) =>
                        user.id !== User.id && (
                          <Box bg="white" p={2} mx={2} mb={2} rounded={10}>
                            <Text key={user.id}>{user.name}</Text>{' '}
                          </Box>
                        )
                    )}
                  </Box>
                </Box>
              </VStack>
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
export const PartnerApprovalModalMemo = memo(PartnerApprovalModal)
