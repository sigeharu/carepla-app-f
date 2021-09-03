import React, { FormEvent, memo, useState, useRef, VFC } from 'react'
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
import { Partner, Schedule } from '../types/types'
import dayjs from 'dayjs'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { useMessage } from '../hooks/useMessage'
import { selectSchedule, setEditedSchedule } from '../slices/scheduleSlice'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'
import { selectPartner, setEditedPartner } from '../slices/partnerSlice'

export interface Props {
  selectedUpdateItem: number
  onCloseUpdateDialog: () => void
  partner: Partner
}

const GroupUpdateFormModal: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const User = useAppSelector(selectUser)
  const { selectedUpdateItem, onCloseUpdateDialog, partner } = props
  const { updateGroupMutation } = useMutatePartner()
  const { showMessage } = useMessage()
  const initialRef = useRef()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateGroupMutation.mutate(editedPartner)
    showMessage({ title: '予定を更新しました!', status: 'success' })
    onCloseUpdateDialog()
  }
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInRight"
        initialFocusRef={initialRef}
        isOpen={partner.id === selectedUpdateItem}
        onClose={onCloseUpdateDialog}
      >
        <ModalOverlay />
        <ModalContent className="">
          <ModalHeader className="text-center">グループ変更画面</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitHandler}>
            <ModalBody>
              <VStack>
                <FormControl>
                  <Textarea
                    ref={initialRef}
                    className="mb-3"
                    bg="orange.100"
                    placeholder="グループ名"
                    type="textarea"
                    onChange={(e) =>
                      dispatch(
                        setEditedPartner({
                          ...editedPartner,
                          partner_group: e.target.value,
                        })
                      )
                    }
                    value={editedPartner.partner_group}
                  />
                </FormControl>
                <FormControl>
                  <Textarea
                    className="mb-3"
                    bg="orange.100"
                    placeholder="グループの説明"
                    type="textarea"
                    onChange={(e) =>
                      dispatch(
                        setEditedPartner({
                          ...editedPartner,
                          partner_group_description: e.target.value,
                        })
                      )
                    }
                    value={editedPartner.partner_group_description}
                  />
                </FormControl>
              </VStack>
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
                    type="submit"
                  >
                    グループ編集
                  </Button>

                  <Button
                    bg="purple.300"
                    textColor="white"
                    onClick={onCloseUpdateDialog}
                  >
                    やめる
                  </Button>
                </HStack>
              </ModalFooter>
            </Center>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
export const GroupUpdateFormModalMemo = memo(GroupUpdateFormModal)
