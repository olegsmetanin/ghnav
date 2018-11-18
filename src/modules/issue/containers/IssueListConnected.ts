import {
  issueListProcessSelector,
  issueListQuerySelector,
  issueListValueSelector
} from 'modules/issue/redux/listSelectors'

import { IssueList } from 'modules/issue/components/IssueList'
import { connect } from 'react-redux'
import { load } from 'modules/issue/redux/listActions'
import { withRouter } from 'next/router'

const mapStateToProps = state => ({
  items: issueListValueSelector(state),
  query: issueListQuerySelector(state),
  process: issueListProcessSelector(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: query => dispatch(load(query)),
  onRouteChange: route => ownProps.router.push(route)
})

export const IssueListConnected = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssueList)
)
