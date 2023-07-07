export type LoginFormState = {
  email: string
  password: string
}

export type LoginError = Record<keyof LoginFormState, string[] | undefined>
