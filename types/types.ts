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
  takeover: boolean
  time_none: boolean
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface EditedSchedule {
  id: number
  title: string
  schedule_date: Date
  completion: boolean
  takeover: boolean
  time_none: boolean
  user_id: number
}

export interface Partner {
  id: number
  partner_group: string
  partner_group_description: string
  admin_user: number
  recruit_partner: boolean
  created_at: Date
  updated_at: Date
  users: User[]
  applies: Apply[]
}

export interface EditedPartner {
  id: number
  partner_group: string
  partner_group_description: string
  admin_user: number
  recruit_partner: boolean
}

export interface PartnerApproval {
  id: number
  comment: string
  partner_approval: boolean
  from_user: number
  for_user: number
}

export interface GroupSearch {
  keyword: string | null
}

export interface Apply {
  id: number
  user_id: number
  partner_id: number
  comment: string
  user_name: string
  for_user: number
}

export interface PartnerApply {
  id: number
  partner_group: string
  admin_user: number
  applies: Apply[]
}

export interface PartnerApplyApproval {
  user_id: number
  partner_id: number
  apply_id: number
}
