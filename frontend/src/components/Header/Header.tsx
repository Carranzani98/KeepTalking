import React from 'react'

import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-identicon-sprites'
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
  Burger,
  Transition,
  Paper,
} from '@mantine/core'
import { useDisclosure, useSessionStorage } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'

import { postLogout } from '../../services/api/models/auth/AuthApi'
import useStyles from './styles'

const Header = () => {
  const { classes } = useStyles()
  const view = location.pathname
  const [opened, { toggle, close }] = useDisclosure(false)
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

  const authButtons = (
    <>
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
    </>
  )

  const links = (
    <>
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
            src={createAvatar(style, {
              seed: token,
              dataUri: true,
            })}
            radius="xl"
            size="lg"
            sx={{ cursor: 'pointer', border: '1px solid lightgray' }}
          />
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
    </>
  )
  return (
    <MantineHeader height={{ base: 80 }} withBorder p="sm" pb="xs">
      <Group position="apart">
        <Anchor href={isAuthView ? '/' : '/MainPage'}>
          <Image
            width={200}
            height={55}
            src="/images/logo.png"
            alt="KeepTalking Logo"
            withPlaceholder
          />
        </Anchor>
        {!isAuthView && (
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        )}

        {!sessionStorage.token && !isAuthView && (
          <>
            <Group pr="xl" className={classes.links}>
              {authButtons}
            </Group>
            <Transition
              transition="pop-top-right"
              duration={200}
              mounted={opened}
            >
              {styles => (
                <Paper className={classes.dropdown} withBorder style={styles}>
                  {authButtons}
                </Paper>
              )}
            </Transition>
          </>
        )}
        {sessionStorage.token && (
          <>
            <Group
              pr="xl"
              position="right"
              noWrap
              spacing={50}
              sx={{ width: '30%' }}
              className={classes.links}
            >
              {links}
            </Group>
            <Transition
              transition="pop-top-right"
              duration={200}
              mounted={opened}
            >
              {styles => (
                <Paper className={classes.dropdown} withBorder style={styles}>
                  {links}
                </Paper>
              )}
            </Transition>
          </>
        )}
      </Group>
    </MantineHeader>
  )
}

export default Header
