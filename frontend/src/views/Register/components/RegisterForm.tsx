import React from 'react'

import { faGoogle } from '@fortawesome/free-brands-svg-icons'
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
  Select,
  MultiSelect,
  Textarea,
  Box,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'

import Countries from '../../../components/Countries/Countries'
import Languages from '../../../components/Languages/Languages'
import { postRegister } from '../../../services/api/models/auth/AuthApi'
import { RegisterFormValues } from '../../../services/api/types/User'
import {
  inputsStyles,
  mainAuthColor,
  multiSelect,
  passwordStyles,
} from '../../../utils/AuthStyles'
import { formatDate } from '../../../utils/DateFormat'

const RegisterForm = () => {
  const registerMutation = useMutation(postRegister)

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      surname: '',
      birthday: '',
      country: '',
      password: '',
      confirmPassword: '',
      languageCodes: [''],
      toLearnLanguageCodes: [''],
      description: '',
    },

    validate: {
      email: val =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? null : 'Invalid email',

      name: val =>
        val.length < 2 ? 'Name must have at least 2 characters' : null,
      surname: val =>
        val.length < 2 ? 'Name must have at least 2 characters' : null,

      password: val =>
        val.length <= 6
          ? null
          : 'Password should include at least 6 characters',
      confirmPassword: (val, values) =>
        val !== values.password ? 'Passwords did not match' : null,

      languageCodes: val =>
        val.length === 0 ? 'At least one language must be selected' : null,

      toLearnLanguageCodes: val =>
        val.length === 0 ? 'At least one language must be selected' : null,
    },
  })

  const handleSubmit = (formValues: RegisterFormValues) => {
    registerMutation.mutate(formValues, {
      onSuccess: () => (location.href = '/login'),
      onError: error => alert(error),
    })
  }

  return (
    <Box sx={{ width: 550 }} mr={50}>
      <Text color="dimmed" sx={{ cursor: 'pointer', textAlign: 'center' }}>
        <FontAwesomeIcon size="xl" icon={faGoogle} />
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(values => {
          handleSubmit(values)
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
              value={form.values.name}
              onChange={event =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />
            <TextInput
              size="lg"
              variant="filled"
              styles={inputsStyles}
              required
              placeholder="Surname"
              value={form.values.surname}
              onChange={event =>
                form.setFieldValue('surname', event.currentTarget.value)
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
              onChange={(value: Date) =>
                form.setFieldValue('birthday', formatDate(value))
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
              value={form.values.country}
              data={Countries()}
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
              onChange={(value: string) => form.setFieldValue('country', value)}
            />
            <MultiSelect
              styles={multiSelect}
              size="lg"
              maxSelectedValues={4}
              required
              data={Languages()}
              placeholder="Languages you speak (max 4)"
              searchable
              clearable
              value={form.values.languageCodes}
              onChange={value => form.setFieldValue('languageCodes', value)}
            />
            <MultiSelect
              size="lg"
              styles={multiSelect}
              maxSelectedValues={4}
              required
              data={Languages()}
              placeholder="Languages to learn (max 4)"
              searchable
              clearable
              onChange={value =>
                form.setFieldValue('toLearnLanguageCodes', value)
              }
            />

            <Textarea
              variant="filled"
              styles={{
                ...{ input: { ...inputsStyles.input, height: 116 } },
              }}
              placeholder="Description"
              onChange={event =>
                form.setFieldValue('description', event.target.value)
              }
            />
          </Stack>
        </Group>

        <Button
          mt="xl"
          type="submit"
          color="red.8"
          fullWidth
          loading={registerMutation.isLoading}
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
