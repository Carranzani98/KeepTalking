import React from 'react'

import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Image,
  MediaQuery,
} from '@mantine/core'

import useStyles from './styles'

const LandingPage = () => {
  const { classes } = useStyles()

  return (
    <Container className={classes.container} pl={0} fluid>
      <MediaQuery largerThan="md" styles={{ maxWidth: '40%' }}>
        <Stack>
          <Text pb="xl" size="xl" tt="uppercase" fw={800} color="#A99696">
            Learn faster and smarter
          </Text>
          <Title pb="lg" className={classes.title}>
            Simple learning experience for everyone
          </Title>
          <Text
            className={classes.description}
            size="xl"
            mt="lg"
            color="#A99696"
          >
            Learn any language, get better results and be the best comunicating
            with other.
          </Text>

          <Button
            variant="gradient"
            gradient={{ from: 'red.8', to: 'red.5' }}
            size="xl"
            radius="sm"
            className={classes.control}
            component="a"
            href="/getStarted"
          >
            Get started
          </Button>
        </Stack>
      </MediaQuery>
      <MediaQuery largerThan="xs" styles={{ width: 600 }}>
        <Image src="images/landing-page-img.png" pb={60} />
      </MediaQuery>
    </Container>
  )
}

export default LandingPage
