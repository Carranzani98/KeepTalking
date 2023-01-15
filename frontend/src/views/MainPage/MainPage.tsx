import React, { useState } from 'react'

import {
  Center,
  Flex,
  Group,
  Loader,
  MediaQuery,
  MultiSelect,
  ScrollArea,
  SelectItem,
  Stack,
  Text,
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import GetUserData from '../../components/GetUserData/GetUserData'
import Languages from '../../components/Languages/Languages'
import SearchInput from '../../components/SearchInput/SearchInput'
import UserCard from '../../components/UserCard/UserCard'
import { matchingUsers } from '../../services/api/models/user/UserApi'
import { Language } from '../../services/api/types/LanguagesResponse'
import User from '../../services/api/types/User'

const multiSelectStyles: Record<
  string,
  React.CSSProperties | Record<string, React.CSSProperties>
> = {
  root: {
    width: 250,
  },
  searchInput: {
    '&::placeholder': { color: '#E2BEBE', fontSize: 15 },
  },
  values: {
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  value: {
    fontSize: 13,
    fontWeight: 400,
    borderRadius: 50,
    backgroundColor: '#FFEFEF',
    color: '#BD6A6A',
    paddingLeft: 10,
  },
  input: {
    borderColor: '#C3BEBE',
    color: '#805252',
    '&:focus, &:focus-within': {
      borderColor: '#BD6A6A',
    },
    '&::placeholder': { color: '#E2BEBE', fontSize: 15 },
  },
}

const MainPage = () => {
  const [queryName, setQueryName] = useState<string>('')
  const [queryLanguagesToTeach, setQueryLanguagesToTeach] = useState<string[]>(
    []
  )
  const [queryLanguagesToLearn, setQueryLanguagesToLearn] = useState<string[]>(
    []
  )

  const userQuery = GetUserData()
  const languagesQuery = Languages()
  const { data, isLoading } = useQuery({
    queryKey: ['matchingUsers'],
    queryFn: matchingUsers,
  })

  if (isLoading) {
    return (
      <Center sx={{ height: '100%', width: '100wh' }}>
        <Loader color="gray" size="xl" />
      </Center>
    )
  }

  const filteredData = data?.data.filter(
    user =>
      user.name.toLowerCase().includes(queryName.toLowerCase().trim()) &&
      (queryLanguagesToTeach.length === 0 ||
        user.languages_to_learn.some(
          el => queryLanguagesToTeach.indexOf(el.language_name) >= 0
        )) &&
      (queryLanguagesToLearn.length === 0 ||
        user.languages_to_teach.some(
          el => queryLanguagesToLearn.indexOf(el.language_name) >= 0
        ))
  )

  const getLanguages = (variable: string) => {
    if (userQuery.data?.data[variable as keyof User]) {
      return (userQuery.data?.data[variable as keyof User] as Language[]).map(
        languageFromUser => ({
          label: languagesQuery.data?.data.find(
            language => language.id === languageFromUser.id
          )?.language_name,
          value: languagesQuery.data?.data.find(
            language => language.id === languageFromUser.id
          )?.language_name,
        })
      ) as SelectItem[]
    } else {
      return []
    }
  }

  const usersCards = filteredData?.map(user => (
    <UserCard
      key={user.id}
      userId={user.id}
      name={user.name + ' ' + user.surname}
      description={user.description}
      languagesUser={user.languages_to_teach.map(lang => lang.language_name)}
      languagesToLearn={user.languages_to_learn.map(lang => lang.language_name)}
    />
  ))

  return (
    <MediaQuery smallerThan="sm" styles={{ gap: 0 }}>
      <Stack>
        <MediaQuery smallerThan="sm" styles={{ flexWrap: 'wrap' }}>
          <Flex my="xl" justify="center" gap="xs">
            <SearchInput
              onChange={event => setQueryName(event.currentTarget.value)}
            />

            <MultiSelect
              size="md"
              radius="xl"
              styles={multiSelectStyles}
              data={
                !userQuery.isLoading && !languagesQuery.isLoading
                  ? getLanguages('languages_to_teach')
                  : []
              }
              placeholder={
                !userQuery.isLoading && !languagesQuery.isLoading
                  ? 'Select language to teach'
                  : 'Loading'
              }
              icon={
                userQuery.isLoading || languagesQuery.isLoading ? (
                  <Loader size="xs" color="#BD6A6A" />
                ) : null
              }
              clearable
              searchable
              onChange={values => setQueryLanguagesToTeach(values)}
            />

            <MultiSelect
              size="md"
              radius="xl"
              styles={multiSelectStyles}
              data={
                !userQuery.isLoading && !languagesQuery.isLoading
                  ? getLanguages('languages_to_learn')
                  : []
              }
              placeholder={
                !userQuery.isLoading && !languagesQuery.isLoading
                  ? 'Select language to learn'
                  : 'Loading'
              }
              icon={
                userQuery.isLoading || languagesQuery.isLoading ? (
                  <Loader size="xs" color="#BD6A6A" />
                ) : null
              }
              clearable
              searchable
              onChange={values => setQueryLanguagesToLearn(values)}
            />
          </Flex>
        </MediaQuery>

        <ScrollArea
          sx={{ height: 'calc(100vh - 96px - 66px - 90px - 24px)' }}
          scrollbarSize={8}
        >
          {usersCards && usersCards.length !== 0 ? (
            <Group position="center" mt="xl">
              {usersCards}
            </Group>
          ) : (
            <Text color="dimmed" size="xl" align="center" mt="xl" fw={700}>
              No results were found
            </Text>
          )}
        </ScrollArea>
      </Stack>
    </MediaQuery>
  )
}

export default MainPage
