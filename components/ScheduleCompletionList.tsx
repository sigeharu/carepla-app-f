import { memo, useState, VFC } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'
import { useQuerySchedule } from '../hooks/useQuerySchedule'
import { Box, Heading, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { ScheduleCompletionModalMemo } from './ScheduleCompletionModal'
import { setEditedSchedule } from '../slices/scheduleSlice'

const ScheduleCompletionList: VFC = () => {
  const dispatch = useAppDispatch()
  const User = useAppSelector(selectUser)
  const { status, data } = useQuerySchedule()
  const [selectedItem, setSelectedItem] = useState<number>(null)
  const now = dayjs()

  const onOpenDialog = (id: number) => {
    setSelectedItem(id)
  }
  const onCloseDialog = () => {
    setSelectedItem(null)
  }

  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <HStack>
      <Wrap spacing={2} justify="center">
        {data
          ?.sort((a, b) => (a.schedule_date > b.schedule_date ? 1 : -1))
          .map(
            (schedule) =>
              now.isSame(schedule.schedule_date, 'day') &&
              schedule.user_id === User?.id &&
              schedule.completion === true && (
                <WrapItem
                  key={schedule.id}
                  boxShadow="base"
                  rounded="20px"
                  overflow="hidden"
                  bg="white"
                  lineHeight="0"
                  _hover={{ boxShadow: 'dark-lg' }}
                  onClick={() => {
                    dispatch(
                      setEditedSchedule({
                        ...schedule,
                      })
                    ),
                      onOpenDialog(schedule.id)
                  }}
                >
                  <ScheduleCompletionModalMemo
                    selectedItem={selectedItem}
                    onCloseDialog={onCloseDialog}
                    schedule={schedule}
                  />
                  <Box
                    p={2}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                    bg="teal.100"
                  >
                    <Heading fontSize="md">
                      {schedule.time_none
                        ? ''
                        : dayjs(schedule.schedule_date).format('HH:mm~ ')}

                      {schedule.title}
                    </Heading>
                  </Box>
                </WrapItem>
              )
          )}
      </Wrap>
    </HStack>
  )
}
export const ScheduleCompletionListMemo = memo(ScheduleCompletionList)
