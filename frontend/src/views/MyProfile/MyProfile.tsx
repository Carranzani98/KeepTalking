import React from 'react'

import { Loader, Center, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import getUser from '../../services/api/models/user/UserApi'
import ProfileForm from './components/ProfileForm'

const GetUserData = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })

const MyProfile = () => {
  //Llamar endpoint getUser de la DB
  const { data, isLoading } = GetUserData()

  if (isLoading) {
    return (
      <Center sx={{ height: '100%', width: '100wh' }}>
        <Loader color="gray" size="xl" />
      </Center>
    )
  }

  if (data?.data) {
    return <ProfileForm data={data.data} />
  }

  return (
    <Center>
      <Title>Try again later</Title>
    </Center>
  )
}

export default MyProfile
