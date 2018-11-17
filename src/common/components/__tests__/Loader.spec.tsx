/* eslint-env jest */
import { Loader } from '../Loader'
/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'

describe('Loader', () => {
  it('renders', async () => {
    const tree = mount(<Loader />)

    expect(tree.find('CircularProgress').exists()).toEqual(true)
  })
})
