export const actionTypes = {
  INCREMENT: 'COUNTER/INCREMENT',
  INCREMENT_SUCCESS: 'COUNTER/INCREMENT_SUCCESS',
  INCREMENT_FAILURE: 'COUNTER/INCREMENT_FAILURE'
}

export function increment(value: number) {
  return {
    type: actionTypes.INCREMENT,
    payload: value
  }
}

export function incrementSuccess(value: number) {
  return {
    type: actionTypes.INCREMENT_SUCCESS,
    payload: value
  }
}

export function incrementFailure(error) {
  return {
    type: actionTypes.INCREMENT_FAILURE,
    error
  }
}
