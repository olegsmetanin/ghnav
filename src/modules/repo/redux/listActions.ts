import { createListActions } from 'common/redux/createListActions'

export const { actionTypes, failure, load, loadSuccess } = createListActions(
  'REPO'
)
