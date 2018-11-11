import { WithStyles, withStyles } from '@material-ui/core/styles'

import { CounterConnected } from 'modules/counter/containers/CounterConnected'
import { Layout } from 'common/layout/Layout'
import { MainMenu } from 'common/layout/MainMenu'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({})

class Index extends React.Component<WithStyles<typeof styles>, {}> {
  next = () => 1

  render() {
    return (
      <Layout title="Github issues">
        <React.Fragment>
          <MainMenu>
            <Typography variant="h5" color="inherit" noWrap={true}>
              Github issues
            </Typography>
          </MainMenu>
          <CounterConnected next={this.next}>Click me</CounterConnected>
        </React.Fragment>
      </Layout>
    )
  }
}

export default withStyles(styles)(Index)
