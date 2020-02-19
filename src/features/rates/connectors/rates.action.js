import { FETCH_RATES } from './rates.connectors.constants';

export const fetchRates = () => ({
  type: FETCH_RATES.START,
  payload: null
});
