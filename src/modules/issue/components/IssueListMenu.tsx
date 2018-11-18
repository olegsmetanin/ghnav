import * as React from 'react'

import { IIssue, IIssueFilter, IIssueListQuery } from 'interfaces/issue'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import { IProcessState } from 'interfaces/redux'
import InputLabel from '@material-ui/core/InputLabel'
import { IssueListItem } from 'modules/issue/components/IssueListItem'
import { Loader } from 'common/components/Loader'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = (theme: Theme) =>
  createStyles({
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

export interface IBaseIssueListMenuProps {
  value: IIssueFilter
  onChange: (value: IIssueFilter) => void
}

export class BaseIssueListMenu extends React.Component<IBaseIssueListMenuProps & WithStyles<typeof styles>, {}> {
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
