import React from 'react'

import { MantineProvider } from '@mantine/core'
import { useFavicon } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

import favicon from './icon/favicon.ico'
import RoutesIndex from './views/RoutesIndex'

const App = () => {
  useFavicon(favicon)

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
