import { Box, Center, Tag, Text, useDisclosure } from '@chakra-ui/react'
import React, { memo, useState, VFC } from 'react'
import { PartnerApproval } from '../types/types'
import { useQueryApply } from '../hooks/useQueryApply'
import { PartnerApprovalCheckModalMemo } from './PartnerApprovalCheckModal'
import { PartnerApprovalListModalMemo } from './PartnerApprovalListModal'

const PartnerApprovalCheck: VFC = () => {
  const { data: partnerApply } = useQueryApply()
  const [
    selectedPartnerApprovalCheckItem,
    setSelectedPartnerApprovalCheckItem,
  ] = useState<number>(null)
  const onOpenPartnerApprovalCheckDialog = (id: number) => {
    setSelectedPartnerApprovalCheckItem(id)
  }
  const onClosePartnerApprovalCheckDialog = () => {
    setSelectedPartnerApprovalCheckItem(null)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg="red.400" p={2} mb={3} rounded={10} onClick={onOpen}>
        <Center>
          <Text fontSize="small">
            <Tag size="sm">お知らせ</Tag>
            {'  '}パートナー申請が
            {partnerApply.length}
            件あります!
          </Text>
        </Center>
      </Box>
      <PartnerApprovalListModalMemo
        isOpen={isOpen}
        onClose={onClose}
        partnerApply={partnerApply}
      />
    </>
  )
}
export const PartnerApprovalCheckMemo = memo(PartnerApprovalCheck)
