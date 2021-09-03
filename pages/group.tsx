import React, { FormEvent, useState, VFC } from 'react'
import { useQueryPartner } from '../hooks/useQueryPartner'
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Tag,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  setEditedPartner,
  resetEditedPartner,
  selectPartner,
} from '../slices/partnerSlice'
import { selectUser } from '../slices/userSlice'
import { GroupUpdateFormModalMemo } from '../components/GroupUpdateFormModal'
import { GroupDeleteModalMemo } from '../components/GroupDeleteModal'
import { GroupCreateModalMemo } from '../components/GroupCreateModal'
import { useMessage } from '../hooks/useMessage'

const Group: VFC = () => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const User = useAppSelector(selectUser)
  const { data } = useQueryPartner()
  const { showMessage } = useMessage()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUpdateItem, setSelectedUpdateItem] = useState<number>(null)
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<number>(null)

  const onOpenUpdateDialog = (id: number) => {
    setSelectedUpdateItem(id)
  }
  const onCloseUpdateDialog = () => {
    setSelectedUpdateItem(null)
    dispatch(resetEditedPartner())
  }

  const onOpenDeleteDialog = (id: number) => {
    setSelectedDeleteItem(id)
  }
  const onCloseDeleteDialog = () => {
    setSelectedDeleteItem(null)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      setEditedPartner({
        ...editedPartner,
      })
    )
    !editedPartner.partner_group || !editedPartner.partner_group_description
      ? showMessage({ title: '内容を入力してください', status: 'warning' })
      : onOpen()
  }
  return (
    <>
      <VStack>
        <Box bg="orange.200" p={3} mb={2} rounded={20}>
          <Text textColor="gray" fontSize="sm">
            あなたがリーダーとなってパートナーの計画をお手伝いするグループを作りましょう!!
          </Text>
        </Box>
        <Box bg="teal.500" p={2} m={4} rounded={10}>
          <Text
            className="font-bold text-center"
            p={1}
            mb={2}
            fontSize="lg"
            textColor="white"
          >
            新規グループ作成
          </Text>
          <form onSubmit={submitHandler}>
            <FormControl>
              <Input
                bg="white"
                placeholder="グループ名"
                onChange={(e) =>
                  dispatch(
                    setEditedPartner({
                      ...editedPartner,
                      partner_group: e.target.value,
                      admin_user: User.id,
                    })
                  )
                }
                value={editedPartner.partner_group}
              />
            </FormControl>
            <FormControl>
              <Textarea
                bg="white"
                mt={4}
                placeholder="グループの説明"
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
            <Center>
              <Button
                bg="orange.300"
                mt={3}
                mb={2}
                textColor="white"
                type="submit"
              >
                あなたがリーダーのグループ作成
              </Button>
              <GroupCreateModalMemo isOpen={isOpen} onClose={onClose} />
            </Center>
          </form>
        </Box>

        {data
          ?.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
          .map(
            (partner) =>
              partner.admin_user === User.id && (
                <Box bg="teal.500" p={2} mt={2} rounded={10} key={partner.id}>
                  <Box bg="white" mb={4} rounded={10}>
                    <Text p={2}>
                      <Tag
                        colorScheme="purple"
                        fontStyle="italic"
                        textColor="gray"
                      >
                        グループ名
                      </Tag>{' '}
                      {partner.partner_group}
                    </Text>
                    <Text p={2}>
                      <Tag
                        colorScheme="purple"
                        fontStyle="italic"
                        textColor="gray"
                      >
                        グループ説明
                      </Tag>{' '}
                      {partner.partner_group_description}
                    </Text>
                    <Text p={2}>
                      <Tag
                        colorScheme="teal"
                        fontStyle="italic"
                        textColor="gray"
                      >
                        リーダー
                      </Tag>{' '}
                      {partner.admin_user === User.id && User.name}
                    </Text>

                    {partner.users?.map(
                      (user) =>
                        user.id !== User.id && (
                          <Box p={2}>
                            <Text key={user.id}>
                              <Tag
                                colorScheme="teal"
                                fontStyle="italic"
                                textColor="gray"
                              >
                                パートナー
                              </Tag>{' '}
                              {user.name}
                            </Text>
                          </Box>
                        )
                    )}
                  </Box>

                  <Center>
                    <HStack mb={2}>
                      <Button
                        bg="orange.300"
                        textColor="white"
                        onClick={() => {
                          dispatch(
                            setEditedPartner({
                              ...partner,
                            })
                          )
                          onOpenUpdateDialog(partner.id)
                        }}
                      >
                        グループ編集
                      </Button>
                      <GroupUpdateFormModalMemo
                        selectedUpdateItem={selectedUpdateItem}
                        onCloseUpdateDialog={onCloseUpdateDialog}
                        partner={partner}
                      />
                      <Button
                        bg="purple.300"
                        textColor="white"
                        onClick={() => {
                          dispatch(
                            setEditedPartner({
                              ...partner,
                            })
                          )
                          onOpenDeleteDialog(partner.id)
                        }}
                      >
                        グループ削除
                      </Button>
                      <GroupDeleteModalMemo
                        selectedDeleteItem={selectedDeleteItem}
                        onCloseDeleteDialog={onCloseDeleteDialog}
                        partner={partner}
                      />
                    </HStack>
                  </Center>
                </Box>
              )
          )}
      </VStack>
    </>
  )
}
export default Group
