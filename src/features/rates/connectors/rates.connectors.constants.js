import { createRequestActionTypes } from '../../../core/connectors';

export const FETCH_RATES = createRequestActionTypes('FETCH_RATES');

export const RATES_ENDPOINTS = Object.freeze({
  LATEST: 'https://api.exchangeratesapi.io/latest'
});
