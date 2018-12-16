import { RouterProps, SingletonRouter } from 'next/router'

export const routerDefaultStab: RouterProps = {
  asPath: '',
  pathname: '',
  route: '',
  components: {},
  back: () => {
    return
  },
  beforePopState: () => false,
  prefetch: async () => null,
  push: async () => false,
  reload: async () => null,
  replace: async () => false,
  events: {
    on: () => {
      return
    },
    off: () => {
      return
    }
  }
}

export const routerStab = (rs?: Partial<RouterProps>): SingletonRouter => {
  const drs = {
    ...routerDefaultStab,
    ...(rs || {})
  }
  return {
    ...drs,
    router: drs,
    readyCallbacks: [],
    ready: () => {
      return
    }
  }
}
