import { memo, VFC } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'
import { useQuerySchedule } from '../hooks/useQuerySchedule'
import { HStack, Wrap } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { ScheduleWrapItemMemo } from './ScheduleWrapItem'

const ScheduleCardList: VFC = () => {
  const User = useAppSelector(selectUser)
  const { status, data } = useQuerySchedule()
  const now = dayjs()

  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <HStack>
      <Wrap spacing={2} justify="center">
        {data
          ?.sort((a, b) => (a.schedule_date > b.schedule_date ? 1 : -1))
          .map(
            (schedule) =>
              (schedule.takeover && (
                <ScheduleWrapItemMemo schedule={schedule} />
              )) ||
              (now.isSame(schedule.schedule_date, 'day') &&
                schedule.user_id === User?.id &&
                !schedule.completion && (
                  <ScheduleWrapItemMemo schedule={schedule} />
                ))
          )}
      </Wrap>
    </HStack>
  )
}
export const ScheduleCardListMemo = memo(ScheduleCardList)
