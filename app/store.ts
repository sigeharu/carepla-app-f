import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import diaryReducer from '../slices/diarySlice'
import authSignInReducer from '../slices/authSlilce'
import userReducer from '../slices/userSlice'
import scheduleReducer from '../slices/scheduleSlice'
import partnerReducer from '../slices/partnerSlice'
import approvalReducer from '../slices/approvalSlice'
import applyReducer from '../slices/applySlice'

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    signin: authSignInReducer,
    user: userReducer,
    schedule: scheduleReducer,
    partner: partnerReducer,
    approval: approvalReducer,
    apply: applyReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
