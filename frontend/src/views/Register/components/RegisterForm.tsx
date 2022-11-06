import React from 'react'

import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Divider,
  Stack,
  Title,
  Select,
  MultiSelect,
  Textarea,
  Box,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'

import {
  inputsStyles,
  mainAuthColor,
  multiSelect,
  passwordStyles,
} from '../../../utils/AuthStyles'

const RegisterForm = () => {
  //Llamar endpoint getCountries de la DB
  const countries = [
    { value: 'ES', label: 'Spain' },
    { value: 'ARG', label: 'Argentina' },
    { value: 'EN', label: 'England' },
    { value: 'CU', label: 'Cuba' },
  ]

  //Llamar endpoint getLanguages de la DB
  const languages = [
    { value: 'ES', label: 'Spanish' },
    { value: 'EN', label: 'English' },
    { value: 'FR', label: 'French' },
    { value: 'IT', label: 'Italian' },
  ]

  const form = useForm({
    initialValues: {
      email: '',
      user: {
        name: '',
        surname: '',
        birthday: new Date(),
        country: '',
      },
      password: '',
      confirmPassword: '',
      languages: [''],
      languagesToLearn: [''],
      description: '',
    },

    validate: {
      email: val =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? null : 'Invalid email',
      user: {
        name: val =>
          val.length < 2 ? 'Name must have at least 2 characters' : null,
        surname: val =>
          val.length < 2 ? 'Name must have at least 2 characters' : null,
      },
      password: val =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      confirmPassword: (val, values) =>
        val !== values.password ? 'Passwords did not match' : null,

      languages: val =>
        val.length === 0 ? 'At least one language must be selected' : null,

      languagesToLearn: val =>
        val.length === 0 ? 'At least one language must be selected' : null,
    },
  })

  return (
    <Box sx={{ width: 550 }} mr={50}>
      <Group mb="md" position="center">
        <Text color="dimmed" sx={{ cursor: 'pointer' }}>
          <FontAwesomeIcon size="xl" icon={faGoogle} />
        </Text>
        <Text color="dimmed" sx={{ cursor: 'pointer' }}>
          <FontAwesomeIcon size="xl" icon={faFacebook} />
        </Text>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          console.log(form.values)
        })}
      >
        <Group grow position="apart" align="flex-start">
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
            <TextInput
              size="lg"
              variant="filled"
              styles={inputsStyles}
              required
              placeholder="Name"
              value={form.values.user.name}
              onChange={event =>
                form.setFieldValue('user.name', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />
            <TextInput
              size="lg"
              variant="filled"
              styles={inputsStyles}
              required
              placeholder="Surname"
              value={form.values.user.surname}
              onChange={event =>
                form.setFieldValue('user.surname', event.currentTarget.value)
              }
              error={form.errors.surname}
            />
            <DatePicker
              size="lg"
              required
              placeholder="Birthday"
              inputFormat="MM/DD/YYYY"
              labelFormat="MM/YYYY"
              styles={inputsStyles}
              allowFreeInput
              rightSection={
                <FontAwesomeIcon color={mainAuthColor} icon={faCalendar} />
              }
              onChange={value => form.setFieldValue('user.birthday', value)}
            />

            <PasswordInput
              size="lg"
              variant="filled"
              styles={{
                ...passwordStyles,
                ...inputsStyles,
              }}
              required
              placeholder="Password"
              value={form.values.password}
              onChange={event =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
            />
            <PasswordInput
              size="lg"
              variant="filled"
              styles={{
                ...passwordStyles,
                ...inputsStyles,
              }}
              required
              placeholder="Confirm password"
              value={form.values.confirmPassword}
              onChange={event =>
                form.setFieldValue('confirmPassword', event.currentTarget.value)
              }
              error={form.errors.password}
            />
          </Stack>
          <Stack>
            <Select
              size="lg"
              required
              placeholder="Country"
              value={form.values.user.country}
              data={countries}
              styles={{
                item: {
                  fontSize: 14,
                  padding: 8,
                },
                ...inputsStyles,
              }}
              allowDeselect
              clearable
              searchable
              onChange={value => form.setFieldValue('user.country', value)}
            />
            <MultiSelect
              styles={multiSelect}
              size="lg"
              required
              data={languages}
              placeholder="Languages you speak (max 4)"
              searchable
              clearable
              value={form.values.languages}
              onChange={value => form.setFieldValue('languages', value)}
            />
            <MultiSelect
              size="lg"
              styles={multiSelect}
              maxSelectedValues={4}
              required
              data={languages}
              placeholder="Languages to learn (max 4)"
              searchable
              clearable
              onChange={value => form.setFieldValue('languagesToLearn', value)}
            />

            <Textarea
              variant="filled"
              styles={{
                ...{ input: { ...inputsStyles.input, height: 116 } },
              }}
              placeholder="Description"
            />
          </Stack>
        </Group>

        <Button
          mt="xl"
          type="submit"
          color="red.8"
          fullWidth
          sx={{
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            height: 50,
          }}
        >
          Register
        </Button>
      </form>
    </Box>
  )
}

export default RegisterForm
