import { actionTypes, incrementFailure, incrementSuccess } from './actions'
import { put, takeLatest } from 'redux-saga/effects'

export function* incrementSaga(action) {
  try {
    const value = action.payload

    if (typeof value === 'number') {
      yield put(incrementSuccess(value))
    } else {
      throw new Error('increment value must be a number')
    }
  } catch (err) {
    yield put(incrementFailure(err.message))
  }
}

export const sagas = [takeLatest(actionTypes.INCREMENT, incrementSaga)]
