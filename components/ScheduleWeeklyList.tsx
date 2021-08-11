import React, { memo, useState, VFC } from 'react'
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
} from '@chakra-ui/react'

import { useQuerySchedule } from '../hooks/useQuerySchedule'
import dayjs from 'dayjs'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'
import { ScheduleWeeklyCardMemo } from './ScheduleWeeklyCard'

const ScheduleWeeklyList: VFC = () => {
  const User = useAppSelector(selectUser)
  const { status, data } = useQuerySchedule()
  const now = dayjs()

  return (
    <Box>
      <ScheduleWeeklyCardMemo dayNumber={0} weeklyWord={'日'} />
      <ScheduleWeeklyCardMemo dayNumber={1} weeklyWord={'月'} />
      <ScheduleWeeklyCardMemo dayNumber={2} weeklyWord={'火'} />
      <ScheduleWeeklyCardMemo dayNumber={3} weeklyWord={'水'} />
      <ScheduleWeeklyCardMemo dayNumber={4} weeklyWord={'木'} />
      <ScheduleWeeklyCardMemo dayNumber={5} weeklyWord={'金'} />
      <ScheduleWeeklyCardMemo dayNumber={6} weeklyWord={'土'} />
    </Box>
  )
}
export const ScheduleWeeklyListMemo = memo(ScheduleWeeklyList)
