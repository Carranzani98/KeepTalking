import { useQuery } from '@tanstack/react-query'

import getUser from '../services/api/models/user/UserApi'

const GetUserData = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })

export default GetUserData
