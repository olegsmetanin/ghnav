export interface IIssue {
  id: string
  title: string
  num: string
  create_at: string
  body: string
}

export interface IIssueListQuery {
  owner: string
  repo: string
  page: number
  per_page: number
  filter: {
    state: string
  }
}
