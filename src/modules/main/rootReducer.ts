import { combineReducers } from 'redux'
import { reducer as counterReducer } from 'modules/counter/redux/reducer'

export const rootReducer = combineReducers({
  counter: counterReducer
})
