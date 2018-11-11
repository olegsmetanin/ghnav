/* eslint-env jest */
import Index from '../index'
import React from 'react'
import renderer from 'react-test-renderer'

describe('Index', () => {
  it('renders correct', () => {
    const component = renderer.create(<Index />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
