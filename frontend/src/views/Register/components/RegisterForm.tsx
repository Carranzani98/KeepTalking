import React from 'react'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Stack,
  Select,
  MultiSelect,
  Textarea,
  Box,
  SelectItem,
  MediaQuery,
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
      languages_to_teach: [''],
      languages_to_learn: [''],
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
        val.length >= 6
          ? null
          : 'Password should include at least 6 characters',
      confirmPassword: (val, values) =>
        val !== values.password ? 'Passwords did not match' : null,

      languages_to_teach: val =>
        val.length === 0 ? 'At least one language must be selected' : null,

      languages_to_learn: val =>
        val.length === 0 ? 'At least one language must be selected' : null,
    },
  })
  const languages = Languages()

  const getLanguagesData = () => {
    if (languages.data) {
      return languages.data.data.map(language => ({
        label: language.language_name,
        value: language.id,
      })) as SelectItem[]
    } else {
      return []
    }
  }
  const handleSubmit = (formValues: RegisterFormValues) => {
    registerMutation.mutate(formValues, {
      onSuccess: () => (location.href = '/login'),
      onError: error => alert(error),
    })
  }

  return (
    <MediaQuery largerThan="xl" styles={{ marginRight: 50 }}>
      <Box sx={{ width: 550 }}>
        <form
          onSubmit={form.onSubmit(values => {
            handleSubmit(values)
          })}
        >
          <MediaQuery smallerThan="xs" styles={{ flexDirection: 'column' }}>
            <Group grow position="apart" align="flex-start">
              <MediaQuery
                smallerThan="xs"
                styles={{ maxWidth: '100%', width: '100%' }}
              >
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
                    error={form.errors.name}
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
                      <FontAwesomeIcon
                        color={mainAuthColor}
                        icon={faCalendar}
                      />
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
                      form.setFieldValue(
                        'confirmPassword',
                        event.currentTarget.value
                      )
                    }
                    error={form.errors.password || form.errors.confirmPassword}
                  />
                </Stack>
              </MediaQuery>
              <MediaQuery
                smallerThan="xs"
                styles={{ maxWidth: '100%', width: '100%' }}
              >
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
                    onChange={(value: string) =>
                      form.setFieldValue('country', value)
                    }
                  />
                  <MultiSelect
                    styles={multiSelect}
                    size="lg"
                    maxSelectedValues={4}
                    required
                    data={getLanguagesData()}
                    placeholder="Languages you speak (max 4)"
                    searchable
                    clearable
                    value={form.values.languages_to_teach}
                    onChange={value =>
                      form.setFieldValue('languages_to_teach', value)
                    }
                    error={form.errors.languages_to_teach}
                  />
                  <MultiSelect
                    size="lg"
                    styles={multiSelect}
                    maxSelectedValues={4}
                    required
                    data={getLanguagesData()}
                    placeholder="Languages to learn (max 4)"
                    searchable
                    clearable
                    value={form.values.languages_to_learn}
                    onChange={value =>
                      form.setFieldValue('languages_to_learn', value)
                    }
                    error={form.errors.languages_to_learn}
                  />

                  <Textarea
                    variant="filled"
                    styles={{
                      ...{ input: { ...inputsStyles.input, height: 116 } },
                    }}
                    placeholder="Description"
                    required
                    onChange={event =>
                      form.setFieldValue('description', event.target.value)
                    }
                  />
                </Stack>
              </MediaQuery>
            </Group>
          </MediaQuery>

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
    </MediaQuery>
  )
}

export default RegisterForm
