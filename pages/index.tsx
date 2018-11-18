import { IHistory, history } from 'common/history'
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import { IssueListConnected } from 'modules/issue/containers/IssueListConnected'
import { Layout } from 'common/layout/Layout'
import { MainMenu } from 'common/layout/MainMenu'
import React from 'react'
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

  render() {
    const { classes, owner, repo } = this.props

    return (
      <div className={classes.root}>
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
      </div>
    )
  }
}

export default withStyles(styles)(Index)
