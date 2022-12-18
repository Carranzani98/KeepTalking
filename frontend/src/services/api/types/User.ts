import { Language } from './LanguagesResponse'

interface User {
  id: number
  name: string
  surname: string
  email: string
  country: string
  birthday: Date | string
  description: string
  languages_to_teach: Language[]
  languages_to_learn: Language[]
}

export interface RegisterFormValues {
  email: string
  name: string
  surname: string
  birthday: Date | string
  country: string
  password: string
  confirmPassword: string
  languages_to_teach: string[]
  languages_to_learn: string[]
  description: string
}

export interface UserResponse extends Response {
  data: User
}

export interface UsersResponse extends Response {
  data: User[]
}

export default User
