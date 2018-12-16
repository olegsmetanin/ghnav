import { actionTypes } from './itemActions'
import { handleActions } from 'common/redux/handleActions'

export const initialState = {
  error: null,
  process: {
    isLoading: true
  }
}

interface IState {
  value?: any
  error?: any
  query?: any
}

export const itemReducer = handleActions<IState>(
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

// export function itemReducer(state = initialState, action) {
//   switch (action.type) {
//     case actionTypes.FAILURE:
//       return {
//         ...state,
//         ...{
//           error: action.error
//         }
//       }

//     case actionTypes.LOAD_SUCCESS:
//       return {
//         ...state,
//         ...{
//           value: action.payload.value,
//           query: action.payload.query
//         }
//       }

//     default:
//       return state
//   }
// }
