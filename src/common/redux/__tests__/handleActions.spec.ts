import { handleActions } from '../handleActions'

describe('handleActions', () => {
  it('works', () => {
    const reducer = handleActions<{}>(
      {
        ['qwe']: (state, action) => ({ ...state, asd: '2' })
      },
      {}
    )

    expect(reducer({ asd: '1' }, { type: 'asd' })).toEqual({ asd: '1' })
    expect(reducer({ asd: '1' }, { type: 'qwe' })).toEqual({ asd: '2' })
    expect(reducer(undefined, null)).toEqual({})
  })
})
