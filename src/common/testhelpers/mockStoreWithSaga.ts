import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'

export function mockStoreWithSaga({ initial, saga }) {
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureMockStore([sagaMiddleware])
  const store = mockStore(initial)

  const runSagaTaskKey = 'runSagaTask'
  const sagaTask = 'sagaTask'

  store[runSagaTaskKey] = () => {
    store[sagaTask] = sagaMiddleware.run(saga)
  }

  store[runSagaTaskKey]()

  return store
}
