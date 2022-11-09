import React from 'react'

import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'

import queryClient from './services/api/queryClient/QueryClient'
import RoutesIndex from './views/RoutesIndex'

const App = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <RoutesIndex />
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
