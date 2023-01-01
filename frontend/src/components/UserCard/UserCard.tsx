import React, { useState } from 'react'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Card,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { DateTimePicker } from 'mantine-dates-6'
import { generatePath } from 'react-router-dom'

import postMeet from '../../services/api/models/calendar/CalendarApi'
import { Meet } from '../../services/api/types/MeetResponse'
import { inputsStyles, mainAuthColor } from '../../utils/AuthStyles'

interface UserCardProps {
  userId: number
  name: string
  languagesUser: string[]
  languagesToLearn: string[]
  description?: string
}

export const UserCard = ({
  userId,
  name,
  languagesUser,
  description,
  languagesToLearn,
}: UserCardProps) => {
  const meetMutation = useMutation(postMeet, {
    onSuccess: () => {
      setOpened(false)
      showNotification({
        message: 'Your meet has been created. Check your calendar! 📅',
      })
    },
  })

  const [opened, setOpened] = useState<boolean>(false)

  const form = useForm({
    initialValues: {
      otherUserId: userId,
      title: '',
      description: '',
      startTime: new Date(),
      endTime: new Date(),
    },
  })

  const handleSubmit = (values: Meet) => {
    meetMutation.mutate(values)
  }

  return (
    <>
      <Card
        withBorder
        shadow="md"
        radius="md"
        p="md"
        sx={{
          width: 336,
          height: 352,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          borderColor: '#E2BEBE',
        }}
      >
        <Card.Section inheritPadding>
          <Text size="lg" fw={700} color="#805252">
            {name}
          </Text>
          <Text size="sm" color="dimmed">
            <Text span fw={700}>
              Speaks:
            </Text>{' '}
            {languagesUser.join(', ')}
          </Text>
        </Card.Section>

        <Card.Section inheritPadding>
          <Text size="sm" color="#805252">
            {description}
          </Text>
        </Card.Section>
        <Card.Section inheritPadding>
          <Text size="sm" color="#805252">
            <Text span fw={700}>
              Wants to learn:
            </Text>{' '}
            {languagesToLearn.join(', ')}
          </Text>
        </Card.Section>
        <Card.Section inheritPadding>
          <Group mb="md" position="center">
            <Button
              radius="md"
              sx={{
                backgroundColor: '#B05454',
                '&:hover': { backgroundColor: '#973C3C' },
              }}
              onClick={() =>
                (location.href = generatePath('/ChatPanel/:id', {
                  id: userId.toString(),
                }))
              }
            >
              Initiate chat
            </Button>
            <Button
              radius="md"
              variant="outline"
              sx={{ color: '#B05454', borderColor: '#B05454' }}
              onClick={() => setOpened(true)}
            >
              Create meet
            </Button>
          </Group>
        </Card.Section>
      </Card>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a new event"
      >
        <form
          onSubmit={form.onSubmit(values => {
            handleSubmit(values)
          })}
        >
          <Stack>
            <TextInput
              size="md"
              variant="filled"
              styles={inputsStyles}
              required
              placeholder="Meet title"
              value={form.values.title}
              onChange={event =>
                form.setFieldValue('title', event.currentTarget.value)
              }
            />
            <Textarea
              size="md"
              variant="filled"
              styles={inputsStyles}
              required
              placeholder="Meet description"
              value={form.values.description}
              onChange={event =>
                form.setFieldValue('description', event.currentTarget.value)
              }
            />
            <DateTimePicker
              size="md"
              required
              placeholder="Start date"
              color={mainAuthColor}
              styles={{
                placeholder: { color: mainAuthColor },
                ...inputsStyles,
              }}
              rightSection={
                <FontAwesomeIcon color={mainAuthColor} icon={faCalendar} />
              }
              onChange={(value: Date) => form.setFieldValue('startTime', value)}
            />

            <DateTimePicker
              size="md"
              required
              placeholder="End date"
              color={mainAuthColor}
              styles={{
                placeholder: { color: mainAuthColor },
                ...inputsStyles,
              }}
              rightSection={
                <FontAwesomeIcon color={mainAuthColor} icon={faCalendar} />
              }
              onChange={(value: Date) => form.setFieldValue('endTime', value)}
            />
          </Stack>

          <Button
            mt="xl"
            type="submit"
            color="red.8"
            loading={meetMutation.isLoading}
            sx={{
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              float: 'right',
            }}
          >
            Save
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default UserCard
