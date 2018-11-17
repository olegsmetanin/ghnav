import { put, takeEvery } from 'redux-saga/effects'

import { mockStoreWithSaga } from '../mockStoreWithSaga'

describe('mockStoreWithSaga', () => {
  afterEach(() => {
    store.clearActions()
  })

  function* exampleSaga() {
    yield put({ type: 'EXAMPLE_SUCCEEDED', payload: { value: 'example' } })
  }

  function* rootSaga() {
    yield takeEvery('EXAMPLE', exampleSaga)
  }

  const store = mockStoreWithSaga({
    initial: {},
    saga: rootSaga
  })

  it('should work', async () => {
    store.dispatch({ type: 'EXAMPLE' })

    await new Promise(resolve => setImmediate(resolve))

    expect(store.getActions()).toEqual([
      { type: 'EXAMPLE' },
      { payload: { value: 'example' }, type: 'EXAMPLE_SUCCEEDED' }
    ])
  })
})
