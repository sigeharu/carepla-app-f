import React, { FormEvent, useState, VFC } from 'react'
import { useQueryGroupSearch } from '../hooks/useQueryGroupSearch'
import {
  Box,
  Button,
  HStack,
  Input,
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
  selectGroupSearch,
} from '../slices/partnerSlice'
import { selectUser } from '../slices/userSlice'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { useMessage } from '../hooks/useMessage'
import { GroupApplyModalMemo } from '../components/partner-apply/GroupApplyModal'
import { GroupApplyListMemo } from '../components/partner-apply/GroupApplyList'

const PartnerApply: VFC = () => {
  const dispatch = useAppDispatch()
  const editedGroupSearch = useAppSelector(selectGroupSearch)
  const User = useAppSelector(selectUser)
  const { createGroupSearchMutation } = useMutatePartner()
  const { showMessage } = useMessage()
  const { data } = useQueryGroupSearch(editedGroupSearch.keyword)

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
            <GroupApplyListMemo key={partner.id} partner={partner} />
          ))}
        </Stack>
      </VStack>
    </>
  )
}
export default PartnerApply
