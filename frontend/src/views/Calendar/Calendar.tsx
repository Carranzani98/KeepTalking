import React, { useState } from 'react'

// eslint-disable-next-line import-helpers/order-imports
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box, Center, Container, Loader, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'

import CreateMeetModal from '../../components/CreateMeetModal/CreateMeetModal'
import EditMeetModal from '../../components/EditMeetModal/EditMeetModal'
import { getMeets } from '../../services/api/models/calendar/CalendarApi'
import { Meet } from '../../services/api/types/MeetResponse'
import RemoveSessionToken from '../../utils/RemoveToken'
import CalendarStyles from './CalendarStyles'

const Calendar = () => {
  const [meets, setMeets] = useState<EventInput[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [dateInfo, setDateInfo] = useState<DateSelectArg>()
  const [eventInfo, setEventInfo] = useState<Meet | undefined>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [clickInfo, setClickInfo] = useState<EventClickArg>()
  const matches = useMediaQuery('(max-width: 500px)')

  const getAllMeets = useQuery({
    queryKey: ['meets'],
    queryFn: getMeets,
    onSuccess: data => {
      setMeets(
        data?.data.map(meet => {
          return {
            id: meet.id?.toString(),
            title: meet.title,
            start: new Date(meet.startTime),
            end: new Date(meet.endTime),
          }
        })
      )
    },
    onError: (error: any) => {
      if (error.response.statusText === 'Unauthorized') {
        RemoveSessionToken()
      }
    },
  })

  if (getAllMeets.isLoading) {
    return (
      <Center sx={{ height: '100%', width: '100wh' }}>
        <Loader color="gray" size="xl" />
      </Center>
    )
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setIsEdit(false)
    setDateInfo(selectInfo)
    setOpenEdit(false)
    setOpen(true)
  }
  console.log(matches)
  const defineTime = (digit?: number) => {
    if (digit !== undefined && digit < 10) {
      return '0' + digit.toString()
    }

    return digit
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    const startTime =
      defineTime(eventContent.event.start?.getHours()) +
      ':' +
      defineTime(eventContent.event.start?.getMinutes())
    const endTime =
      defineTime(eventContent.event.end?.getHours()) +
      ':' +
      defineTime(eventContent.event.end?.getMinutes())

    return (
      <Box>
        <Text fw={500}>{startTime + ' - ' + endTime}</Text>
        <Text fs="italic">{eventContent.event.title}</Text>
      </Box>
    )
  }

  const handleEventClick = (info: EventClickArg) => {
    setIsEdit(true)
    setEventInfo(
      getAllMeets.data?.data.find(meet => meet.id?.toString() === info.event.id)
    )
    setClickInfo(info)
    setOpen(false)
    setOpenEdit(true)
  }

  return (
    <Container fluid sx={{ height: '100%' }}>
      <CalendarStyles />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: !matches ? 'prev,next today' : 'prev,next',
          center: 'title',
          right: !matches ? 'dayGridMonth,timeGridWeek,timeGridDay' : '',
        }}
        initialView={!matches ? 'dayGridMonth' : 'dayGrid'}
        selectable={true}
        selectMirror={true}
        weekends={true}
        events={meets}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      {dateInfo && !isEdit && (
        <CreateMeetModal
          dateInfo={dateInfo}
          opened={open}
          setOpened={(value: boolean) => {
            setOpen(value)
            setDateInfo(undefined)
          }}
          hasBeenCreated={(event: Meet) => {
            if (event) {
              const calendarApi = dateInfo.view.calendar

              calendarApi.unselect() // clear date selection

              calendarApi.addEvent({
                id: event.id?.toString(),
                title: event.title,
                start: event.startTime,
                end: event.endTime,
              })
            }
          }}
        />
      )}
      {eventInfo && (
        <EditMeetModal
          eventInfo={eventInfo}
          opened={openEdit}
          setOpened={(value: boolean) => {
            setOpenEdit(value)
            setEventInfo(undefined)
          }}
          hasBeenDeleted={(value: boolean) => {
            if (value) {
              setMeets(current =>
                current.filter(meet => meet.id !== clickInfo?.event.id)
              )
              clickInfo?.event.remove()
            }
          }}
          hasBeenEdited={(event: Meet) => {
            if (event) {
              clickInfo?.event.remove()
              clickInfo?.view.calendar.addEvent({
                id: event.id?.toString(),
                title: event.title,
                start: event.startTime,
                end: event.endTime,
              })
            }
          }}
        />
      )}
    </Container>
  )
}

export default Calendar
