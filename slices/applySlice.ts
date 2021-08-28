import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Apply } from '../types/types'
import { RootState } from '../app/store'

export interface applyState {
  editedApply: Apply
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
  },
})
export const { setEditedApply, resetEditedApply } = applySlice.actions

export const selectApply = (state: RootState) => state.apply.editedApply

export default applySlice.reducer
