import { WithStyles, withStyles } from '@material-ui/core/styles'

import { Layout } from 'common/layout/Layout'
import Link from 'next/link'
import { MainMenu } from 'common/layout/MainMenu'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({})

class Index extends React.Component<WithStyles<typeof styles>, {}> {
  render() {
    return (
      <Layout title="Github issues">
        <React.Fragment>
          <MainMenu>
            <Typography variant="h5" color="inherit" noWrap={true}>
              Github issues
            </Typography>
          </MainMenu>
          <div>
            <Link href={{ pathname: 'issue', query: { owner: 'zeit', repo: 'next.js', num: '5630' } }}>
              <a>Look at the issue</a>
            </Link>
          </div>
        </React.Fragment>
      </Layout>
    )
  }
}

export default withStyles(styles)(Index)
