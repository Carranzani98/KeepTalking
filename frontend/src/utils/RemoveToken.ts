import { useSessionStorage } from '@mantine/hooks'

const RemoveSessionToken = () => {
  const [token, setToken, removeToken] = useSessionStorage({
    key: 'token',
  })

  return removeToken()
}

export default RemoveSessionToken
