/* eslint-env jest */
import { counterErrorSelector, counterValueSelector } from '../selectors'

describe('Counter selectors', () => {
  it('should select value', () => {
    const state = { counter: { value: 7 } }
    expect(counterValueSelector(state)).toBe(7)
  })

  it('should select value', () => {
    const state = { counter: { error: 0 } }
    expect(counterErrorSelector(state)).toBe(0)
  })
})
