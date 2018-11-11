import { all } from 'redux-saga/effects'
import { sagas as counterSagas } from 'modules/counter/redux/sagas'

export function* rootSaga() {
  yield all([...counterSagas])
}
