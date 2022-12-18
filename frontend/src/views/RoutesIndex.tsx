import React from 'react'

import { Center, Loader } from '@mantine/core'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import ChatPanel from './ChatPanel/ChatPanel'
import Chats from './Chats/Chats'
import LandingPage from './LandingPage/LandingPage'
import MainPage from './MainPage/MainPage'
import MyProfile from './MyProfile/MyProfile'

const Register = React.lazy(() => import('./Register/Register'))
const Login = React.lazy(() => import('./Login/Login'))

const RoutesIndex = () => {
  let router

  if (!sessionStorage.token) {
    router = createBrowserRouter([
      {
        path: '/*',
        element: <Navigate replace to="/" />,
      },
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
    ])
  } else {
    router = createBrowserRouter([
      {
        path: '/*',
        element: <Navigate replace to="/MainPage" />,
      },
      {
        path: '/MainPage',
        element: <MainPage />,
      },
      {
        path: '/MyProfile',
        element: <MyProfile />,
      },
      {
        path: '/Chats',
        element: <Chats />,
      },
      {
        path: '/ChatPanel/:id',
        element: <ChatPanel />,
      },
    ])
  }
  return (
    <>
      <React.Suspense
        fallback={
          <Center style={{ width: '100%', height: 'calc(100vh  - 55px)' }}>
            <Loader color="gray" size="xl" />
          </Center>
        }
      >
        <RouterProvider router={router} />
      </React.Suspense>
    </>
  )
}

export default RoutesIndex
