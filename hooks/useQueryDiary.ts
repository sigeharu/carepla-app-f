import { useQuery } from 'react-query'
import axios from 'axios'
import { Diary, EditedDiary } from '../types/types'

export const useQueryDiary = () => {
  const getDiary = async () => {
    const { data } = await axios.get<Diary[]>(
      `http://localhost:3001/api/v1/diaries/`
    )
    return data
  }
  return useQuery<Diary[], Error>({
    queryKey: 'diary',
    queryFn: getDiary,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
