import { createStyles } from '@mantine/core'

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.colors.red[7],
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `1px solid ${theme.colors.gray[1]}`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.colors.red[7],
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },

  control: {
    width: 200,
    marginTop: theme.spacing.xl * 1.5,
    alignSelf: 'center',
    [theme.fn.smallerThan('sm')]: {
      marginBottom: theme.spacing.xl,
      alignSelf: 'center',
    },
  },
}))

export default useStyles
