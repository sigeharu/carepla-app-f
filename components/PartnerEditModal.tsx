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
  HStack,
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
import { useMutatePartner } from '../hooks/useMutatePartner'
import { useMutateApproval } from '../hooks/useMutateApproval'
import { useMessage } from '../hooks/useMessage'

export interface Props {
  selectedItem: number
  onCloseDialog: () => void
  partner: Partner
}

const PartnerEditModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const editedApproval = useAppSelector(selectApproval)
  const { selectedItem, onCloseDialog, partner } = props
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
          <form onSubmit={submitHandler}>
            <ModalBody>
              <Box>
                <FormControl>
                  <Textarea
                    ref={initialRef}
                    className="mb-3"
                    bg="white"
                    placeholder="予定作成"
                    type="textarea"
                    onChange={(e) =>
                      dispatch(
                        setEditedApproval({
                          ...editedApproval,
                          comment: editedApproval.comment,
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
                  <HStack spacing="5"></HStack>
                </VStack>
              </ModalFooter>
            </Center>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
export const PartnerEditModalMemo = memo(PartnerEditModal)
