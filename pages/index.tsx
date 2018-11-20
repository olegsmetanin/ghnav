import { IHistory, history } from 'common/history'
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import { IssueListConnected } from 'modules/issue/containers/IssueListConnected'
import { Layout } from 'common/layout/Layout'
import { MainMenu } from 'common/layout/MainMenu'
import React from 'react'
import { RepoSelectConnected } from 'modules/repo/containers/RepoSelectConnected'
import Typography from '@material-ui/core/Typography'
import { json2router } from 'common/utils/json2router'
import { load } from 'modules/issue/redux/listActions'
import { merge } from 'lodash'
import { qs2json } from 'common/utils/qs2json'
import { withRouter } from 'next/router'

const styles = theme =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 14
    }
  })

export interface IIndex {
  owner: string
  repo: string
  history: IHistory
}

class Index extends React.Component<IIndex & WithStyles<typeof styles>, {}> {
  static async getInitialProps({ ctx }) {
    const { store, isServer } = ctx

    const query = merge(
      {
        page: 1,
        per_page: 10,
        owner: 'zeit',
        repo: 'next.js',
        filter: {
          state: 'all'
        }
      },
      qs2json(ctx.asPath)
    )

    if (isServer || !history.isComeBack) {
      store.dispatch(load(query))
    }

    return query
  }

  handleOnRepoChange = (repoFullName: string) => {
    const [owner, repo] = repoFullName.split('/')
    this.props.router.push({
      pathname: '/',
      query: {
        owner,
        repo
      }
    })
  }

  handleOnIssueFilterChange = filter => {
    const { owner, repo } = this.props
    const query = json2router({
      owner,
      repo,
      filter
    })
    this.props.router.push({
      pathname: '/',
      query
    })
  }

  render() {
    const { classes, owner, repo } = this.props

    return (
      <div className={classes.root}>
        <Layout title={`Github ${owner}/${repo} issues`}>
          <React.Fragment>
            <MainMenu>
              <Typography variant="h5" color="inherit" noWrap>
                Github issues
              </Typography>
              <RepoSelectConnected value={`${owner}/${repo}`} onChange={this.handleOnRepoChange} />
            </MainMenu>
            <IssueListConnected onFilterChange={this.handleOnIssueFilterChange} />
          </React.Fragment>
        </Layout>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Index))
