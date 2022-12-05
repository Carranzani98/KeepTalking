import React from 'react'

import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Anchor,
  Avatar,
  Button,
  Group,
  Header as MantineHeader,
  Image,
  Menu,
} from '@mantine/core'
import { useSessionStorage } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'

import { postLogout } from '../../services/api/models/auth/AuthApi'

const Header = () => {
  const view = location.pathname
  const isAuthView = view === '/login' || view === '/register'
  const [token, setToken, removeToken] = useSessionStorage({
    key: 'token',
  })
  const logoutMutation = useMutation(postLogout, {
    onSuccess: response => {
      if (response.meta?.result === 'OK') {
        removeToken()
        location.href = '/login'
      }
    },
  })

  const handleClick = () => {
    logoutMutation.mutate()
  }

  return (
    <MantineHeader height={{ base: 80 }} withBorder p="sm" pb="xs">
      <Group position="apart">
        <Anchor href={isAuthView ? '/' : '/MainPage'}>
          <Image
            width={200}
            height={55}
            src="images/logo.png"
            alt="KeepTalking Logo"
            withPlaceholder
          />
        </Anchor>
        {!sessionStorage.token && !isAuthView && (
          <Group pr="xl">
            <Button
              color="red.8"
              radius="sm"
              size="xs"
              variant="light"
              component="a"
              href="/login"
            >
              Sign in
            </Button>
            <Button
              color="red.7"
              radius="sm"
              size="xs"
              component="a"
              href="/register"
            >
              Sign up
            </Button>
          </Group>
        )}
        {sessionStorage.token && (
          <Group pr="xl" position="apart" sx={{ width: '30%' }}>
            <Anchor
              size={24}
              fw={view === '/MainPage' ? 500 : 300}
              sx={{
                color: '#BD6A6A',
                '&:hover': {
                  fontWeight: 500,
                },
              }}
              href="/MainPage"
              underline={false}
            >
              Dashboard
            </Anchor>
            <Anchor
              size={24}
              fw={view === '/Chats' ? 500 : 300}
              sx={{
                color: '#BD6A6A',
                '&:hover': {
                  fontWeight: 500,
                },
              }}
              href="/Chats"
              underline={false}
            >
              Chats
            </Anchor>
            <Anchor
              size={24}
              fw={view === '/Calendar' ? 500 : 300}
              sx={{
                color: '#BD6A6A',
                '&:hover': {
                  fontWeight: 500,
                },
              }}
              href="/Calendar"
              underline={false}
            >
              Calendar
            </Anchor>
            <Menu position="bottom-end" trigger="hover">
              <Menu.Target>
                <Avatar
                  radius="xl"
                  color="red.2"
                  variant="filled"
                  size="lg"
                  sx={{ cursor: 'pointer' }}
                >
                  TS
                </Avatar>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={
                    <FontAwesomeIcon
                      icon={faUser}
                      color="#E2BFBE"
                      size="xl"
                      fixedWidth
                    />
                  }
                >
                  <Anchor
                    size={24}
                    fw={view === '/MyProfile' ? 500 : 300}
                    sx={{
                      color: '#BD6A6A',
                      '&:hover': {
                        fontWeight: 500,
                      },
                    }}
                    href="/MyProfile"
                    underline={false}
                  >
                    My profile
                  </Anchor>
                </Menu.Item>
                <Menu.Item
                  icon={
                    <FontAwesomeIcon
                      icon={faSignOut}
                      color="#E2BFBE"
                      size="xl"
                      fixedWidth
                    />
                  }
                >
                  <Anchor
                    size={24}
                    fw={300}
                    sx={{
                      color: '#BD6A6A',
                      '&:hover': {
                        fontWeight: 500,
                      },
                    }}
                    onClick={handleClick}
                    underline={false}
                  >
                    Logout
                  </Anchor>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
      </Group>
    </MantineHeader>
  )
}

export default Header
