import React from 'react'

import { Anchor, Box, Title, Text } from '@mantine/core'

interface CommonInitialTextProps {
  view: string
  title: string
  text: string
  anchorText: string
}
const CommonInitialText = ({
  view,
  title,
  text,
  anchorText,
}: CommonInitialTextProps) => {
  return (
    <Box>
      <Title size={50}>{title} to</Title>
      <Title size={35} weight="normal" mt="xs">
        KeepTalking
      </Title>
      <Text size="lg" mt="xl">
        {text}
      </Text>
      <Text size="lg">
        You can{' '}
        <Anchor
          color="red.9"
          href={view === 'register' ? '/register' : '/login'}
        >
          {anchorText}
        </Anchor>
      </Text>
    </Box>
  )
}

export default CommonInitialText
