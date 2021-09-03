import React, { VFC } from 'react'
import {
  Box,
  Button,
  Center,
  HStack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMutatePartner } from '../hooks/useMutatePartner'
import { useQueryApplying } from '../hooks/useQueryApplying'

const ApplyCheck: VFC = () => {
  const { createPartnerMutation, deleteApplyMutation } = useMutatePartner()
  const { data: applying } = useQueryApplying()
  const onClickHandler = (apply) => {
    createPartnerMutation.mutate({
      user_id: apply.user_id,
      partner_id: apply.partner_id,
      apply_id: apply.id,
    })
  }
  const onClickDeleteHandler = (id: number) => {
    deleteApplyMutation.mutate(id)
  }
  return (
    <>
      <Box bg="orange.200" p={3} rounded={20}>
        <Text textColor="gray" fontSize="sm">
          パートナー申請を承認するとグループに加入されます!
        </Text>
      </Box>
      <VStack>
        {applying?.map((apply) => (
          <Box bg="teal.500" p={2} mt={4} rounded={10} key={apply.id}>
            <Box bg="white" p={4} rounded={10}>
              <Text>
                <Tag colorScheme="purple">メッセージ</Tag> {apply.comment}
              </Text>
              <Text p={2}>
                <Tag colorScheme="teal">申請者</Tag> {apply.user_name}
              </Text>
              <Center>
                <HStack p={2}>
                  <Button
                    bg="orange.400"
                    textColor="white"
                    onClick={() => onClickHandler(apply)}
                  >
                    申請を承認
                  </Button>
                  <Button
                    bg="purple.400"
                    textColor="white"
                    onClick={() => onClickDeleteHandler(apply.id)}
                  >
                    申請を拒否
                  </Button>
                </HStack>
              </Center>
            </Box>
          </Box>
        ))}
      </VStack>
    </>
  )
}
export default ApplyCheck
