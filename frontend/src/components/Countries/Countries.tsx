import { SelectItem } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { getCountries } from '../../services/api/models/user/UserApi'

const Countries = () => {
  //Llamar endpoint getCountries de la DB
  const countries = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  })

  const getCountriesData = () => {
    if (countries.data) {
      return countries.data.data.map(country => ({
        label: country.country,
        value: country.code,
      })) as SelectItem[]
    } else {
      return []
    }
  }
  return getCountriesData()
}

export default Countries
