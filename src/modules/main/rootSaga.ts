import { all } from 'redux-saga/effects'
import { itemSagas as issueSagas } from 'modules/issue/redux/itemSagas'

export function* rootSaga() {
  yield all([...issueSagas])
}
