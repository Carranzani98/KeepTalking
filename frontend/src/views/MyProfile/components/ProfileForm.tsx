import React, { useEffect } from 'react'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Group,
  Stack,
  TextInput,
  Select,
  MultiSelect,
  Textarea,
  Button,
  Container,
  Title,
  PasswordInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Countries from '../../../components/Countries/Countries'
import Languages from '../../../components/Languages/Languages'
import { updateProfile } from '../../../services/api/models/user/UserApi'
import User from '../../../services/api/types/User'
import {
  inputsStyles,
  mainAuthColor,
  multiSelect,
  passwordStyles,
} from '../../../utils/AuthStyles'
import { formatDate } from '../../../utils/DateFormat'

const ProfileForm = ({ data }: { data: User }) => {
  const queryClient = useQueryClient()
  const update = useMutation(updateProfile)

  const handleSubmit = (formValues: any) => {
    update.mutate(formValues, {
      onSuccess: response => {
        if (response.meta.result === 'OK') {
          showNotification({
            message: 'Your profile has been updated',
          })
          queryClient.invalidateQueries(['user'])
        }
      },
      onError: () => {
        showNotification({
          message: 'Error when trying to update, try again later',
        })
      },
    })
  }

  const form = useForm({
    initialValues: {
      email: data.email,
      name: data.name,
      surname: data.surname,
      birthday: data.birthday,
      password: '',
      confirmPassword: '',
      country: data.country,
      languageCodes: data.languageCodes,
      toLearnLanguageCodes: data.toLearnLanguageCodes,
      description: data.description,
    },

    validate: {
      name: (val: string) =>
        val.length < 2 ? 'Name must have at least 2 characters' : null,
      surname: (val: string) =>
        val.length < 2 ? 'Name must have at least 2 characters' : null,
      confirmPassword: (val, values) =>
        val !== values.password ? 'Passwords did not match' : null,
      languageCodes: val =>
        val.length === 0 ? 'At least one language must be selected' : null,
      toLearnLanguageCodes: val =>
        val.length === 0 ? 'At least one language must be selected' : null,
    },
  })

  return (
    <Container size="xs" sx={{ height: '100%' }}>
      <Stack justify="center" sx={{ height: '100%' }}>
        <Title color="#6B0000" pb="lg">
          Profile
        </Title>
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
                disabled
                value={form.values.email}
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
                value={
                  form.values.birthday
                    ? new Date(form.values.birthday)
                    : new Date()
                }
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
                placeholder="Change Password"
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
                placeholder="Confirm new password"
                value={form.values.confirmPassword}
                onChange={event =>
                  form.setFieldValue(
                    'confirmPassword',
                    event.currentTarget.value
                  )
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
                onChange={(value: string) =>
                  form.setFieldValue('country', value)
                }
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
                value={form.values.toLearnLanguageCodes}
                onChange={value =>
                  form.setFieldValue('toLearnLanguageCodes', value)
                }
              />

              <Textarea
                variant="filled"
                value={form.values.description}
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
            sx={{
              float: 'right',
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              height: 50,
              width: 150,
            }}
          >
            Save
          </Button>
        </form>
      </Stack>
    </Container>
  )
}

export default ProfileForm
