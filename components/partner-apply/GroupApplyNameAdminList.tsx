import { Box, Tag, Text } from '@chakra-ui/react'
import React, { memo, useState, VFC } from 'react'
import { Partner } from '../../types/types'
import { GroupApplyStatusCheckMemo } from './GroupApplyStatusCheck'

export interface Props {
  partner: Partner
}

const GroupApplyNameAdminList: VFC<Props> = (props) => {
  const { partner } = props

  return (
    <>
      <Box p={2} rounded={10}>
        {/*<GroupApplyStatusCheckMemo partner={partner} />*/}
        <Tag colorScheme="purple" fontSize="sm" textColor="gray">
          グループ名
        </Tag>{' '}
        {partner.partner_group}
      </Box>

      <Text p={2} rounded={10}>
        <Tag colorScheme="teal" fontSize="sm" textColor="gray">
          管理者
        </Tag>{' '}
        {partner.users?.map(
          (user) => partner.admin_user === user.id && user.name
        )}
      </Text>

      {partner.users?.map(
        (user) =>
          user.id !== partner.admin_user && (
            <Box p={2} key={user.id}>
              <Text>
                <Tag colorScheme="teal" fontStyle="italic" textColor="gray">
                  パートナー
                </Tag>{' '}
                {user.name}
              </Text>
            </Box>
          )
      )}
    </>
  )
}
export const GroupApplyNameAdminListMemo = memo(GroupApplyNameAdminList)
