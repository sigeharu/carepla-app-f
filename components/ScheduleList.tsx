import React, { VFC } from 'react'
import { Box, Divider, Flex, Heading, Stack } from '@chakra-ui/react'
import { useQuerySchedule } from '../hooks/useQuerySchedule'
import Link from 'next/link'
import { selectUser, setUser } from '../slices/userSlice'
import { useAppSelector } from '../app/hooks'
import Moment from 'react-moment'
import { ScheduleItemMemo } from './ScheduleItem'

const ScheduleList: VFC = () => {
  const User = useAppSelector(selectUser)

  const { status, data } = useQuerySchedule()
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <Box bg="pink.50" p={4} borderRadius="md" shadow="md">
      {data?.map(
        (schedule) =>
          schedule.user_id === User?.id && (
            <Box key={schedule.id}>
              <ScheduleItemMemo schedule={schedule} />
            </Box>
          )
      )}
    </Box>
  )
}
export default ScheduleList
