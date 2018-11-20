import { combineReducers } from 'redux'
import { listReducer as issueListReducer } from 'modules/issue/redux/listReducer'
import { itemReducer as issueReducer } from 'modules/issue/redux/itemReducer'
import { listReducer as repoListReducer } from 'modules/repo/redux/listReducer'

export const rootReducer = combineReducers({
  issue: issueReducer,
  issueList: issueListReducer,
  repoList: repoListReducer
})
