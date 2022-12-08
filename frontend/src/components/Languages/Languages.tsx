import { useQuery } from '@tanstack/react-query'

import { getLanguages } from '../../services/api/models/user/UserApi'

const Languages = () =>
  useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  })

export default Languages
