import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Apply, PartnerApplyApproval } from '../types/types'
import { RootState } from '../app/store'

export interface applyState {
  editedApply: Apply
  editedPartnerApplyApproval: PartnerApplyApproval
}

const initialState: applyState = {
  editedApply: {
    id: null,
    user_id: null,
    partner_id: null,
    comment: '',
    user_name: '',
    for_user: null,
  },
  editedPartnerApplyApproval: {
    user_id: null,
    partner_id: null,
    apply_id: null,
  },
}
export const applySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {
    setEditedApply: (state, action: PayloadAction<Apply>) => {
      state.editedApply = action.payload
    },
    resetEditedApply: (state) => {
      state.editedApply = initialState.editedApply
    },
    setEditedPartnerApplyApproval: (
      state,
      action: PayloadAction<PartnerApplyApproval>
    ) => {
      state.editedPartnerApplyApproval = action.payload
    },
    resetEditedPartnerApplyApproval: (state) => {
      state.editedPartnerApplyApproval = initialState.editedPartnerApplyApproval
    },
  },
})
export const {
  setEditedApply,
  resetEditedApply,
  setEditedPartnerApplyApproval,
  resetEditedPartnerApplyApproval,
} = applySlice.actions

export const selectApply = (state: RootState) => state.apply.editedApply
export const selectPartnerApplyApproval = (state: RootState) =>
  state.apply.editedPartnerApplyApproval

export default applySlice.reducer
