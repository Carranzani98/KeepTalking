import React from 'react'

import { Center, Loader } from '@mantine/core'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import LandingPage from './LandingPage/LandingPage'
import MainPage from './MainPage/MainPage'

const Register = React.lazy(() => import('./Register/Register'))
const Login = React.lazy(() => import('./Login/Login'))

const RoutesIndex = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/Login',
      element: <Login />,
    },
    {
      path: '/Register',
      element: <Register />,
    },
    {
      path: '/MainPage',
      element: <MainPage />,
    },
  ])

  return (
    <>
      <React.Suspense
        fallback={
          <Center style={{ width: '100%', height: 'calc(100vh  - 55px)' }}>
            <Loader color="gray" />
          </Center>
        }
      >
        <RouterProvider router={router} />
      </React.Suspense>
    </>
  )
}

export default RoutesIndex
