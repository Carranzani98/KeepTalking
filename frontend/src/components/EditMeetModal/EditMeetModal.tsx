import React, { useEffect, useState } from 'react'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
  Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { DateTimePicker } from 'mantine-dates-6'

import {
  deleteMeet,
  editMeet,
} from '../../services/api/models/calendar/CalendarApi'
import { Meet } from '../../services/api/types/MeetResponse'
import { inputsStyles, mainAuthColor } from '../../utils/AuthStyles'

const EditMeetModal = ({
  eventInfo,
  opened,
  setOpened,
  hasBeenDeleted,
  hasBeenEdited,
}: {
  eventInfo: any
  opened: boolean
  setOpened: (state: boolean) => void
  hasBeenDeleted: (value: boolean) => void
  hasBeenEdited: (value: Meet) => void
}) => {
  const [eventInfoState, setEventInfoState] = useState<any>(eventInfo)
  const deleteMeetMutation = useMutation(deleteMeet, {
    onSuccess() {
      setOpened(false)
      showNotification({
        color: 'red',
        message: 'Your meet has been deleted correctly.',
      })
      hasBeenDeleted(true)
    },
  })

  const editMutation = useMutation(editMeet, {
    onSuccess: () => {
      setOpened(false)
      showNotification({
        message: 'Your meet has been edited. Check your calendar! 📅',
      })
      hasBeenEdited(form.values)
    },
  })
  useEffect(() => {
    setEventInfoState(eventInfo)
    form.reset()
  }, [])

  const form = useForm({
    initialValues: {
      otherUserId: eventInfoState.user2_id,
      title: eventInfoState.title,
      notes: eventInfoState.notes,
      startTime: eventInfoState.startTime,
      endTime: eventInfoState.endTime,
    },
  })

  const handleSubmit = (values: Meet) => {
    editMutation.mutate({ ...values, id: eventInfo.id })
  }

  const handleDelete = () => {
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete the event {eventInfo.title}
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        if (eventInfo.id) {
          deleteMeetMutation.mutate({ meetId: eventInfo.id })
        }
      },
    })
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Edit this event"
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
            value={new Date(form.values.startTime)}
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
            value={new Date(form.values.endTime)}
            onChange={(value: Date) => form.setFieldValue('endTime', value)}
          />
        </Stack>

        <Group position="apart">
          <Button
            mt="xl"
            color="red.8"
            variant="outline"
            loading={deleteMeetMutation.isLoading}
            onClick={handleDelete}
            sx={{
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            }}
          >
            Delete event
          </Button>
          <Button
            mt="xl"
            type="submit"
            color="red.8"
            loading={editMutation.isLoading}
            sx={{
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            }}
          >
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  )
}

export default EditMeetModal
