import * as React from 'react'

import {
  Theme,
  WithStyles,
  createStyles,
  withStyles
} from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import { IIssueQuery } from 'interfaces/issue'
import { Loader } from 'common/components/Loader'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import marked from 'marked'
import moment from 'moment'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      marginTop: 30,
      margin: 'auto',
      maxWidth: 600,
      padding: theme.spacing.unit * 2
    },
    paper: {
      marginTop: 30,
      padding: theme.spacing.unit * 2
    },
    content: {
      width: '100%',
      '& pre': {
        overflow: 'auto'
      }
    }
  })

export interface IBaseIssueOverviewProps extends WithStyles<typeof styles> {
  value: any
  query: any
  owner: string
  repo: string
  number: string
  onLoad: (query: IIssueQuery) => void
}

export class BaseIssueOverview extends React.Component<
  IBaseIssueOverviewProps,
  {}
> {
  isQueryMatch = () => {
    const { query, owner, repo, number: num } = this.props
    return (
      query &&
      query.owner === owner &&
      query.repo === repo &&
      query.number === num
    )
  }

  componentDidMount() {
    if (!this.isQueryMatch()) {
      const { owner, repo, number: num } = this.props
      this.props.onLoad({
        owner,
        repo,
        number: num
      })
    }
  }

  render() {
    const { classes, value } = this.props
    const isQueryMatch = this.isQueryMatch()

    return (
      <div className={classes.root}>
        {isQueryMatch && (
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item key="title">
                <Typography variant="h4" color="inherit">
                  {value.title}
                </Typography>
              </Grid>
              <Grid item key="created_at">
                <Typography variant="h6" color="inherit">
                  {moment(value.created_at).fromNow()}
                </Typography>
              </Grid>
              <Grid item key="body" className={classes.content}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(value.body)
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        )}
        {!isQueryMatch && <Loader />}
      </div>
    )
  }
}

export const IssueOverview = withStyles(styles)(BaseIssueOverview)
