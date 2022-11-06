import React from 'react'

import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  Title,
  Anchor,
} from '@mantine/core'
import { useForm } from '@mantine/form'

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  })

  const inputsStyles = {
    input: {
      height: 50,
      backgroundColor: '#FFEFEF',
      color: '#FF7E7E',
      '&:focus, &:focus-within': {
        borderColor: '#FFEFEF',
      },
      '&::placeholder': {
        color: '#FF7E7E',
      },
    },
  }

  return (
    <Paper radius="md" sx={{ width: 369 }}>
      <Title order={2} weight="normal">
        Sign In
      </Title>

      <Group mb="md" mt="md" position="center">
        <Text color="dimmed" sx={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faGoogle} />
        </Text>
        <Text color="dimmed" sx={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faFacebook} />
        </Text>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          console.log(form.values)
        })}
      >
        <Stack>
          <TextInput
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
            variant="filled"
            styles={{
              innerInput: {
                '&::placeholder': {
                  color: '#FF7E7E',
                },
              },
              visibilityToggle: {
                color: '#FF7E7E',
              },
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
          color="red.8"
          sx={{
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            height: 50,
          }}
        >
          Login
        </Button>
      </form>
    </Paper>
  )
}

export default LoginForm
