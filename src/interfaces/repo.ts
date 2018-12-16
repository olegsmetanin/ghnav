export interface IRepo {
  id: string
  owner: string
  repo: string
}

export interface IRepoListQuery {
  search: string
}
