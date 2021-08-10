import exp from 'constants'

export interface TodayTask {
  id: number
  title: string
  comment: string
  scheduleTaskTime: string
  created_at: string
  updated_at: string
}

export interface EditedDiary {
  id: number
  comment: string
  user_id: number
}
export interface Diary {
  id: number
  comment: string
  user_id: number
  created_at: Date
  updated_at: Date
}

// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

export interface AuthSingInParams {
  isSignedIn: boolean
  email: ''
  password: ''
}

export interface Schedule {
  id: number
  title: string
  schedule_date: Date
  completion: boolean
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface EditedSchedule {
  id: number
  title: string
  schedule_date: Date
  user_id: number
  completion: boolean
}
