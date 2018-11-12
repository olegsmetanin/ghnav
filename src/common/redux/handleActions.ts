export function handleActions<T>(handlers: { [key: string]: (state: T, action: any) => T }, initialState: T) {
  return (state: T = initialState, action: any) =>
    action && handlers[action.type] ? handlers[action.type](state, action) : state
}
