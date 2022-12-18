import React, { useState } from 'react'

import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  TextInput,
  PasswordInput,
  Text,
  Button,
  Divider,
  Stack,
  Anchor,
  Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLocalStorage, useSessionStorage } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'

import postLogin from '../../../services/api/models/auth/AuthApi'
import { inputsStyles, passwordStyles } from '../../../utils/AuthStyles'

interface LoginFormValues {
  email: string
  password: string
}

const LoginForm = () => {
  const loginMutation = useMutation(postLogin)
  const [_, setToken] = useSessionStorage<string>({
    key: 'token',
  })

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: val =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? null : 'Invalid email',
      password: val =>
        val.length >= 6
          ? null
          : 'Password should include at least 6 characters',
    },
  })

  const handleSubmit = (formValues: LoginFormValues) => {
    loginMutation.mutate(formValues, {
      onSuccess: response => {
        setToken(response.accessToken)
        location.href = '/MainPage'
      },
    })
  }
  return (
    <Box sx={{ width: 369 }}>
      <Text color="dimmed" sx={{ cursor: 'pointer', textAlign: 'center' }}>
        <FontAwesomeIcon size="xl" icon={faGoogle} />
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Stack>
          <TextInput
            size="lg"
            variant="filled"
            styles={inputsStyles}
            required
            placeholder="Enter your email"
            value={form.values.email}
            onChange={event =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            size="lg"
            variant="filled"
            styles={{
              ...passwordStyles,
              ...inputsStyles,
            }}
            required
            placeholder="Enter your password"
            value={form.values.password}
            onChange={event =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
          />
          <Anchor color="gray.5" size="sm" sx={{ textAlign: 'right' }}>
            Forgot password?
          </Anchor>
        </Stack>
        <Button
          mt="xl"
          type="submit"
          fullWidth
          loading={loginMutation.isLoading}
          color="red.8"
          sx={{
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            height: 50,
          }}
        >
          Login
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm
