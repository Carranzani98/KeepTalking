import { SelectItem } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { getLanguages } from '../../services/api/models/user/UserApi'

const Languages = () => {
  //Llamar endpoint getLanguages de la DB
  const languages = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
  })

  const getLanguagesData = () => {
    if (languages.data) {
      return languages.data.data.map(language => ({
        label: language.language_name,
        value: language.code,
      })) as SelectItem[]
    } else {
      return []
    }
  }

  return getLanguagesData()
}

export default Languages
