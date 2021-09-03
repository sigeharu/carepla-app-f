import { useQuery } from 'react-query'
import axios from 'axios'
import { PartnerApply, Apply } from '../types/types'
import { selectUser } from '../slices/userSlice'
import { useAppSelector } from '../app/hooks'

export const useQueryApplying = () => {
  const User = useAppSelector(selectUser)
  const getApply = async () => {
    const { data } = await axios.get<Apply[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${User.id}/applies/`
    )
    return data
  }
  return useQuery<Apply[], Error>({
    queryKey: 'applies',
    queryFn: getApply,
    staleTime: 3000,
    refetchOnWindowFocus: true,
  })
}
