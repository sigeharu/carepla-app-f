import { VFC, memo } from 'react'
import { useAppDispatch } from '../app/hooks'
import { setEditedSchedule } from '../slices/scheduleSlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { EditedSchedule, Schedule } from '../types/types'

interface Props {
  schedule: EditedSchedule
}

const ScheduleItem: VFC<Props> = ({ schedule }) => {
  const dispatch = useAppDispatch()
  const { deleteScheduleMutation } = useMutateSchedule()
  if (deleteScheduleMutation.isLoading) {
    return <p>Deleting</p>
  }
  return (
    <li className="my-3">
      <span className="font-bold">{schedule.title}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedSchedule({
                id: schedule.id,
                title: schedule.title,
                schedule_date: schedule.schedule_date,
                completion: false,
                user_id: schedule.user_id,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteScheduleMutation.mutate(schedule.id)
          }}
        />
      </div>
    </li>
  )
}
export const ScheduleItemMemo = memo(ScheduleItem)
