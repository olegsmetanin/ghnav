import * as React from 'react'

import {
  Theme,
  WithStyles,
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import Head from 'next/head'

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      a: {
        color: theme.palette.primary.light,
        textDecoration: 'none'
      }
    },
    root: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto'
      },

      marginTop: theme.spacing.unit * 7
    }
  })

export interface ILayoutProps {
  title?: string
}

export const BaseLayout: React.SFC<
  ILayoutProps & WithStyles<typeof styles>
> = ({ children, classes, title = 'This is the default title' }) => {
  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  )
}

export const Layout = withStyles(styles)(BaseLayout)
