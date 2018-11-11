import { CounterConnected } from '../CounterConnected'
import React from 'react'
import { all } from 'redux-saga/effects'
import configureMockStore from 'redux-mock-store'
import { sagas as counterSagas } from 'modules/counter/redux/sagas'
import createSagaMiddleware from 'redux-saga'
/* eslint-env jest */
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('CounterConnected', () => {
  it('renders correct with click', () => {
    const store = mockStore({ counter: { value: 0 } })

    const next = () => 1

    const tree = renderer.create(
      <CounterConnected id="cc" store={store} next={next}>
        Hello
      </CounterConnected>
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('failed if next returns not a number', () => {
    const store = mockStore({ counter: { value: 0 } })

    function* rootSaga() {
      yield all([...counterSagas])
    }

    store.runSagaTask = () => {
      store.sagaTask = sagaMiddleware.run(rootSaga)
    }

    store.runSagaTask()

    const next = () => 'qwe'

    const tree = mount(
      <CounterConnected id="cc" store={store} next={next}>
        Hello
      </CounterConnected>
    )

    tree
      .find('#cc')
      .first()
      .simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([
      { payload: 'qwe', type: 'COUNTER/INCREMENT' },
      { error: 'increment value must be a number', type: 'COUNTER/INCREMENT_FAILURE' }
    ])
  })
})
