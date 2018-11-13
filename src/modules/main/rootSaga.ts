import { all } from 'redux-saga/effects'
import { listSagas as issueListSagas } from 'modules/issue/redux/listSagas'
import { itemSagas as issueSagas } from 'modules/issue/redux/itemSagas'

export function* rootSaga() {
  yield all([...issueSagas, ...issueListSagas])
}
