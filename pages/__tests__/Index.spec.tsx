/* eslint-env jest */
import Index from '../index'
import { Provider } from 'react-redux'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { rootSaga } from 'modules/main/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const mockStore = configureMockStore([sagaMiddleware])

describe('Index', () => {
  it('renders correct', () => {
    const store = mockStore({ counter: { value: 0 } })
    const component = renderer.create(
      <Provider store={store}>
        <Index />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
