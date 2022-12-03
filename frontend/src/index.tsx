import React from 'react'

import { AppShell } from '@mantine/core'
import ReactDOM from 'react-dom/client'

import App from './App'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <AppShell header={<Header />} footer={<Footer />}>
        <App />
      </AppShell>
    </React.StrictMode>
  )
}
