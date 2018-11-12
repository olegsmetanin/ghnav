/* global fetch */

import 'isomorphic-unfetch'

import { actionTypes, failure, loadSuccess } from './itemActions'
import { put, takeLatest } from 'redux-saga/effects'

// import jsontab from 'modules/issue/containers/__tests__/issue.stab.json'

export function* loadSaga(action) {
  try {
    const query = action.payload
    const url = `https://api.github.com/repos/${query.owner}/${query.repo}/issues/${query.num}`
    const response = yield fetch(url)
    if (response.status < 200 || response.status > 300) {
      throw new Error(response.statusText)
    }
    const value = yield response.json()
    yield put(loadSuccess({ query, value }))
  } catch (err) {
    yield put(failure(err.message))
  }
}

export const itemSagas = [takeLatest(actionTypes.LOAD, loadSaga)]
