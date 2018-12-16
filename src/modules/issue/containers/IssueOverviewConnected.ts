import {
  issueQuerySelector,
  issueValueSelector
} from 'modules/issue/redux/itemSelectors'

import { IssueOverview } from 'modules/issue/components/IssueOverview'
import { connect } from 'react-redux'
import { load } from 'modules/issue/redux/itemActions'

const mapStateToProps = state => ({
  value: issueValueSelector(state),
  query: issueQuerySelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: query => dispatch(load(query))
})

export const IssueOverviewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueOverview)
