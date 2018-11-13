import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import { IssueListConnected } from 'modules/issue/containers/IssueListConnected'
import { Layout } from 'common/layout/Layout'
import { MainMenu } from 'common/layout/MainMenu'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { load } from 'modules/issue/redux/listActions'
import { merge } from 'lodash'
import { qs2json } from 'common/utils/qs2json'

const styles = () => createStyles({})

export interface IIndex {
  owner: string
  repo: string
}

class Index extends React.Component<IIndex & WithStyles<typeof styles>, {}> {
  static async getInitialProps({ ctx }) {
    const { store } = ctx

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

    store.dispatch(load(query))
    return query
  }

  render() {
    const { owner, repo } = this.props

    return (
      <Layout title={`Github ${owner}/${repo} issues`}>
        <React.Fragment>
          <MainMenu>
            <Typography variant="h5" color="inherit" noWrap>
              Github {owner}/{repo} issues
            </Typography>
          </MainMenu>
          <IssueListConnected />
        </React.Fragment>
      </Layout>
    )
  }
}

export default withStyles(styles)(Index)
