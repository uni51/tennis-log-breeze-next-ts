export type LoginUser =
  | {
      id?: number | undefined
      name?: string | undefined
      email?: string | undefined
      email_verified_at?: string | undefined
      must_verify_email?: boolean | undefined
      created_at?: string | undefined
      updated_at?: string | undefined
    }
  | undefined
