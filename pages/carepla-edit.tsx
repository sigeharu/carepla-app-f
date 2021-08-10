import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { Diary } from '../types/types'
import { ScheduleEditFormMemo } from '../components/ScheduleEditForm'
import ScheduleList from '../components/ScheduleList'
import { HStack, VStack } from '@chakra-ui/react'

const CarePlaEdit: VFC = () => {
  return (
    <VStack>
      <ScheduleEditFormMemo />
      <ScheduleList />
    </VStack>
  )
}

export default CarePlaEdit
