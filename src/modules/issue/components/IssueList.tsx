import * as React from 'react'

import { IIssue, IIssueListQuery } from 'interfaces/issue'
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { IProcessState } from 'interfaces/redux'
import { IssueListItem } from 'modules/issue/components/IssueListItem'
import { Loader } from 'common/components/Loader'

const styles = (theme: Theme) =>
  createStyles({
    gridItem: {
      marginBottom: theme.spacing.unit * 2
    },
    submitButtonWrap: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
    }
  })

export interface IBaseIssueListProps {
  process?: IProcessState
  query?: IIssueListQuery
  items?: IIssue[]

  onLoad: (query) => void
}

export class BaseIssueList extends React.Component<IBaseIssueListProps & WithStyles<typeof styles>, {}> {
  handleOnLoadMore = () => {
    const { query } = this.props
    const newQuery = { ...query, page: +query.page + 1, add: true }
    this.props.onLoad(newQuery)
  }

  render() {
    const { classes, items, process, query } = this.props

    return (
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
    )
  }
}

export const IssueList = withStyles(styles)(BaseIssueList)
