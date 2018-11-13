import { IIssue, IIssueListQuery } from 'interfaces/issue'

import { IProcessState } from 'interfaces/redux'
import { actionTypes } from './listActions'
import { handleActions } from 'common/redux/handleActions'

export interface IState {
  value?: IIssue[]
  error?: any
  query?: IIssueListQuery
  process?: IProcessState
}

export const initialState = {
  error: false,
  process: {}
}

export const listReducer = handleActions<IState>(
  {
    [actionTypes.LOAD]: state => {
      return {
        ...state,
        ...{
          process: {
            isLoading: true
          }
        }
      }
    },
    [actionTypes.LOAD_SUCCESS]: (state, action) => {
      return {
        ...state,
        ...{
          value: action.payload.query.add ? state.value.concat(action.payload.value) : action.payload.value,
          query: action.payload.query,
          process: {}
        }
      }
    },
    [actionTypes.FAILURE]: (state, action) => {
      return {
        ...state,
        ...{
          error: action.error
        }
      }
    }
  },
  initialState
)
