import React from 'react'

import { Box, Group } from '@mantine/core'

import CommonInitialText from '../../components/CommonInitialText/CommonInitialText'
import Header from '../../components/Header/Header'
import LoginForm from './components/LoginForm'

const Login = () => {
  return (
    <Box px="lg" pt="12" pb={0}>
      <Header view="loginAndRegister" />
      <Group
        noWrap
        p={30}
        align="stretch"
        sx={{ justifyContent: 'space-around' }}
      >
        <CommonInitialText
          view="login"
          title="Sign in"
          text="If you don't have an account register"
          anchorText="Register here!"
        />

        <LoginForm />
      </Group>
    </Box>
  )
}

export default Login
