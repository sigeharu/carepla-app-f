import { useQuery } from 'react-query'
import axios from 'axios'
import { PartnerApproval } from '../types/types'
import { selectUser } from '../slices/userSlice'
import { useAppSelector } from '../app/hooks'

export const useQueryPartnerApproval = () => {
  const User = useAppSelector(selectUser)
  const getPartnerApproval = async () => {
    const { data } = await axios.get<PartnerApproval[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partner_approvals/${User.id}/`
    )
    return data
  }
  return useQuery<PartnerApproval[], Error>({
    queryKey: 'partnerApproval',
    queryFn: getPartnerApproval,
    staleTime: 3000,
    refetchOnWindowFocus: true,
  })
}
