import { all, fork } from 'redux-saga/effects';
import { ratesSaga } from '../../features/rates';

export function* rootSaga() {
  yield all([fork(ratesSaga)]);
}
