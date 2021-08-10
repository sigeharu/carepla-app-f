import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import {
  User,
  SignUpParams,
  SignInParams,
  AuthSingInParams,
} from '../types/types'

export interface authSignInState {
  authSignIn: AuthSingInParams
}

const initialState: authSignInState = {
  authSignIn: {
    isSignedIn: false,
    email: '',
    password: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSignIn: (state, action: PayloadAction<AuthSingInParams>) => {
      state.authSignIn = action.payload
    },
  },
})

export const { setAuthSignIn } = authSlice.actions

// export const selectAuthSignIn = (state: RootState) => state.auth.setAuthSignIn

export default authSlice.reducer
