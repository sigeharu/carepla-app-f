import React, { FormEvent, useState, VFC } from 'react'
import { useQueryGroupSearch } from '../hooks/useQueryGroupSearch'
import {
  Box,
  Button,
  Collapse,
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
import { ScheduleEditFormMemo } from '../components/ScheduleEditForm'

const CreatePartnerCarepla: VFC = () => {
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
          パートナーの計画を作成しましょう!!
        </Text>
      </Box>

      <Box bg="teal.500" pt={3} pb={3} mt={3} rounded={10}>
        <ScheduleEditFormMemo />
      </Box>
    </>
  )
}
export default CreatePartnerCarepla
