import React from 'react'

import { Box, Group } from '@mantine/core'

import CommonInitialText from '../../components/CommonInitialText/CommonInitialText'
import LoginForm from './components/LoginForm'

const Login = () => {
  return (
    <Box px="lg" pt="12" pb={0} sx={{ height: '100%' }}>
      <Group
        noWrap
        p={20}
        align="center"
        sx={{ justifyContent: 'space-around', height: '100%' }}
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
