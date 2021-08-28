import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { useQueryClient, useMutation } from 'react-query'
import { resetEditedApproval } from '../slices/approvalSlice'
import { EditedPartner, Partner, PartnerApproval } from '../types/types'

export const useMutateApproval = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createApprovalMutation = useMutation(
    (approval: Omit<PartnerApproval, 'id'>) =>
      axios.post<PartnerApproval>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/partner_approvals/`,
        approval
      ),
    {
      onSuccess: (res) => {
        dispatch(resetEditedApproval())
      },
    }
  )
  return {
    createApprovalMutation,
  }
}
