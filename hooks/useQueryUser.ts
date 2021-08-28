import { useQuery } from 'react-query'
import axios from 'axios'
import { Schedule, User } from '../types/types'

export const useQueryUser = () => {
  const getUser = async () => {
    const { data } = await axios.get<User[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/users/`
    )
    return data
  }
  return useQuery<User[], Error>({
    queryKey: 'schedule',
    queryFn: getUser,
    staleTime: 10000,
    refetchOnWindowFocus: true,
  })
}
