// Flux Standard Action
export interface IFSA<P, M> {
  type: string
  payload?: P
  error: IError
  meta: M
}

export interface IProcessState {
  isLoading?: boolean

  isLoadingMore?: boolean

  isSaving?: boolean

  isDeleting?: boolean
}

export interface IError {
  [zone: string]: Error[]
}
