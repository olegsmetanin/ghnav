import { repoListProcessSelector, repoListQuerySelector, repoListValueSelector } from 'modules/repo/redux/listSelectors'

import { RepoSelect } from 'modules/repo/components/RepoSelect'
import { connect } from 'react-redux'
import { load } from 'modules/repo/redux/listActions'

const mapStateToProps = state => ({
  items: repoListValueSelector(state),
  query: repoListQuerySelector(state),
  process: repoListProcessSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onLoad: query => dispatch(load(query))
})

export const RepoSelectConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoSelect)
