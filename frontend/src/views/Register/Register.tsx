import React from 'react'

import { Box, Group } from '@mantine/core'

import CommonInitialText from '../../components/CommonInitialText/CommonInitialText'
import RegisterForm from './components/RegisterForm'

const Register = () => {
  return (
    <Box px="lg" pt="12" pb={0} sx={{ height: '100%' }}>
      <Group
        align="center"
        sx={{ justifyContent: 'space-around', height: '100%' }}
      >
        <Box p={20}>
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
