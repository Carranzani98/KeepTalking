import React from 'react'

import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import RoutesIndex from './views/RoutesIndex'

const App = () => {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <RoutesIndex />
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
