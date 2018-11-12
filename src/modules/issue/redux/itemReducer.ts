import { actionTypes } from './itemActions'

export const initialState = {
  error: false
}

export function itemReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{
          error: action.error
        }
      }

    case actionTypes.LOAD_SUCCESS:
      return {
        ...state,
        ...{
          value: action.payload.value,
          query: action.payload.query
        }
      }

    default:
      return state
  }
}
