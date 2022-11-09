interface User {
  id: number
  name: string
  surname: string
  email: string
  country: string
  birthday: Date
  description: string
}

export interface RegisterFormValues {
  email: string
  name: string
  surname: string
  birthday: Date | string
  country: string
  password: string
  confirmPassword: string
  languageCodes: string[]
  toLearnLanguageCodes: string[]
  description: string
}

export default User
