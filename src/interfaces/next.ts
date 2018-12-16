export interface IGetInitialProps<T> {
  getInitialProps(ctx: any): Promise<T>
}
