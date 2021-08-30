import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { resetEditedPartner } from '../slices/partnerSlice'
import {
  Apply,
  EditedPartner,
  Partner,
  PartnerApplyApproval,
} from '../types/types'
import { resetEditedPartnerApplyApproval } from '../slices/applySlice'

export const useMutatePartner = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createGroupSearchMutation = useMutation(
    (keyword: string) =>
      axios.get(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${keyword}/search/`
      ),
    {
      onSuccess: (res) => {
        queryClient.setQueryData<Partner[]>('groupSearch', res.data)
      },
    }
  )
  const createGroupMutation = useMutation(
    (group: Omit<EditedPartner, 'id'>) =>
      axios.post<Partner>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/`,
        group
      ),
    {
      onSuccess: (res) => {
        const previousGroup = queryClient.getQueryData<Partner[]>('partner')
        if (previousGroup) {
          queryClient.setQueryData<Partner[]>('partner', [
            res.data,
            ...previousGroup,
          ])
        }
        dispatch(resetEditedPartner())
      },
    }
  )
  const updateGroupMutation = useMutation(
    (group: EditedPartner) =>
      axios.put<Partner>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${group.id}/`,
        group
      ),
    {
      onSuccess: (res, variables) => {
        const previousGroup = queryClient.getQueryData<Partner[]>('partner')
        console.log(previousGroup)
        console.log(res.data)
        console.log(variables.id)
        if (previousGroup) {
          queryClient.setQueryData<Partner[]>(
            'partner',
            previousGroup.map((group) =>
              group.id === variables.id ? res.data : group
            )
          )
        }
        dispatch(resetEditedPartner())
      },
    }
  )
  const createPartnerMutation = useMutation(
    (partnerApplyApproval: PartnerApplyApproval) =>
      axios.post<Apply>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${partnerApplyApproval.partner_id}/group_users/`,
        partnerApplyApproval
      ),
    {
      onSuccess: (res, variables) => {
        const previousApply = queryClient.getQueryData<Apply[]>('applies')
        if (previousApply) {
          queryClient.setQueryData<Apply[]>(
            'applies',
            previousApply.filter((apply) => apply.id !== variables.apply_id)
          )
        }
        dispatch(resetEditedPartnerApplyApproval())
      },
    }
  )
  const deleteGroupMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/partners/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousGroup = queryClient.getQueryData<Partner[]>('partner')
        console.log(previousGroup)
        if (previousGroup) {
          queryClient.setQueryData<Partner[]>(
            'partner',
            previousGroup.filter((group) => group.id !== variables)
          )
        }
        dispatch(resetEditedPartner())
      },
    }
  )
  return {
    createGroupSearchMutation,
    createGroupMutation,
    updateGroupMutation,
    createPartnerMutation,
    deleteGroupMutation,
  }
}
