import React from 'react'

import {
  Anchor,
  Box,
  Title,
  Text,
  Stack,
  Image,
  MediaQuery,
} from '@mantine/core'

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
    <Stack pt={20} sx={{ alignItems: 'center' }} spacing="xs">
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
            href={view === 'register' ? '/login' : '/register'}
          >
            {anchorText}
          </Anchor>
        </Text>
      </Box>
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Image
          mt="xl"
          src="images/auth-ilustration.png"
          alt="Girl chatting with her phone"
          fit="contain"
          width={450}
          height={255}
          withPlaceholder
        />
      </MediaQuery>
    </Stack>
  )
}

export default CommonInitialText
