import * as React from 'react'

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import { IIssue } from 'interfaces/issue'
import { Link } from 'common/components/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'

const styles = theme =>
  createStyles({
    paper: {
      padding: theme.spacing.unit * 2
    }
  })

interface IBaseIssueListItemProps extends WithStyles<typeof styles> {
  owner: string
  repo: string
  value: IIssue
}

export class BaseIssueListItem extends React.Component<
  IBaseIssueListItemProps,
  {}
> {
  render() {
    const { classes, value, owner, repo } = this.props
    const { title, number: num, created_at, user } = value
    const createAtFromNow = moment(created_at).fromNow()

    return (
      <div>
        <Paper className={classes.paper}>
          <div>
            <Link
              href={{ pathname: '/issue', query: { owner, repo, number: num } }}
            >
              <a>
                <Typography variant="h6" color="inherit">
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  #{num} opened {createAtFromNow} by {user.login}
                </Typography>
              </a>
            </Link>
          </div>
          <div />
        </Paper>
      </div>
    )
  }
}

export const IssueListItem = withStyles(styles)(BaseIssueListItem)
