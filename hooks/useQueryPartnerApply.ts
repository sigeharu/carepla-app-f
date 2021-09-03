import { useQuery } from 'react-query'
import axios from 'axios'
import { Apply } from '../types/types'
import { selectUser } from '../slices/userSlice'
import { useAppSelector } from '../app/hooks'

export const useQueryPartnerApply = (partner_id: number) => {
  const User = useAppSelector(selectUser)
  const getPartnerApply = async () => {
    const { data } = await axios.get<Apply[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${partner_id}/applies/${User.id}/`
    )
    return data
  }
  return useQuery<Apply[], Error>({
    queryKey: 'applying',
    queryFn: getPartnerApply,
    staleTime: 3000,
    refetchOnWindowFocus: true,
  })
}
