/* global fetch */

import 'isomorphic-unfetch'

import { actionTypes, failure, loadSuccess } from './listActions'
import { put, takeLatest } from 'redux-saga/effects'

export function* loadSaga(action) {
  try {
    const query = action.payload
    const url = `https://api.github.com/repos/${query.owner}/${query.repo}/issues?state=${query.filter.state}&page=${
      query.page
    }&per_page=${query.per_page}`
    const response = yield fetch(url)
    if (response.status < 200 || response.status > 300) {
      throw new Error(response.statusText)
    }
    const orgValue = yield response.json()
    // not covered with test?
    if (!(orgValue instanceof Array)) {
      throw new Error('data is not an array')
    }
    const value = orgValue.map(val => ({
      ...val,
      num: val.number
    }))
    yield put(loadSuccess({ query, value }))
  } catch (err) {
    yield put(failure(err.message))
  }
}

export const listSagas = [takeLatest(actionTypes.LOAD, loadSaga)]
