import { Box, Heading, WrapItem } from '@chakra-ui/react'
import { setEditedSchedule } from '../slices/scheduleSlice'
import { ScheduleCardModalMemo } from './ScheduleCardModal'
import dayjs from 'dayjs'
import { useAppDispatch } from '../app/hooks'
import { memo, useState, VFC } from 'react'
import { Schedule } from '../types/types'

export interface Props {
  schedule: Schedule
}

const ScheduleWrapItem: VFC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { schedule } = props
  const [selectedItem, setSelectedItem] = useState<number>(null)

  const onOpenDialog = (id: number) => {
    setSelectedItem(id)
  }
  const onCloseDialog = () => {
    setSelectedItem(null)
  }

  return (
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
      <ScheduleCardModalMemo
        selectedItem={selectedItem}
        onCloseDialog={onCloseDialog}
        schedule={schedule}
      />
      <Box p={2} shadow="md" borderWidth="1px" borderRadius="md" bg="pink.50">
        <Heading fontSize="md">
          {schedule.time_none
            ? ''
            : dayjs(schedule.schedule_date).format('HH:mm~ ')}

          {schedule.title}
        </Heading>
      </Box>
    </WrapItem>
  )
}
export const ScheduleWrapItemMemo = memo(ScheduleWrapItem)
