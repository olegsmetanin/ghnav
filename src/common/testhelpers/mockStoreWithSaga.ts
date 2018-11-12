import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'

export function mockStoreWithSaga({ initial, saga }) {
  const sagaMiddleware = createSagaMiddleware()
  const mockStore = configureMockStore([sagaMiddleware])
  const store = mockStore(initial)
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(saga)
  }

  store.runSagaTask()

  return store
}
