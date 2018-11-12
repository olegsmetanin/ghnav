import { combineReducers } from 'redux'
import { itemReducer as issueReducer } from 'modules/issue/redux/itemReducer'

export const rootReducer = combineReducers({
  issue: issueReducer
})
