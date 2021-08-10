import { useQuery } from 'react-query'
import axios from 'axios'
import { Schedule } from '../types/types'

export const useQuerySchedule = () => {
  const getSchedule = async () => {
    const { data } = await axios.get<Schedule[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/schedules/`
    )
    return data
  }
  return useQuery<Schedule[], Error>({
    queryKey: 'schedule',
    queryFn: getSchedule,
    staleTime: 10000,
    refetchOnWindowFocus: true,
  })
}
