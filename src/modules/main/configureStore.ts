import { applyMiddleware, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './rootReducer'
import { rootSaga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = middleware => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  /* istanbul ignore next */
  return applyMiddleware(...middleware)
}

export function configureStore(initialState?: object) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  const runSagaTaskKey = 'runSagaTask'
  const sagaTask = 'sagaTask'

  store[runSagaTaskKey] = () => {
    store[sagaTask] = sagaMiddleware.run(rootSaga)
  }

  store[runSagaTaskKey]()
  return store
}
