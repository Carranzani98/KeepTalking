import React from 'react'

import {
  Anchor,
  Button,
  Group,
  Header as MantineHeader,
  Image,
} from '@mantine/core'

const Header = () => {
  const view = location.pathname
  return (
    <MantineHeader
      height={{ base: 60 }}
      sx={{ borderBottom: 'none' }}
      p="sm"
      pb="xs"
    >
      <Group position="apart">
        <Anchor
          href={view === '/login' || view === '/register' ? '/' : '/MainPage'}
        >
          <Image
            width={200}
            height={55}
            src="images/logo.png"
            alt="KeepTalking Logo"
            withPlaceholder
          />
        </Anchor>
        {view === '/' && (
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
      </Group>
    </MantineHeader>
  )
}

export default Header
