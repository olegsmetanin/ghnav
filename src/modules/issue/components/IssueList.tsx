import * as React from 'react'

import { IIssue, IIssueListQuery } from 'interfaces/issue'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { IProcessState } from 'interfaces/redux'
import { IssueListItem } from 'modules/issue/components/IssueListItem'
import { IssueListMenu } from 'modules/issue/components/IssueListMenu'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Loader } from 'common/components/Loader'
import { json2router } from 'common/utils/json2router'

const styles = (theme: Theme) =>
  createStyles({
    gridItem: {
      marginBottom: theme.spacing.unit * 2
    },
    submitButtonWrap: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
    },
    progress: {
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      position: 'fixed',
      zIndex: 1600
    }
  })

export interface IBaseIssueListProps {
  process?: IProcessState
  query?: IIssueListQuery
  items?: IIssue[]

  onLoad: (query) => void
  onFilterChange: (filter) => void
}

export class BaseIssueList extends React.Component<IBaseIssueListProps & WithStyles<typeof styles>, {}> {
  handleOnLoadMore = () => {
    const { query } = this.props
    const newQuery = { ...query, page: +query.page + 1, add: true }
    this.props.onLoad(newQuery)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query && this.props.query.filter.state !== prevProps.query.filter.state) {
      window.scrollTo(0, 0)
    }
  }

  handleOnFilterChange = filter => {
    if (this.props.onFilterChange) {
      this.props.onFilterChange(filter)
    }
  }

  render() {
    const { classes, items, process, query } = this.props

    return (
      <div>
        {query && query.filter && <IssueListMenu value={query.filter} onChange={this.handleOnFilterChange} />}
        {process.isLoading && items && (
          <div className={classes.progress}>
            <LinearProgress />
          </div>
        )}
        <Grid container>
          {items &&
            items.map(value => {
              return (
                <Grid item key={value.id} xs={12} className={classes.gridItem}>
                  <IssueListItem value={value} owner={query.owner} repo={query.repo} />
                </Grid>
              )
            })}
          {items && (
            <div key="button" className={classes.submitButtonWrap}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.handleOnLoadMore}
                disabled={process && process.isLoading}
              >
                {process && process.isLoading ? 'Loading...' : 'Load more'}
              </Button>
            </div>
          )}
          {!items && <Loader />}
        </Grid>
      </div>
    )
  }
}

export const IssueList = withStyles(styles)(BaseIssueList)
