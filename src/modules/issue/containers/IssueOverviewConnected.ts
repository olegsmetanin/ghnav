import { issueQuerySelector, issueValueSelector } from 'modules/issue/redux/itemSelectors'

import { IssueOverview } from 'modules/issue/components/IssueOverview'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  value: issueValueSelector(state),
  query: issueQuerySelector(state)
})

export const IssueOverviewConnected = connect(mapStateToProps)(IssueOverview)
