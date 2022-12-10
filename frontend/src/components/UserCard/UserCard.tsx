import React from 'react'

import { Button, Card, Group, Text } from '@mantine/core'

interface UserCardProps {
  name: string
  languagesUser: string[]
  languagesToLearn: string[]
  description?: string
}

export const UserCard = ({
  name,
  languagesUser,
  description,
  languagesToLearn,
}: UserCardProps) => {
  return (
    <Card
      withBorder
      shadow="md"
      radius="md"
      p="md"
      sx={{
        width: 336,
        height: 352,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderColor: '#E2BEBE',
      }}
    >
      <Card.Section inheritPadding>
        <Text size="lg" fw={700} color="#805252">
          {name}
        </Text>
        <Text size="sm" color="dimmed">
          <Text span fw={700}>
            Speaks:
          </Text>{' '}
          {languagesUser.join(', ')}
        </Text>
      </Card.Section>

      <Card.Section inheritPadding>
        <Text size="sm" color="#805252">
          {description}
        </Text>
      </Card.Section>
      <Card.Section inheritPadding>
        <Text size="sm" color="#805252">
          <Text span fw={700}>
            Wants to learn:
          </Text>{' '}
          {languagesToLearn.join(', ')}
        </Text>
      </Card.Section>
      <Card.Section inheritPadding>
        <Group mb="md" position="center">
          <Button
            radius="md"
            sx={{
              backgroundColor: '#B05454',
              '&:hover': { backgroundColor: '#973C3C' },
            }}
          >
            Initiate chat
          </Button>
          <Button
            radius="md"
            variant="outline"
            sx={{ color: '#B05454', borderColor: '#B05454' }}
          >
            Create meet
          </Button>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default UserCard
