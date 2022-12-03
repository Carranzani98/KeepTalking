import { createStyles } from '@mantine/core'

const useStyles = createStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
    height: '100%',
    marginLeft: 100,
    marginRight: 100,

    [theme.fn.smallerThan('sm')]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
      flexWrap: 'wrap',
      margin: '0 auto',
    },
  },

  title: {
    color: theme.black,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    width: 200,
    marginTop: theme.spacing.xl * 1.5,
    [theme.fn.smallerThan('sm')]: {
      marginBottom: theme.spacing.xl,
      alignSelf: 'center',
    },
  },
}))

export default useStyles
