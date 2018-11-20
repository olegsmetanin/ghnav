/* global fetch */

import 'isomorphic-unfetch'

import { actionTypes, failure, loadSuccess } from './listActions'
import { put, takeLatest } from 'redux-saga/effects'

export function* loadSaga(action) {
  try {
    const query = action.payload
    const url = `https://api.github.com/search/repositories?q=${query.search}&sort=stars&order=desc`
    const response = yield fetch(url)
    if (response.status < 200 || response.status > 300) {
      throw new Error(response.statusText)
    }

    const respValue = yield response.json()

    if (!(respValue.items && respValue.items.map)) {
      throw new Error('data is not an array')
    }

    const value = respValue.items.map(item => {
      const { id, full_name } = item
      const [owner, repo] = full_name.split('/')
      return {
        id,
        owner,
        repo
      }
    })
    yield put(loadSuccess({ query, value }))
  } catch (err) {
    yield put(failure(err.message))
  }
}

export const listSagas = [takeLatest(actionTypes.LOAD, loadSaga)]
