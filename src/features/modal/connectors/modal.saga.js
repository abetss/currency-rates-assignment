import { put, takeEvery } from 'redux-saga/effects';
import { FETCH_RATES } from '../../../core/rates';
import { MODAL_SHOW } from './modal.action';
import { MODAL_TYPE } from './modal.connectors.constant';

function* dispatchErrorModalShow() {
  const payload = {
    modalType: MODAL_TYPE.ERROR_MODAL,
    modalProps: {
      message: 'Something went wrong getting the rates information. Please try again!'
    }
  };
  yield put({ type: MODAL_SHOW, payload });
}

export function* modalSaga() {
  yield takeEvery(FETCH_RATES.ERROR, dispatchErrorModalShow);
}
