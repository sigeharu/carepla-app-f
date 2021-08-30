import { useQuery } from 'react-query'
import axios from 'axios'
import { Apply } from '../types/types'
import { selectUser } from '../slices/userSlice'
import { useAppSelector } from '../app/hooks'

export const useQueryPartnerApply = () => {
  const User = useAppSelector(selectUser)
  const getPartnerApply = async () => {
    const { data } = await axios.get<Apply[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${User.id}/applies/`
    )
  }
}
