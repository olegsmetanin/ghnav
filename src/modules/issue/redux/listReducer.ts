import { actionTypes } from './listActions'
import { handleActions } from 'common/redux/handleActions'

export const initialState = {
  error: false
}

interface IState {
  value?: any
  error?: any
  query?: any
}

export const listReducer = handleActions<IState>(
  {
    [actionTypes.FAILURE]: (state, action) => {
      return {
        ...state,
        ...{
          error: action.error
        }
      }
    },
    [actionTypes.LOAD_SUCCESS]: (state, action) => {
      return {
        ...state,
        ...{
          value: action.payload.value,
          query: action.payload.query
        }
      }
    }
  },
  initialState
)
