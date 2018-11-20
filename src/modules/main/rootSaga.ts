import { all } from 'redux-saga/effects'
import { listSagas as issueListSagas } from 'modules/issue/redux/listSagas'
import { itemSagas as issueSagas } from 'modules/issue/redux/itemSagas'
import { listSagas as repoListSagas } from 'modules/repo/redux/listSagas'

export function* rootSaga() {
  yield all([...issueSagas, ...issueListSagas, ...repoListSagas])
}
