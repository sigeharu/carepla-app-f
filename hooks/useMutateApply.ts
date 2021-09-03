import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useMutation } from 'react-query'
import { resetEditedApply } from '../slices/applySlice'
import { Apply, Partner } from '../types/types'
import { selectGroupSearch } from '../slices/partnerSlice'
import { useMutatePartner } from './useMutatePartner'

export const useMutateApply = () => {
  const dispatch = useAppDispatch()
  const editedGroupSearch = useAppSelector(selectGroupSearch)
  const { createGroupSearchMutation } = useMutatePartner()

  const createApplyMutation = useMutation(
    (apply: Omit<Apply, 'id'>) =>
      axios.post<Partner>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${apply.partner_id}/applies/`,
        apply
      ),
    {
      onSuccess: () => {
        const previousGroup = createGroupSearchMutation.mutate(
          editedGroupSearch.keyword
        )
        dispatch(resetEditedApply())
        return previousGroup
      },
    }
  )
  return {
    createApplyMutation,
  }
}
