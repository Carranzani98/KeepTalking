import React from 'react'

import { Anchor, Group, Header as MantineHeader, Image } from '@mantine/core'

const Header = ({ view }: { view?: string }) => {
  return (
    <MantineHeader height={77} sx={{ borderBottom: 'none' }}>
      <Group position="apart">
        <Anchor href="/">
          <Image
            width={252}
            src="images/logo.png"
            alt="KeepTalking Logo"
            withPlaceholder
          />
        </Anchor>
        {view === 'landingPage' && <></>}
      </Group>
    </MantineHeader>
  )
}

export default Header
