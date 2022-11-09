import axios, { AxiosRequestConfig } from 'axios'

import LoginResponse from '../../types/AuthResponse'
import { CountriesResponse } from '../../types/CountriesResponse'
import { LanguagesResponse } from '../../types/LanguagesResponse'
import PostResponse from '../../types/PostResponse'
import { RegisterFormValues } from '../../types/User'

const apiClient = (config?: AxiosRequestConfig<any>) =>
  axios.create({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
    },
    baseURL: `${location.protocol}//${location.hostname}:8000`,
    withCredentials: true,
    ...config,
  })

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
  languageCodes,
  toLearnLanguageCodes,
  description,
}: RegisterFormValues) => {
  const { data } = await apiClient().post<PostResponse>('/api/register', {
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

export const getCountries = async () => {
  const { data } = await apiClient().get<CountriesResponse>('/api/countries')
  return data
}

export const getLanguages = async () => {
  const { data } = await apiClient().get<LanguagesResponse>('/api/languages')
  return data
}

export default postLogin
