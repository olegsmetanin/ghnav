export interface IIssue {
  id: string
  title: string
  number: string
  created_at: string
  user: {
    login: string
  }
  body: string
}

export interface IIssueQuery {
  owner: string
  repo: string
  number: string
}

export interface IIssueListFilter {
  state: string
}

export interface IIssueListQuery {
  owner: string
  repo: string
  page?: number
  per_page?: number
  filter: IIssueListFilter
}
