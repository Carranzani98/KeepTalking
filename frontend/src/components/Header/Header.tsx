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
    <MantineHeader height={66} sx={{ borderBottom: 'none' }} p="sm">
      <Group position="apart">
        <Anchor href="/">
          <Image
            width={200}
            src="images/logo.png"
            alt="KeepTalking Logo"
            withPlaceholder
          />
        </Anchor>
        {view === '/' && (
          <Group pr="xl">
            <Button
              color="red.8"
              radius="xl"
              size="xs"
              variant="light"
              component="a"
              href="/register"
            >
              Register
            </Button>
            <Button
              color="red.7"
              radius="xl"
              size="xs"
              component="a"
              href="/login"
            >
              Login
            </Button>
          </Group>
        )}
      </Group>
    </MantineHeader>
  )
}

export default Header
