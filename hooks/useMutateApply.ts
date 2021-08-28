import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { resetEditedApply } from '../slices/applySlice'
import { Apply } from '../types/types'

export const useMutateApply = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createApplyMutation = useMutation(
    (apply: Omit<Apply, 'id'>) =>
      axios.post<Apply>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${apply.partner_id}/applies/`,
        apply
      ),
    {
      onSuccess: (res) => {
        dispatch(resetEditedApply())
      },
    }
  )
  return {
    createApplyMutation,
  }
}
