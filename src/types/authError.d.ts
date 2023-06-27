type LoginFormState = {
  email: string
  password: string
}

type LoginError = Record<keyof LoginFormState, string[] | undefined>
