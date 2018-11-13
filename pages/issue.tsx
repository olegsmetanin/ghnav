import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import { IssueOverviewConnected } from 'modules/issue/containers/IssueOverviewConnected'
import Link from 'next/link'
import { MainMenu } from 'common/layout/MainMenu'
import React from 'react'
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
  num: string
}

class IssuePage extends React.Component<IIssuePage & WithStyles<typeof styles>, {}> {
  // http://localhost:3000/issue?owner=zeit&repo=next.js&num=5638
  static async getInitialProps({ ctx }) {
    const { store } = ctx
    const query = qs2json(ctx.asPath)
    store.dispatch(load(query))
    return query
  }

  render() {
    const { classes, owner, repo, num } = this.props

    return (
      <React.Fragment>
        <MainMenu>
          <Link href={{ pathname: '/', query: { owner, repo } }}>
            <a className={classes.backLink}>
              <IconButton color="inherit">
                <ChevronLeftIcon />
              </IconButton>
            </a>
          </Link>

          <Typography variant="h5" color="inherit" noWrap={true}>
            Github {owner}/{repo} #{num}
          </Typography>
        </MainMenu>
        <IssueOverviewConnected {...{ owner, repo, num }} />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(IssuePage)
