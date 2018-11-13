import * as React from 'react'

import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import { Loader } from 'common/components/Loader'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import marked from 'marked'

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

export interface IBaseIssueOverviewProps {
  value: any
  query: any
  owner: string
  repo: string
  num: string
}

export class BaseIssueOverview extends React.Component<IBaseIssueOverviewProps & WithStyles<typeof styles>, {}> {
  render() {
    const { classes, value, query, owner, repo, num } = this.props
    // console.log('render', query, owner, repo, number)
    const isDirty = !(value && query && query.owner === owner && query.repo === repo && query.num === num)

    return (
      <div className={classes.root}>
        {!isDirty && (
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item key="title">
                <Typography variant="h4" color="inherit">
                  {value.title}
                </Typography>
              </Grid>
              <Grid item key="created_at">
                <Typography variant="h6" color="inherit">
                  {value.created_at}
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
        {isDirty && <Loader />}
      </div>
    )
  }
}

export const IssueOverview = withStyles(styles)(BaseIssueOverview)
