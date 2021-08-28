import { useQuery } from 'react-query'
import axios from 'axios'
import { GroupSearch, Partner } from '../types/types'

export const useQueryGroupSearch = (keyword: string) => {
  const getGroupSearch = async () => {
    const { data } = await axios.get<Partner[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${keyword}/search`
    )
    return data
  }
  return useQuery<Partner[], Error>({
    queryKey: 'groupSearch',
    queryFn: getGroupSearch,
    staleTime: 10000,
    refetchOnWindowFocus: true,
  })
}
