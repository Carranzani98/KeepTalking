interface User {
  id?: number
  name: string
  surname: string
  email: string
  country: string
  birthday: Date | string
  description: string
  languageCodes: string[]
  toLearnLanguageCodes: string[]
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

export interface UserResponse extends Response {
  data: User
}

export default User
