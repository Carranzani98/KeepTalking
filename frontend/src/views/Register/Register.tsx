import React from 'react'

import { Box, Group } from '@mantine/core'

import CommonInitialText from '../../components/CommonInitialText/CommonInitialText'
import Header from '../../components/Header/Header'
import RegisterForm from './components/RegisterForm'

const Register = () => {
  return (
    <Box px="lg" pt="12" pb={0}>
      <Header view="loginAndRegister" />
      <Group
        noWrap
        sx={{ justifyContent: 'space-around', alignItems: 'stretch' }}
      >
        <Box p={30}>
          <CommonInitialText
            view="register"
            title="Sign up"
            text="If you already have an aacount"
            anchorText="Login here!"
          />
        </Box>

        <RegisterForm />
      </Group>
    </Box>
  )
}

export default Register
