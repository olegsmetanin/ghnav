import * as React from 'react'

import { IIssue, IIssueListQuery } from 'interfaces/issue'
import {
  Theme,
  WithStyles,
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { IProcessState } from 'interfaces/redux'
import { IssueListItem } from 'modules/issue/components/IssueListItem'
import { IssueListMenu } from 'modules/issue/components/IssueListMenu'
import { Link } from 'common/components/Link'
import { RepoNotDefinedError } from 'common/errors'
import { Spinner } from 'common/components/Spinner'
import { isEqual } from 'lodash'

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

export interface IBaseIssueListProps
  extends IIssueListQuery,
    WithStyles<typeof styles> {
  process?: IProcessState
  query?: IIssueListQuery
  items?: IIssue[]

  error: any

  onLoad: (query) => void
  onFilterChange: (filter) => void
}

export class BaseIssueList extends React.Component<IBaseIssueListProps, {}> {
  static defaultProps = {
    page: 1,
    per_page: 10
  }

  propsIsEqual = to => {
    return (
      to &&
      isEqual(
        {
          owner: this.props.owner,
          repo: this.props.repo,
          filter: this.props.filter
        },
        {
          owner: to.owner,
          repo: to.repo,
          filter: to.filter
        }
      )
    )
  }

  onLoad = () => {
    const { owner, repo, filter, page, per_page } = this.props
    this.props.onLoad({
      owner,
      repo,
      filter,
      page,
      per_page
    })
  }

  componentDidMount() {
    if (!this.propsIsEqual(this.props.query)) {
      this.onLoad()
    }
  }

  handleOnLoadMore = () => {
    const { query } = this.props
    const newQuery = { ...query, page: +query.page + 1, add: true }
    this.props.onLoad(newQuery)
  }

  componentDidUpdate(prevProps) {
    const { owner, repo, filter } = prevProps
    if (!this.propsIsEqual({ owner, repo, filter })) {
      this.onLoad()
    }
    if (
      prevProps.query &&
      this.props.query.filter.state !== prevProps.query.filter.state
    ) {
      window.scrollTo(0, 0)
    }
  }

  handleOnFilterChange = filter => {
    if (this.props.onFilterChange) {
      this.props.onFilterChange(filter)
    }
  }

  render() {
    const { classes, items, process, error, filter, owner, repo } = this.props
    const isError = !!error
    const { isLoading, isLoadingMore } = process

    return (
      <div>
        <IssueListMenu value={filter} onChange={this.handleOnFilterChange} />

        {!isLoading && !isError && (
          <Grid container>
            {items &&
              items.length > 0 &&
              items.map(item => {
                return (
                  <Grid item key={item.id} xs={12} className={classes.gridItem}>
                    <IssueListItem owner={owner} repo={repo} value={item} />
                  </Grid>
                )
              })}
            {items && items.length === 0 && <div>No items</div>}
            {items && items.length > 0 && (
              <div key="button" className={classes.submitButtonWrap}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={this.handleOnLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? 'Loading...' : 'Load more'}
                </Button>
              </div>
            )}
          </Grid>
        )}
        {!isLoading && isError && (
          <div>
            {error.message}.{' '}
            {error instanceof RepoNotDefinedError && (
              <span>
                Try{' '}
                <Link
                  href={{
                    pathname: '/',
                    query: { owner: 'zeit', repo: 'next.js' }
                  }}
                >
                  <a>zeit/next.js</a>
                </Link>
              </span>
            )}
          </div>
        )}
        {isLoading && <Spinner />}
      </div>
    )
  }
}

export const IssueList = withStyles(styles)(BaseIssueList)
