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
import { useAppSelector } from '../../app/hooks'
import { selectPartner } from '../../slices/partnerSlice'
import { useMutatePartner } from '../../hooks/useMutatePartner'
import { useMessage } from '../../hooks/useMessage'
import { Partner } from '../../types/types'
import Link from 'next/link'

export interface Props {
  selectedGroupPartnerItem: number
  onCloseGroupPartnerDialog: () => void
  partner: Partner
}

const PartnerCareplaMemberModal: VFC<Props> = (props) => {
  const editedPartner = useAppSelector(selectPartner)
  const { selectedGroupPartnerItem, onCloseGroupPartnerDialog, partner } = props
  const { createGroupMutation } = useMutatePartner()
  const { showMessage } = useMessage()
  const initialRef = useRef()
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInRight"
        initialFocusRef={initialRef}
        isOpen={partner.id === selectedGroupPartnerItem}
        onClose={onCloseGroupPartnerDialog}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">パートナー選択</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg="orange.100" p={3} mb={3} rounded={20}>
              <Text textColor="gray" fontSize="sm">
                パートナーを選択してください
              </Text>
            </Box>
            {partner.users?.map(
              (user) =>
                user.id !== partner.admin_user && (
                  <Link href="/create-partner-carepla">
                    <Box p={2} key={user.id}>
                      <Text
                        className="font-bold text-lg"
                        bg="orange.100"
                        p={2}
                        rounded={10}
                      >
                        <Tag
                          size="lg"
                          colorScheme="teal"
                          fontStyle="italic"
                          textColor="gray"
                        >
                          パートナー
                        </Tag>{' '}
                        {user.name}
                      </Text>
                    </Box>
                  </Link>
                )
            )}
          </ModalBody>
          <Center>
            <ModalFooter></ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}
export const PartnerCareplaMemberModalMemo = memo(PartnerCareplaMemberModal)
