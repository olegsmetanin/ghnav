import * as React from 'react'

import { IWithHistoryProps, withHistory } from 'common/history/withHistory'
import { WithRouterProps, withRouter } from 'next/router'
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import { IIssueListQuery } from 'interfaces/issue'
import { IssueListConnected } from 'modules/issue/containers/IssueListConnected'
import { Layout } from 'common/layout/Layout'
import { MainMenu } from 'common/layout/MainMenu'
import { RepoSelectConnected } from 'modules/repo/containers/RepoSelectConnected'
import Typography from '@material-ui/core/Typography'
import { load } from 'modules/issue/redux/listActions'
import { merge } from 'lodash'
import { qs2json } from 'common/utils/qs2json'

const styles = theme =>
  createStyles({
    root: {
      marginTop: theme.spacing.unit * 14
    }
  })

export interface IIndexProps
  extends Partial<IIssueListQuery>,
    WithStyles<typeof styles>,
    IWithHistoryProps,
    WithRouterProps {}

export class BaseIndex extends React.Component<IIndexProps, {}> {
  static defaultProps = {
    filter: {
      state: 'all'
    }
  }

  static async getInitialProps({ ctx }) {
    const { store, isServer } = ctx

    const qs = ctx.asPath

    const query = merge({}, BaseIndex.defaultProps, qs2json(qs))

    if (isServer) {
      if (query.owner && query.repo) {
        store.dispatch(load(query))
      }
    }

    return query as IIndexProps
  }

  route2query = () => {
    const qs = this.props.router.asPath
    const query = {
      ...BaseIndex.defaultProps,
      ...qs2json(qs)
    }
    return query
  }

  handleOnRepoChange = (repoFullName: string) => {
    const [owner, repo] = repoFullName.split('/')

    const query = {
      ...this.route2query(),
      owner,
      repo
    }

    this.props.history.push(
      {
        pathname: '/',
        query
      },
      {
        shallow: true
      }
    )
  }

  handleOnIssueFilterChange = filter => {
    const query = {
      ...this.route2query(),
      filter
    }

    this.props.history.push(
      {
        pathname: '/',
        query
      },
      {
        shallow: true
      }
    )
  }

  render() {
    const { classes } = this.props

    const query = this.route2query()
    const { owner, repo, filter } = query

    const repoFullName = owner && repo ? owner + '/' + repo : ''
    return (
      <div className={classes.root}>
        <Layout
          title={`Github ${repoFullName ? repoFullName + ' ' : ''}issues`}
        >
          <React.Fragment>
            <MainMenu>
              <Typography variant="h5" color="inherit" noWrap>
                Github issues
              </Typography>
              <RepoSelectConnected
                value={repoFullName}
                onChange={this.handleOnRepoChange}
              />
            </MainMenu>
            <IssueListConnected
              {...{ owner, repo, filter }}
              onFilterChange={this.handleOnIssueFilterChange}
            />
          </React.Fragment>
        </Layout>
      </div>
    )
  }
}

export const Index = withStyles(styles)(BaseIndex)

export const IndexPage = withHistory(withRouter(Index))

export default IndexPage
