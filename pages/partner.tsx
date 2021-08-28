import React, { FormEvent, useState, VFC } from 'react'
import { useQueryPartner } from '../hooks/useQueryPartner'
import { useQueryGroupSearch } from '../hooks/useQueryGroupSearch'
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
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  setEditedPartner,
  setEditedGroupSearch,
  resetEditedPartner,
  selectPartner,
  selectGroupSearch,
} from '../slices/partnerSlice'
import { selectUser } from '../slices/userSlice'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { Header } from '../components/Header'
import { useQueryClient } from 'react-query'
import { useMessage } from '../hooks/useMessage'
import { PartnerSearchModalMemo } from '../components/PartnerSearchModal'
import { GroupApplyModalMemo } from '../components/GroupApplyModal'

const Partner: VFC = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const editedGroupSearch = useAppSelector(selectGroupSearch)
  const User = useAppSelector(selectUser)
  const { createGroupMutation, createGroupSearchMutation } = useMutatePartner()
  // const { status, data } = useQueryPartner()
  const { showMessage } = useMessage()
  const { data } = useQueryGroupSearch(editedGroupSearch.keyword)
  const [selectedGroupPartnerItem, setSelectedGroupPartnerItem] =
    useState<number>(null)

  const onOpenGroupPartnerDialog = (id: number) => {
    setSelectedGroupPartnerItem(id)
  }
  const onCloseGroupPartnerDialog = () => {
    setSelectedGroupPartnerItem(null)
    dispatch(resetEditedPartner())
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createGroupSearchMutation.mutate(editedGroupSearch.keyword)
    showMessage({
      title: `キーワード『${editedGroupSearch.keyword}』で検索しました`,
      status: 'info',
    })
  }
  return (
    <>
      <Box bg="orange.200" p={3} rounded={20}>
        <Text textColor="gray" fontSize="sm">
          お知り合いのグループを探して画面を押したらパートナー申請してみましょう!!
        </Text>
      </Box>
      <Box bg="teal.500" p={2} mt={4} rounded={10}>
        <form onSubmit={submitHandler}>
          <HStack>
            <Input
              bg="white"
              borderRadius={20}
              placeholder="グループ検索"
              onChange={(e) =>
                dispatch(
                  setEditedGroupSearch({
                    ...editedGroupSearch,
                    keyword: e.target.value,
                  })
                )
              }
              value={editedGroupSearch.keyword}
            />
            <Button bg="orange.400" textColor="white" type="submit">
              検索
            </Button>
          </HStack>
        </form>
      </Box>
      <VStack>
        <Stack>
          {data?.map((partner) => (
            <Box
              bg="teal.500"
              p={2}
              mt={2}
              rounded={10}
              key={partner.id}
              onClick={() => {
                dispatch(
                  setEditedPartner({
                    ...partner,
                  })
                ),
                  onOpenGroupPartnerDialog(partner.id)
              }}
            >
              <Box bg="white" p={2} rounded={10}>
                <Text bg="white" p={2} rounded={10}>
                  <Tag colorScheme="purple" fontSize="sm" textColor="gray">
                    グループ名
                  </Tag>{' '}
                  {partner.partner_group}
                </Text>

                <Text bg="white" p={2} rounded={10}>
                  <Tag colorScheme="teal" fontSize="sm" textColor="gray">
                    管理者
                  </Tag>{' '}
                  {partner.users?.map(
                    (user) => partner.admin_user === user.id && user.name
                  )}
                  {/*{partner.admin_user === User.id && User.name}*/}
                </Text>
                <GroupApplyModalMemo
                  selectedGroupPartnerItem={selectedGroupPartnerItem}
                  onCloseGroupPartnerDialog={onCloseGroupPartnerDialog}
                  partner={partner}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </VStack>
    </>
  )
}
export default Partner
