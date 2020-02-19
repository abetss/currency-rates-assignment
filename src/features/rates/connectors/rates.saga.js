import { put, takeEvery, call } from 'redux-saga/effects';
import { httpGet } from '../../../core/connectors';
import { FETCH_RATES, RATES_ENDPOINTS } from './rates.connectors.constants';

export function* fetchRates() {
  const url = RATES_ENDPOINTS.LATEST;
  try {
    yield put({ type: FETCH_RATES.IN_PROGRESS });

    const response = yield call(httpGet, url);

    const rates = Object.keys(response.rates).map(key => ({
      currency: key,
      rate: response.rates[key]
    }));

    const payload = {
      list: rates,
      lastUpdate: response.date,
      baseCurrency: response.base
    };

    yield put({ type: FETCH_RATES.SUCCESS, payload });
  } catch (error) {
    yield put({ type: FETCH_RATES.ERROR, payload: { error } });
  }
}

export function* ratesSaga() {
  yield takeEvery(FETCH_RATES.START, fetchRates);
}
