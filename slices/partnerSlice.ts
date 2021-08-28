import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Partner, EditedPartner, GroupSearch } from '../types/types'
import { RootState } from '../app/store'

export interface partnerState {
  editedPartner: EditedPartner
  editedGroupSearch: GroupSearch
}

const initialState: partnerState = {
  editedPartner: {
    id: null,
    partner_group: '',
    partner_group_description: '',
    admin_user: null,
    recruit_partner: false,
  },
  editedGroupSearch: {
    keyword: '',
  },
}
export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setEditedPartner: (state, action: PayloadAction<EditedPartner>) => {
      state.editedPartner = action.payload
    },
    setEditedGroupSearch: (state, action: PayloadAction<GroupSearch>) => {
      state.editedGroupSearch = action.payload
    },
    resetEditedPartner: (state) => {
      state.editedPartner = initialState.editedPartner
    },
  },
})
export const { setEditedPartner, setEditedGroupSearch, resetEditedPartner } =
  partnerSlice.actions

export const selectPartner = (state: RootState) => state.partner.editedPartner
export const selectGroupSearch = (state: RootState) =>
  state.partner.editedGroupSearch

export default partnerSlice.reducer
