import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PartnerApproval } from '../types/types'
import { RootState } from '../app/store'
import { string } from 'prop-types'

export interface approvalState {
  editedApproval: PartnerApproval
}

const initialState: approvalState = {
  editedApproval: {
    id: null,
    comment: '',
    partner_approval: false,
    from_user: null,
    for_user: null,
  },
}
export const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    setEditedApproval: (state, action: PayloadAction<PartnerApproval>) => {
      state.editedApproval = action.payload
    },
    resetEditedApproval: (state) => {
      state.editedApproval = initialState.editedApproval
    },
  },
})
export const { setEditedApproval, resetEditedApproval } = approvalSlice.actions

export const selectApproval = (state: RootState) =>
  state.approval.editedApproval

export default approvalSlice.reducer
