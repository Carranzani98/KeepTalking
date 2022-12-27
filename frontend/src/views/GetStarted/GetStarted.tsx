import React, { useState } from 'react'

import { faCalendar, faMessage } from '@fortawesome/free-regular-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  Stepper,
  Button,
  Stack,
} from '@mantine/core'

import useStyles from './styles'

const data = [
  {
    title: 'Dashboard',
    description:
      'Large network of users that fit your learning needs. They speak the languages ​​you want to learn or want to learn the languages ​​you speak.',
    icon: faUsers,
  },
  {
    title: 'Chats',
    description:
      'Chat in real time with users and practice the language you want in writing.  You can have several conversations!',
    icon: faMessage,
  },
  {
    title: 'Calendar',
    description:
      'Or practice with users who have the same interests as you in previously scheduled meetings on the calendars.',
    icon: faCalendar,
  },
]

const GetStarted = () => {
  const { classes, theme } = useStyles()
  const [active, setActive] = useState(3)

  const features = data.map(feature => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <FontAwesomeIcon
        icon={feature.icon}
        size="xl"
        color={theme.colors.red[7]}
      />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))
  return (
    <Container size="lg" py="xl">
      <Stack pb="xl">
        <Group position="center">
          <Badge variant="filled" size="lg" color="red.5">
            Best way of learning
          </Badge>
        </Group>
        <Title order={2} className={classes.title} align="center" mt="sm">
          Learn any language from home
        </Title>
        <Text
          color="dimmed"
          className={classes.description}
          align="center"
          mt="md"
        >
          Surely you have ever thought about learning a new language but you
          don&apos;t have time to go to an academy. Or you simply haven&apos;t
          practiced a language in a long time and you would like to practice
          speaking. If so,
          <span style={{ fontWeight: '700' }}>
            {' '}
            you are in the right place!
          </span>
        </Text>
        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Stack>
      <Stack mt="xl" pt="xl">
        <Stepper
          color="red"
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
        >
          <Stepper.Step
            label="First step"
            description="Register or Log in"
          ></Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Find Users"
          ></Stepper.Step>
          <Stepper.Step
            label="Third step"
            description="Chat or meet with them"
          ></Stepper.Step>
        </Stepper>
        <Button
          variant="gradient"
          gradient={{ from: 'red.8', to: 'red.5' }}
          size="lg"
          radius="sm"
          className={classes.control}
          component="a"
          href="/login"
        >
          Let&apos;s go!
        </Button>
      </Stack>
    </Container>
  )
}

export default GetStarted
