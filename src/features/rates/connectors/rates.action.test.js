import { fetchRates } from './rates.action';
import { FETCH_RATES } from '../../../core/rates';

describe('rates actions', () => {
  it('should create an action to add a todo', () => {
    const expected = {
      type: FETCH_RATES.START,
      payload: null
    };
    expect(fetchRates()).toEqual(expected);
  });
});
