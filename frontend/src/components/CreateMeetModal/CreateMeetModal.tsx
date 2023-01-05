import React from 'react'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateSelectArg } from '@fullcalendar/core'
import {
  Button,
  Modal,
  Select,
  SelectItem,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DateTimePicker } from 'mantine-dates-6'

import postMeet from '../../services/api/models/calendar/CalendarApi'
import { matchingUsers } from '../../services/api/models/user/UserApi'
import { Meet } from '../../services/api/types/MeetResponse'
import {
  inputsStyles,
  mainAuthColor,
  multiSelect,
} from '../../utils/AuthStyles'

const CreateMeetModal = ({
  dateInfo,
  userId,
  opened,
  setOpened,
  hasBeenCreated,
}: {
  isEdit?: boolean
  dateInfo?: DateSelectArg
  eventInfo?: Meet
  userId?: number
  opened: boolean
  setOpened: (state: boolean) => void
  hasBeenCreated?: (event: Meet) => void
}) => {
  const { data } = useQuery({
    queryKey: ['matchingUsers'],
    queryFn: matchingUsers,
  })

  const meetMutation = useMutation(postMeet, {
    onSuccess: response => {
      setOpened(false)
      showNotification({
        message: 'Your meet has been created. Check your calendar! 📅',
      })
      hasBeenCreated?.({ ...form.values, id: response.id })
      form.reset()
    },
  })

  const form = useForm({
    initialValues: {
      otherUserId: userId || 0,
      title: '',
      notes: '',
      startTime: dateInfo ? dateInfo.start : new Date(),
      endTime: dateInfo ? dateInfo.end : new Date(),
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
          {!userId && (
            <Select
              styles={multiSelect}
              data={
                data?.data.map(user => {
                  return {
                    value: user.id?.toString(),
                    label: user.name + ' ' + user.surname,
                  } as SelectItem
                }) || []
              }
              placeholder="Select user"
              value={form.values.otherUserId.toString()}
              onChange={value =>
                value && form.setFieldValue('otherUserId', parseInt(value))
              }
            />
          )}
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
            placeholder="Meet notes"
            value={form.values.notes}
            onChange={event =>
              form.setFieldValue('notes', event.currentTarget.value)
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
            value={form.values.startTime}
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
            value={form.values.endTime}
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

export default CreateMeetModal
