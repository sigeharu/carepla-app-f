import { resetEditedPartner, setEditedPartner } from '../../slices/partnerSlice'
import { Box, Tag, Text } from '@chakra-ui/react'
import { GroupApplyModalMemo } from './GroupApplyModal'
import React, { memo, useState, VFC } from 'react'
import { Partner } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser } from '../../slices/userSlice'

export interface Props {
  partner: Partner
}

const GroupApplyStatusCheck: VFC<Props> = (props) => {
  const { partner } = props
  const User = useAppSelector(selectUser)

  const applyingUser = partner.applies?.some(
    (apply) => apply.user_id === User.id
  )
  const partnerUser = partner.users?.some(
    (user) => user.id === User.id && user.id !== partner.admin_user
  )
  return (
    <>
      {applyingUser && (
        <Text className="text-center" mb={2} textColor="orange.500">
          現在パートナー申請中
        </Text>
      )}
      {partnerUser && (
        <Text className="text-center" mb={2} textColor="teal.500">
          参加済みグループです
        </Text>
      )}
      {partner.admin_user === User.id && (
        <Text className="text-center" mb={2} textColor="orange.500">
          あなたが管理者のグループです
        </Text>
      )}
    </>
  )
}
export const GroupApplyStatusCheckMemo = memo(GroupApplyStatusCheck)
