import {
  issueListProcessSelector,
  issueListQuerySelector,
  issueListValueSelector
} from 'modules/issue/redux/listSelectors'

import { IssueList } from 'modules/issue/components/IssueList'
import { connect } from 'react-redux'
import { load } from 'modules/issue/redux/listActions'

const mapStateToProps = state => ({
  items: issueListValueSelector(state),
  query: issueListQuerySelector(state),
  process: issueListProcessSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: query => dispatch(load(query))
})

export const IssueListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueList)
