import React from 'react'

import { useMantineTheme } from '@mantine/core'

const CalendarStyles = () => {
  const theme = useMantineTheme()

  return (
    <style>
      {`
      :root{
        --fc-today-bg-color: ${theme.colors.red[1]};
        --fc-event-text-color: ${theme.black};
      }
      .fc { 
        font-family: ${theme.fontFamily};
        height: 670px;
        width: auto;
      }
      .fc .fc-daygrid-day.fc-day-today{
        background-color: ${theme.colors.red[1]};
      }
      .fc .fc-button-primary:hover{
        background-color: #bb5f5f;
        border-color: #bb5f5f;
      }
      .fc .fc-button-primary{
        background-color: #ab1616;
        border-color: #ab1616;
      }
      .fc .fc-button-primary:not(:disabled).fc-button-active{
        background-color: #bb5f5f;
        border-color: #bb5f5f;
      }
      .fc .fc-button-primary:not(:disabled).fc-button-active:focus, .fc .fc-button-primary:focus{
        box-shadow: 0 0 0 0.2rem #ab161626;
      }
      .fc .fc-button-primary:not(:disabled).fc-button-active:active, .fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:active{
        box-shadow: 0 0 0 0.2rem #ab161626;
        background-color: #ab1616;
        border-color: #ab1616;
      }
      .fc .fc-button-primary:disabled{
        background-color: #bb5f5f;
        border-color: #bb5f5f;
      }
      .fc-toolbar-title{
        color: #b64242;
      }
      .fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start, .fc-h-event .fc-event-main, .fc-v-event{
        background-color: ${theme.colors.red[3]};
        border-color: ${theme.colors.red[3]};
        border-radius: 5px;
        padding: 4px 8px;
        color:  ${theme.black};
      }`}
    </style>
  )
}

export default CalendarStyles
