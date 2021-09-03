import { resetEditedPartner, setEditedPartner } from '../../slices/partnerSlice'
import { Box, Tag, Text } from '@chakra-ui/react'
import { GroupApplyModalMemo } from './GroupApplyModal'
import React, { memo, useState, VFC } from 'react'
import { Partner } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser } from '../../slices/userSlice'
import { GroupApplyStatusCheckMemo } from './GroupApplyStatusCheck'
import { GroupApplyNameAdminListMemo } from './GroupApplyNameAdminList'

export interface Props {
  partner: Partner
}

const GroupApplyList: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { partner } = props
  const User = useAppSelector(selectUser)
  const [selectedGroupPartnerItem, setSelectedGroupPartnerItem] =
    useState<number>(null)

  const onOpenGroupPartnerDialog = (id: number) => {
    setSelectedGroupPartnerItem(id)
  }
  const onCloseGroupPartnerDialog = () => {
    setSelectedGroupPartnerItem(null)
    dispatch(resetEditedPartner())
  }

  return (
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
        <GroupApplyStatusCheckMemo partner={partner} />
        <GroupApplyNameAdminListMemo partner={partner} />
        <GroupApplyModalMemo
          selectedGroupPartnerItem={selectedGroupPartnerItem}
          onCloseGroupPartnerDialog={onCloseGroupPartnerDialog}
          partner={partner}
        />
      </Box>
    </Box>
  )
}
export const GroupApplyListMemo = memo(GroupApplyList)
