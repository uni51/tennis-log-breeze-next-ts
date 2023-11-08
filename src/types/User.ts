export interface User {
  data?: {
    id?: number
    name?: string
    nickname?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
  }
}

export interface simpleUser {
  id?: number
  firebase_uid?: string
  name?: string
  nickname?: string
  email?: string
  email_verified_at?: string
  must_verify_email?: boolean // this is custom attribute
  created_at?: string
  updated_at?: string
}
