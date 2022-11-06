import React from 'react'

import ReactDOM from 'react-dom/client'

import App from './App'
import Footer from './components/Footer/Footer'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
      <Footer />
    </React.StrictMode>
  )
}
