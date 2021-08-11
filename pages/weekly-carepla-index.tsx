import React, { useState, VFC } from 'react'
import {
  Box,
  Button,
  Stack,
  Text,
  useDisclosure,
  Collapse,
  HStack,
  Spacer,
  VStack,
  Heading,
} from '@chakra-ui/react'
import { DiaryEditFormMemo } from '../components/DiaryEditForm'
import { ScheduleCardListMemo } from '../components/ScheduleCardList'
import { ScheduleEditFormMemo } from '../components/ScheduleEditForm'
import { ScheduleCompletionListMemo } from '../components/ScheduleCompletionList'
import { useQuerySchedule } from '../hooks/useQuerySchedule'
import dayjs from 'dayjs'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'
import { ScheduleWeeklyListMemo } from '../components/ScheduleWeeklyList'

const WeeklyCareplaIndex: VFC = () => {
  const User = useAppSelector(selectUser)
  const { isOpen, onToggle } = useDisclosure()
  const { data } = useQuerySchedule()
  const [openEdit, setOpenEdit] = useState(false)

  const now = dayjs()

  const completionCount = data?.filter(
    (schedule) =>
      now.isSame(schedule.schedule_date, 'day') &&
      schedule.user_id === User?.id &&
      schedule.completion === true &&
      schedule
  )
  return (
    <>
      <Box
        bgGradient="radial(orange.100,orange.200,orange.300)"
        p={2}
        borderRadius="md"
        shadow="md"
        autoFocus
      >
        <Heading className="text-center text-white">週間予定</Heading>
        <ScheduleWeeklyListMemo />
      </Box>
    </>
  )
}
export default WeeklyCareplaIndex
