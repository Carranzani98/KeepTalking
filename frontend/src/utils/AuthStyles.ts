export const mainAuthColor = '#FF7E7E'
export const white = '#FFFFFF'

export const inputsStyles = {
  input: {
    fontSize: 14,
    backgroundColor: '#FFEFEF',
    border: 'none',
    color: mainAuthColor,
    '&:focus, &:focus-within': {
      borderColor: '#FFEFEF',
    },
    '&::placeholder': {
      fontSize: 14,
      color: mainAuthColor,
    },
  },
}

export const passwordStyles = {
  innerInput: {
    fontSize: 14,
    color: mainAuthColor,
    '&::placeholder': {
      fontSize: 14,
      color: mainAuthColor,
    },
  },
  visibilityToggle: {
    color: mainAuthColor,
  },
}

export const multiSelect = {
  searchInput: {
    fontSize: 14,
    '&::placeholder': {
      fontSize: 14,
      color: mainAuthColor,
    },
  },
  value: {
    fontSize: 13,
    fontWeight: 400,
    borderRadius: 50,
    backgroundColor: mainAuthColor,
    color: white,
    paddingLeft: 10,
  },
  defaultValueRemove: {
    color: white,
  },
  item: {
    fontSize: 14,
    padding: 8,
  },
  ...inputsStyles,
}
