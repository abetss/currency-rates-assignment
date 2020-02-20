import { all, fork } from 'redux-saga/effects';
import { ratesSaga } from '../../features/rates';
import { modalSaga } from '../../features/modal';

export function* rootSaga() {
  yield all([fork(ratesSaga), fork(modalSaga)]);
}
