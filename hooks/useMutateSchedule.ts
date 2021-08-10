import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { EditedSchedule, Schedule } from '../types/types'
import { resetEditedSchedule } from '../slices/scheduleSlice'

export const useMutateSchedule = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createScheduleMutation = useMutation(
    (schedule: Omit<EditedSchedule, 'id'>) =>
      axios.post<Schedule>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/schedules/`,
        schedule
      ),
    {
      onSuccess: (res) => {
        const previousSchedule =
          queryClient.getQueryData<Schedule[]>('schedule')
        if (previousSchedule) {
          queryClient.setQueryData<Schedule[]>('schedule', [
            res.data,
            ...previousSchedule,
          ])
        }
        dispatch(resetEditedSchedule())
      },
    }
  )
  const updateScheduleMutation = useMutation(
    (schedule: EditedSchedule) =>
      axios.put<Schedule>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/schedules/${schedule.id}/`,
        schedule
      ),
    {
      onSuccess: (res, variables) => {
        const previousSchedule =
          queryClient.getQueryData<Schedule[]>('schedule')
        if (previousSchedule) {
          queryClient.setQueryData<Schedule[]>(
            'schedule',
            previousSchedule.map((schedule) =>
              schedule.id === variables.id ? res.data : schedule
            )
          )
        }
        dispatch(resetEditedSchedule())
      },
    }
  )
  const deleteScheduleMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/schedules/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousSchedule =
          queryClient.getQueryData<Schedule[]>('schedule')
        if (previousSchedule) {
          queryClient.setQueryData<Schedule[]>(
            'schedule',
            previousSchedule.filter((schedule) => schedule.id !== variables)
          )
        }
        dispatch(resetEditedSchedule())
      },
    }
  )
  return {
    createScheduleMutation,
    updateScheduleMutation,
    deleteScheduleMutation,
  }
}
