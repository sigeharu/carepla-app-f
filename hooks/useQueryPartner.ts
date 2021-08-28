import { useQuery } from 'react-query'
import axios from 'axios'
import { Partner } from '../types/types'
import { selectUser } from '../slices/userSlice'
import { useAppSelector } from '../app/hooks'

export const useQueryPartner = () => {
  const User = useAppSelector(selectUser)
  const getPartner = async () => {
    const { data } = await axios.get<Partner[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${User.id}/`
    )
    return data
  }
  return useQuery<Partner[], Error>({
    queryKey: 'partner',
    queryFn: getPartner,
    staleTime: 3000,
    refetchOnWindowFocus: true,
  })
}
