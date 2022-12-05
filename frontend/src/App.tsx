import React from 'react'

import { MantineProvider } from '@mantine/core'

import RoutesIndex from './views/RoutesIndex'

const App = () => {
  return (
    <MantineProvider>
      <RoutesIndex />
    </MantineProvider>
  )
}

export default App
