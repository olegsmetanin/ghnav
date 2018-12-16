import * as React from 'react'

import { WithRouterProps, withRouter } from 'next/router'
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { GoBackLink } from 'common/components/GoBackLink'
import IconButton from '@material-ui/core/IconButton'
import { IssueOverviewConnected } from 'modules/issue/containers/IssueOverviewConnected'
import { MainMenu } from 'common/layout/MainMenu'
import Typography from '@material-ui/core/Typography'
import { load } from 'modules/issue/redux/itemActions'
import { qs2json } from 'common/utils/qs2json'

const styles = () =>
  createStyles({
    backLink: {
      color: 'white'
    }
  })

export interface IIssuePage {
  owner: string
  repo: string
  number: string
}

class Issue extends React.Component<
  IIssuePage & WithStyles<typeof styles> & WithRouterProps,
  {}
> {
  static async getInitialProps({ ctx }) {
    const { store, isServer } = ctx

    const qs = ctx.asPath
    const query = qs2json(qs)

    if (isServer) {
      if (query.owner && query.repo && query.number) {
        store.dispatch(load(query))
      }
    }

    return query
  }

  render() {
    const { classes } = this.props
    const { owner, repo, number: num } = this.props

    return (
      <React.Fragment>
        <MainMenu>
          <GoBackLink href={{ pathname: '/', query: { owner, repo } }}>
            <a className={classes.backLink}>
              <IconButton color="inherit">
                <ChevronLeftIcon />
              </IconButton>
            </a>
          </GoBackLink>

          <Typography variant="h5" color="inherit" noWrap={true}>
            Github{' '}
            {!!owner && !!repo && !!num
              ? owner + '/' + repo + ' #' + num
              : 'issue'}
          </Typography>
        </MainMenu>
        <IssueOverviewConnected {...{ owner, repo, number: num }} />
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Issue))
