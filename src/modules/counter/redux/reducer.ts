import { actionTypes } from './actions'

export const initialState = {
  value: 0
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT_SUCCESS:
      return {
        ...state,
        ...{
          value: state.value + action.payload
        }
      }

    default:
      return state
  }
}
