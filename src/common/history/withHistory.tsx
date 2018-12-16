import * as React from 'react'

import { IHistory, history } from './history'

import hoistNonReactStatics from 'hoist-non-react-statics'

export interface IWithHistoryProps {
  history: IHistory
}

export type OmitProps<T, K extends string> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never

// https://stackoverflow.com/questions/49717438/using-higher-order-components-in-typescript-to-omit-react-property-on-usage
// TODO: Find out why prettier can't format arrow functions with generics
export const withHistory = function<
  TOrigProps extends IWithHistoryProps,
  TNewProps = OmitProps<TOrigProps, keyof IWithHistoryProps>
>(
  WrappedComponent: React.ComponentType<TOrigProps>
): React.ComponentType<TNewProps> {
  class WithHistory extends React.Component<TNewProps> {
    render() {
      return <WrappedComponent {...this.props} history={history} />
    }
  }

  return hoistNonReactStatics(WithHistory, WrappedComponent)
}
