import axios, { AxiosRequestConfig } from 'axios'

const apiClient = (config?: AxiosRequestConfig<any>) =>
  axios.create({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
      Authorization: `Bearer ${sessionStorage.token?.replace(/['"]+/g, '')}`,
      Accept: 'application/json,',
    },
    baseURL: `${location.protocol}//${location.hostname}:8000`,
    withCredentials: true,
    ...config,
  })

export default apiClient
