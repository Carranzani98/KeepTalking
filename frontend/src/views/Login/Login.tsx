import React from 'react'

import { Box, Group, Image, Stack } from '@mantine/core'

import CommonInitialText from '../../components/CommonInitialText/CommonInitialText'
import Header from '../../components/Header/Header'
import LoginForm from './components/LoginForm'

const Login = () => {
  return (
    <Box px="lg" pt="12" pb={0}>
      <Header view="loginAndRegister" />
      <Group
        noWrap
        p={50}
        pb={30}
        sx={{ justifyContent: 'space-around', alignItems: 'stretch' }}
      >
        <Stack sx={{ alignItems: 'center' }} spacing="xs">
          <CommonInitialText
            view="login"
            title="Sign in"
            text="If you don't have an account register"
            anchorText="Register here!"
          />
          <Image
            mt="xl"
            src="images/auth-ilustration.png"
            alt="Girl chatting with her phone"
            fit="contain"
            width={450}
            height={255}
            withPlaceholder
          />
        </Stack>

        <LoginForm />
      </Group>
    </Box>
  )
}

export default Login
