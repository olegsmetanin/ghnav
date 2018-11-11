/* eslint-env jest */
import { Counter } from '../Counter'
import React from 'react'
import { shallow } from 'enzyme'

describe('Counter', () => {
  it('renders correct with click', () => {
    const mockFn = jest.fn()
    const next = () => 1
    const tree = shallow(
      <Counter onIncrement={mockFn} value={0} next={next}>
        Hello
      </Counter>
    )
    tree.simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
