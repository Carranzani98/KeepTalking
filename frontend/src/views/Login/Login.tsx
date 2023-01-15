import React from 'react'

import { Box, Group, MediaQuery } from '@mantine/core'

import CommonInitialText from '../../components/CommonInitialText/CommonInitialText'
import LoginForm from './components/LoginForm'

const Login = () => {
  return (
    <Box px="lg" pt="12" pb={0} sx={{ height: '100%' }}>
      <MediaQuery largerThan="sm" styles={{ gap: 20 }}>
        <Group
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
      </MediaQuery>
    </Box>
  )
}

export default Login
