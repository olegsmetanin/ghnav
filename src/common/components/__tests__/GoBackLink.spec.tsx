/* eslint-env jest */
import { GoBackLink } from '../GoBackLink'
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
    const router = {
      back: jest.fn()
    }

    const history = {
      matchPrevious: () => true
    }

    const tree = mount(
      <GoBackLink href="/qwe" router={router} history={history}>
        <a>Hello</a>
      </GoBackLink>
    )

    tree.simulate('click')

    expect(router.back.mock.calls.length).toBe(1)
  })

  it('not allow clicks if no valid router', async () => {
    const router = {
      back: jest.fn()
    }

    const history = {
      matchPrevious: () => false
    }

    const tree = mount(
      <GoBackLink href="/qwe" router={router} history={history}>
        <a>Hello</a>
      </GoBackLink>
    )

    tree.simulate('click')

    expect(router.back.mock.calls.length).toBe(0)
  })

  it('not allow clicks if no valid router', async () => {
    const router = {
      back: jest.fn()
    }

    const tree = mount(
      <GoBackLink href="/qwe" router={router}>
        <a>Hello</a>
      </GoBackLink>
    )

    tree.simulate('click')

    expect(router.back.mock.calls.length).toBe(0)
  })
})
