import React from 'react'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, Stack, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { DateTimePicker } from 'mantine-dates-6'

import postMeet from '../../services/api/models/calendar/CalendarApi'
import { Meet } from '../../services/api/types/MeetResponse'
import { inputsStyles, mainAuthColor } from '../../utils/AuthStyles'

const MeetModal = ({
  userId,
  opened,
  setOpened,
}: {
  userId: number
  opened: boolean
  setOpened: (state: boolean) => void
}) => {
  const meetMutation = useMutation(postMeet, {
    onSuccess: () => {
      setOpened(false)
      showNotification({
        message: 'Your meet has been created. Check your calendar! 📅',
      })
    },
  })

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
  )
}

export default MeetModal
