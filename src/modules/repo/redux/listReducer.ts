import { IRepo, IRepoListQuery } from 'interfaces/repo'

import { IProcessState } from 'interfaces/redux'
import { actionTypes } from './listActions'
import { handleActions } from 'common/redux/handleActions'

export interface IState {
  value?: IRepo[]
  error?: any
  query?: IRepoListQuery
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
          value: action.payload.value,
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
