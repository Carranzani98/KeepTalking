import React from 'react'

import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextInput, TextInputProps, ActionIcon } from '@mantine/core'

export const SearchInput = (props: TextInputProps) => {
  return (
    <TextInput
      icon={<FontAwesomeIcon icon={faSearch} size="lg" color="#E2BEBE" />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          sx={{ backgroundColor: '#BD6A6A' }}
          variant="filled"
        >
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </ActionIcon>
      }
      placeholder="Search for users"
      rightSectionWidth={42}
      styles={{
        input: {
          width: 250,
          borderColor: '#C3BEBE',
          color: '#805252',
          '&::placeholder': { color: '#E2BEBE', fontSize: 15 },
          '&:focus': { borderColor: '#BD6A6A' },
        },
      }}
      {...props}
    />
  )
}

export default SearchInput
