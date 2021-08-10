import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Diary, EditedDiary } from '../types/types'
import { RootState } from '../app/store'

export interface diaryState {
  editedDiary: EditedDiary
}

const initialState: diaryState = {
  editedDiary: {
    id: null,
    comment: '',
    user_id: null,
  },
}
export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setEditedDiary: (state, action: PayloadAction<EditedDiary>) => {
      state.editedDiary = action.payload
    },
    resetEditedDiary: (state) => {
      state.editedDiary = initialState.editedDiary
    },
  },
})
export const { setEditedDiary, resetEditedDiary } = diarySlice.actions

export const selectDiary = (state: RootState) => state.diary.editedDiary

export default diarySlice.reducer
