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
import { useQueryPartner } from '../hooks/useQueryPartner'
import { GroupApplyNameAdminListMemo } from '../components/partner-apply/GroupApplyNameAdminList'
import { PartnerCareplaMemberModalMemo } from '../components/partner-carepla-list/PartnerCareplaMemberModal'

const PartnerCareplaList: VFC = () => {
  const dispatch = useAppDispatch()
  const editedGroupSearch = useAppSelector(selectGroupSearch)
  const User = useAppSelector(selectUser)
  const { createGroupSearchMutation } = useMutatePartner()
  const { showMessage } = useMessage()
  const { status, data } = useQueryPartner()
  const [selectedGroupPartnerItem, setSelectedGroupPartnerItem] =
    useState<number>(null)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createGroupSearchMutation.mutate(editedGroupSearch.keyword)
    showMessage({
      title: `キーワード『${editedGroupSearch.keyword}』で検索しました`,
      status: 'info',
    })
  }
  const onOpenGroupPartnerDialog = (id: number) => {
    setSelectedGroupPartnerItem(id)
  }
  const onCloseGroupPartnerDialog = () => {
    setSelectedGroupPartnerItem(null)
    dispatch(resetEditedPartner())
  }

  return (
    <>
      <Box bg="orange.200" p={3} rounded={20}>
        <Text textColor="gray" fontSize="sm">
          パートナーを選んで計画作成のお手伝いをしましょう!!
        </Text>
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
                )
                onOpenGroupPartnerDialog(partner.id)
              }}
            >
              <Box bg="white" p={2} rounded={10}>
                <GroupApplyNameAdminListMemo partner={partner} />
              </Box>
              <PartnerCareplaMemberModalMemo
                onCloseGroupPartnerDialog={onCloseGroupPartnerDialog}
                selectedGroupPartnerItem={selectedGroupPartnerItem}
                partner={partner}
              />
            </Box>
          ))}
        </Stack>
      </VStack>
    </>
  )
}
export default PartnerCareplaList
