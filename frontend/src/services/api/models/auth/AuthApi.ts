import LoginResponse from '../../types/AuthResponse'
import PostResponse from '../../types/PostResponse'
import Response from '../../types/Response'
import { RegisterFormValues } from '../../types/User'
import apiClient from '../api/ApiClient'

const postLogin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const { data } = await apiClient().post<LoginResponse>('/api/login', {
    email,
    password,
  })
  return data
}

export const postRegister = async ({
  email,
  name,
  surname,
  birthday,
  country,
  password,
  languages_to_learn,
  languages_to_teach,
  description,
}: RegisterFormValues) => {
  const { data } = await apiClient().post<PostResponse>('/api/register', {
    name,
    surname,
    birthday,
    country,
    description,
    languages_to_learn,
    languages_to_teach,
    email,
    password,
  })
  return data
}
export const postLogout = async () => {
  const { data } = await apiClient().post<Response>('/api/logout')
  return data
}

export default postLogin
