import { IIssue, IIssueListQuery } from 'interfaces/issue'

import { IProcessState } from 'interfaces/redux'
import { actionTypes } from './listActions'
import { handleActions } from 'common/redux/handleActions'

export interface IState {
  value?: IIssue[]
  error?: Error
  query?: IIssueListQuery
  process?: IProcessState
}

export const initialState = {
  error: null,
  process: {
    isLoading: true
  }
}

export const listReducer = handleActions<IState>(
  {
    [actionTypes.LOAD]: (state, action) => {
      return {
        ...state,
        ...{
          process: {
            [action.payload.add ? 'isLoadingMore' : 'isLoading']: true
          }
        }
      }
    },
    [actionTypes.LOAD_SUCCESS]: (state, action) => {
      return {
        ...state,
        ...{
          value: action.payload.query.add
            ? state.value.concat(action.payload.value)
            : action.payload.value,
          query: action.payload.query,
          process: {},
          error: null
        }
      }
    },
    [actionTypes.FAILURE]: (state, action) => {
      return {
        ...state,
        ...{
          error: action.error,
          process: {}
        }
      }
    }
  },
  initialState
)
