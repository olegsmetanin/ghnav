import * as React from 'react'

import {
  Theme,
  WithStyles,
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import { IIssueListFilter } from 'interfaces/issue'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    appBar: {
      marginTop: 48
    },
    filter: {
      display: 'flex'
    },
    filterItem: {
      paddingRight: theme.spacing.unit * 2
    }
  })

export interface IBaseIssueListMenuProps extends WithStyles<typeof styles> {
  value: IIssueListFilter
  onChange: (value: IIssueListFilter) => void
}

export class BaseIssueListMenu extends React.Component<
  IBaseIssueListMenuProps,
  {}
> {
  handleOnStateChange = event => {
    const newState = { state: event.target.value }
    this.props.onChange(newState)
  }

  render() {
    const { classes, value } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color={'default'} className={classes.appBar}>
          <Toolbar variant="dense">
            <div className={classes.filter}>
              <div className={classes.filterItem}>
                <Typography variant="h6" color="inherit">
                  State
                </Typography>
              </div>
              <div className={classes.filterItem}>
                <Select
                  value={value.state}
                  onChange={this.handleOnStateChange}
                  inputProps={{
                    name: 'state',
                    id: 'state'
                  }}
                >
                  <MenuItem value={'all'}>All</MenuItem>
                  <MenuItem value={'open'}>Open</MenuItem>
                  <MenuItem value={'closed'}>Closed</MenuItem>
                </Select>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export const IssueListMenu = withStyles(styles)(BaseIssueListMenu)
