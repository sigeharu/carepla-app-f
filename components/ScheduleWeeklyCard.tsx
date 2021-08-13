import React, { memo, VFC } from 'react'
import { Box, Text, HStack } from '@chakra-ui/react'

import { useQuerySchedule } from '../hooks/useQuerySchedule'
import dayjs from 'dayjs'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'

export interface Props {
  dayNumber: number
  weeklyWord: string
}

const ScheduleWeeklyCard: VFC<Props> = (props) => {
  const User = useAppSelector(selectUser)
  const { status, data } = useQuerySchedule()
  const { dayNumber, weeklyWord } = props
  const now = dayjs()
  const schedules = data
    ?.sort((a, b) => (a.schedule_date > b.schedule_date ? 1 : -1))
    .filter((schedule) => schedule.user_id === User?.id)
  const handleClick = () => {}

  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <Box bg="white" p={2} my={2} rounded={10}>
      <Text className="font-bold">
        {dayjs().day(dayNumber).format('MM/DD')}({weeklyWord})
      </Text>
      {schedules?.map(
        (schedule) =>
          now.day(dayNumber).isSame(schedule.schedule_date, 'day') && (
            <HStack my={2}>
              {schedule.time_none ? (
                ''
              ) : (
                <Text className="font-bold text-blue-600">
                  {dayjs(schedule.schedule_date).format('HH:mm')}~
                </Text>
              )}
              <Text className="font-bold">{schedule.title}</Text>
            </HStack>
          )
      )}
    </Box>
  )
}
export const ScheduleWeeklyCardMemo = memo(ScheduleWeeklyCard)
