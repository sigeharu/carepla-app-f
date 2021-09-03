import { Box, Button, Center, Tag, Text, useDisclosure } from '@chakra-ui/react'
import React, { memo, useState, VFC } from 'react'
import { PartnerApproval } from '../types/types'
import { useQueryApplying } from '../hooks/useQueryApplying'
import { PartnerApprovalCheckModalMemo } from './PartnerApprovalCheckModal'
import { PartnerApprovalListModalMemo } from './PartnerApprovalListModal'
import ApplyCheck from '../pages/apply-check'
import Link from 'next/link'

const PartnerApprovalCheck: VFC = () => {
  const { data: applying } = useQueryApplying()
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
  const clickHandler = () => {
    return <ApplyCheck />
  }

  return (
    <>
      <Box bg="red.400" p={2} mb={3} rounded={10}>
        <Center>
          <Link href={'/apply-check'}>
            <Text fontSize="small">
              <Tag size="sm">お知らせ</Tag>
              {'  '}パートナー申請が
              {applying.length}
              件あります!
            </Text>
          </Link>
        </Center>
      </Box>
      {/*<PartnerApprovalListModalMemo*/}
      {/*  isOpen={isOpen}*/}
      {/*  onClose={onClose}*/}
      {/*  applying={applying}*/}
      {/*/>*/}
    </>
  )
}
export const PartnerApprovalCheckMemo = memo(PartnerApprovalCheck)
