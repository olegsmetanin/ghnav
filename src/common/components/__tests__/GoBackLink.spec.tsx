/* eslint-env jest */
import { BaseGoBackLink, GoBackLink } from '../GoBackLink'

/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

// https://github.com/zeit/next.js/issues/1827
// You can't click on next/link because
// "You should only use "next/router" inside the client side of your app."
jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

describe('GoBackLink', () => {
  it('renders', async () => {
    const history = {
      back: jest.fn(),
      matchPreviousPathname: () => true
    }

    const tree = mount(
      <BaseGoBackLink href="/qwe" history={history}>
        <a>Hello</a>
      </BaseGoBackLink>
    )

    tree.simulate('click')

    expect(history.back.mock.calls.length).toBe(1)
  })

  it('not allow clicks if no valid router', async () => {
    const history = {
      back: jest.fn(),
      matchPreviousPathname: () => false
    }

    const tree = mount(
      <BaseGoBackLink href="/qwe" history={history}>
        <a>Hello</a>
      </BaseGoBackLink>
    )

    tree.simulate('click')

    expect(history.back.mock.calls.length).toBe(0)
  })
})
