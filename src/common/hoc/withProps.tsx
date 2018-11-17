export const withProps = <P extends object>(propsfab: () => P) => (Component: React.ComponentType<P>) =>
  class WithProps extends React.Component<P> {
    public render() {
      const props = { ...((this.props as any) as object), ...propsfab() }
      return <Component {...props} />
    }
  }
