import { FETCH_RATES } from '../../../core/rates';

export const fetchRates = () => ({
  type: FETCH_RATES.START,
  payload: null
});
