/* eslint-env jest */
import * as React from 'react'

/* eslint-env jest */
import { Loader } from '../Loader'
import { mount } from 'enzyme'

describe('Loader', () => {
  it('renders', async () => {
    const tree = mount(<Loader />)

    expect(tree.find('CircularProgress').exists()).toEqual(true)
  })
})
