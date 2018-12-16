/* eslint-env jest */
import * as React from 'react'

import {
  historyDefaultStab,
  historyStab
} from 'common/history/__tests__/history.stab'

/* eslint-env jest */
import { BaseGoBackLink } from '../GoBackLink'
import { IHistory } from 'common/history'
import { mount } from 'enzyme'

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
    // const props = {
    //   history: historyStab({
    //     back: jest.fn(),
    //     matchPreviousPathname: () => true
    //   })
    // }

    // const props = {
    //   history: historyStab({
    //     back: jest.fn(),
    //     matchPreviousPathname: () => true
    //   })
    // }

    // historyDefaultStab

    const HistoryMock = jest.fn<IHistory>(() => ({
      ...historyDefaultStab,
      back: jest.fn(),
      matchPreviousPathname: () => true
    }))

    const props = {
      history: new HistoryMock()
    }

    const tree = mount(
      <BaseGoBackLink href="/qwe" {...props}>
        <a>Hello</a>
      </BaseGoBackLink>
    )

    tree.simulate('click')

    expect(props.history.back).toHaveBeenCalledTimes(1)
  })

  it('not allow clicks if no valid router', async () => {
    const history = historyStab({
      back: jest.fn(),
      matchPreviousPathname: () => false
    })

    const tree = mount(
      <BaseGoBackLink href="/qwe" history={history}>
        <a>Hello</a>
      </BaseGoBackLink>
    )

    tree.simulate('click')

    expect(history.back).toHaveBeenCalledTimes(0)
  })
})
