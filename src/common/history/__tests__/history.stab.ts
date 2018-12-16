import { IHistory } from '../history'

export const historyDefaultStab: IHistory = {
  get: () => [],
  push: () => {
    return
  },
  matchPrevious: () => true,
  matchPreviousPathname: () => true,
  back: () => {
    return
  }
}

export const historyStab = (hs?: Partial<IHistory>): IHistory => ({
  ...historyDefaultStab,
  ...(hs || {})
})
