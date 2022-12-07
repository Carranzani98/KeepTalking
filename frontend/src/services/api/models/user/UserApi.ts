import { CountriesResponse } from '../../types/CountriesResponse'
import { LanguagesResponse } from '../../types/LanguagesResponse'
import PostResponse from '../../types/PostResponse'
import { RegisterFormValues, UserResponse } from '../../types/User'
import apiClient from '../api/ApiClient'

const getUser = async () => {
  const { data } = await apiClient().get<UserResponse>('/api/user')
  return data
}

export const getCountries = async () => {
  const { data } = await apiClient().get<CountriesResponse>('/api/countries')
  return data
}

export const getLanguages = async () => {
  const { data } = await apiClient().get<LanguagesResponse>('/api/languages')
  return data
}

export const updateProfile = async ({
  email,
  name,
  surname,
  birthday,
  country,
  password,
  languageCodes,
  toLearnLanguageCodes,
  description,
}: RegisterFormValues) => {
  const { data } = await apiClient().put<PostResponse>('/api/update', {
    name,
    surname,
    birthday,
    country,
    description,
    languageCodes,
    toLearnLanguageCodes,
    email,
    password,
  })
  return data
}

export default getUser
