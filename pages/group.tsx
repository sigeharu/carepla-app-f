import React, { FormEvent, useState, VFC } from 'react'
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
import { GroupUpdateFormModalMemo } from '../components/GroupUpdateFormModal'
import { GroupDeleteModalMemo } from '../components/GroupDeleteModal'

const Partner: VFC = () => {
  const dispatch = useAppDispatch()
  const editedPartner = useAppSelector(selectPartner)
  const User = useAppSelector(selectUser)
  const { createGroupMutation } = useMutatePartner()
  const { status, data } = useQueryPartner()
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
    createGroupMutation.mutate(editedPartner)
  }
  return (
    <VStack>
      <Box bg="purple.400" p={6} m={4} rounded={10}>
        <Heading p={4} textColor="white">
          グループ作成
        </Heading>
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
            <Button mt={4} type="submit">
              パートナーグループ作成
            </Button>
          </Center>
        </form>
      </Box>

      {data
        ?.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
        .map((partner) => (
          <Box bg="orange.300" p={4} mt={2} rounded={10} key={partner.id}>
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
              {partner.users?.map(
                (user) =>
                  user.id !== User.id && (
                    <Box bg="white" p={2} mx={2} mb={2} rounded={10}>
                      <Text key={user.id}>{user.name}</Text>
                    </Box>
                  )
              )}
            </Box>

            {partner.admin_user === User.id && (
              <Center>
                <HStack>
                  <Button
                    size="sm"
                    onClick={() => {
                      dispatch(
                        setEditedPartner({
                          ...partner,
                        })
                      ),
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
                    size="sm"
                    onClick={() => {
                      dispatch(
                        setEditedPartner({
                          ...partner,
                        })
                      ),
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
            )}
          </Box>
        ))}
    </VStack>
  )
}
export default Partner
