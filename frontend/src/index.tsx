import React from 'react'

import { AppShell } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'

import App from './App'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import queryClient from './services/api/queryClient/QueryClient'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppShell header={<Header />} footer={<Footer />}>
          <App />
        </AppShell>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
