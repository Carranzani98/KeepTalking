import React from 'react'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

import RoutesIndex from './views/RoutesIndex'

const App = () => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <NotificationsProvider>
          <RoutesIndex />
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
