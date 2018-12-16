/**
 * @jest-environment node
 */

import { History } from '../'

describe('history', () => {
  it('works in node', async () => {
    const router = {
      events: {
        on: () => {
          return
        }
      }
    }

    const hs = new History(router)
    expect(hs.previous()).toEqual(null)
    expect(hs.get()).toEqual([])
  })
})
