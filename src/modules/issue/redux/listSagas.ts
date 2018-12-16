/* global fetch */

import 'isomorphic-unfetch'

import { actionTypes, failure, loadSuccess } from './listActions'
import { put, takeLatest } from 'redux-saga/effects'

import { RepoNotDefinedError } from 'common/errors'

export function* loadSaga(action) {
  try {
    const query = action.payload
    if (!query.owner || !query.repo) {
      throw new RepoNotDefinedError('Owner/Repo is not defined')
    }

    const url = `https://api.github.com/repos/${query.owner}/${
      query.repo
    }/issues?state=${query.filter.state}&page=${query.page}&per_page=${
      query.per_page
    }`
    const response = yield fetch(url)
    if (response.status < 200 || response.status > 300) {
      throw new Error(response.statusText)
    }

    const value = yield response.json()

    if (!value.map) {
      throw new Error('data is not an array')
    }

    yield put(loadSuccess({ query, value }))
  } catch (err) {
    yield put(failure(err))
  }
}

export const listSagas = [takeLatest(actionTypes.LOAD, loadSaga)]
