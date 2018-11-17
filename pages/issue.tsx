import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { GoBackLink } from 'common/components/GoBackLink'
import IconButton from '@material-ui/core/IconButton'
import { IssueOverviewConnected } from 'modules/issue/containers/IssueOverviewConnected'
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
  number: string
}

class IssuePage extends React.Component<IIssuePage & WithStyles<typeof styles>, {}> {
  static async getInitialProps({ ctx }) {
    const { store } = ctx
    const query = qs2json(ctx.asPath)
    store.dispatch(load(query))
    return query
  }

  render() {
    const { classes, owner, repo, number } = this.props

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
            Github {owner}/{repo} #{number}
          </Typography>
        </MainMenu>
        <IssueOverviewConnected {...{ owner, repo, number }} />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(IssuePage)
