import React from 'react'

import {
  Anchor,
  Breadcrumbs,
  Footer as MantineFooter,
  Text,
} from '@mantine/core'

const Footer = () => {
  const items = [
    { title: 'Aspectos legales', href: '#' },
    { title: 'Política de privacidad', href: '#' },
    { title: 'Seguridad', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" color="dimmed" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  return (
    <MantineFooter height={30} p="xs" sx={{ textAlign: 'center' }}>
      <Text size="xs" color="dimmed">
        Copyright © 2022 Isabella Carranzani Borot, TFM.
      </Text>

      <Breadcrumbs separator="|" sx={{ justifyContent: 'center' }}>
        {items}
      </Breadcrumbs>
    </MantineFooter>
  )
}
export default Footer
