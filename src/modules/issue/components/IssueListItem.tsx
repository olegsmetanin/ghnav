import * as React from 'react'

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import { IIssue } from 'interfaces/issue'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme =>
  createStyles({
    paper: {
      padding: theme.spacing.unit * 2
    }
  })

interface IBaseIssueListItemProps {
  value: IIssue
  owner: string
  repo: string
}

export class BaseIssueListItem extends React.Component<IBaseIssueListItemProps & WithStyles<typeof styles>, {}> {
  render() {
    const { classes, value, owner, repo } = this.props
    const { title, number: num, create_at } = value

    return (
      <div>
        <Paper className={classes.paper}>
          <div>
            <Link href={{ pathname: '/issue', query: { owner, repo, number: num } }}>
              <a>
                <Typography variant="h6" color="inherit">
                  #{num} {title} {create_at}
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
