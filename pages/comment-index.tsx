import React, { VFC } from 'react'
import { DiaryList } from '../components/DiaryList'
import { DiaryEditFormMemo } from '../components/DiaryEditForm'
import { Flex, SimpleGrid, VStack } from '@chakra-ui/react'

const CommentIndex: VFC = () => {
  return (
    <VStack>
      <DiaryList />
    </VStack>
  )
}
export default CommentIndex
