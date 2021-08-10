import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { User } from '../types/types'

export interface UserState {
  User: User
  isSignedIn: boolean
}

export const initialState: UserState = {
  User: {
    id: null,
    uid: '',
    provider: '',
    email: '',
    name: '',
    nickname: '',
    image: '',
    allowPasswordChange: false,
    created_at: null,
    updated_at: null,
  },
  isSignedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.User = action.payload
    },
    resetUser: (state) => {
      state.User = initialState.User
    },
    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload
    },
    resetIsSignedIn: (state) => {
      state.isSignedIn = initialState.isSignedIn
    },
  },
})
export const { setUser, resetUser, setIsSignedIn, resetIsSignedIn } =
  userSlice.actions

export const selectUser = (state: RootState) => state.user.User
export const selectIsSignedIn = (state: RootState) => state.user.isSignedIn

export default userSlice.reducer
