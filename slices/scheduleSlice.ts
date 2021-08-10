import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditedSchedule } from '../types/types'
import { RootState } from '../app/store'

export interface scheduleState {
  editedSchedule: EditedSchedule
}

const initialState: scheduleState = {
  editedSchedule: {
    id: null,
    title: '',
    schedule_date: null,
    completion: false,
    user_id: null,
  },
}
export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setEditedSchedule: (state, action: PayloadAction<EditedSchedule>) => {
      state.editedSchedule = action.payload
    },
    resetEditedSchedule: (state) => {
      state.editedSchedule = initialState.editedSchedule
    },
  },
})
export const { setEditedSchedule, resetEditedSchedule } = scheduleSlice.actions

export const selectSchedule = (state: RootState) =>
  state.schedule.editedSchedule

export default scheduleSlice.reducer
