import { initialRatesState, ratesReducer } from './rates.reducer';
import { HTTP_REQUEST_STATUS } from '../../../core/connectors';
import { FETCH_RATES } from './rates.connectors.constants';

describe('rates.reducer', () => {
  it(`should return default state
          when action type does not match any of the reducers`, () => {
    expect(ratesReducer(undefined, {})).toEqual(initialRatesState);
  });

  describe('should return state with requestStatus in progress', () => {
    const action = {
      type: FETCH_RATES.IN_PROGRESS,
      payload: null
    };
    const expected = {
      ...initialRatesState,
      requestStatus: HTTP_REQUEST_STATUS.IN_PROGRESS
    };

    it('when action type is FETCH_RATES.IN_PROGRESS', () => {
      expect(ratesReducer(undefined, action)).toEqual(expected);
    });

    it(`when action type is FETCH_RATES.IN_PROGRESS
        and another request is still in progress`, () => {
      expect(
        ratesReducer(
          {
            ...initialRatesState,
            requestStatus: HTTP_REQUEST_STATUS.IN_PROGRESS
          },
          action
        )
      ).toEqual(expected);
    });
  });

  it(`should return payload with requestStatus succeed
        when action type is HTTP_REQUEST_STATUS.SUCCEED`, () => {
    const action = {
      type: FETCH_RATES.SUCCESS,
      payload: { test: 123 }
    };

    expect(ratesReducer(undefined, action)).toEqual({
      ...action.payload,
      requestStatus: HTTP_REQUEST_STATUS.SUCCEED
    });
  });

  it(`should return initial state with requestStatus error
        when action type is HTTP_REQUEST_STATUS.ERROR`, () => {
    const action = {
      type: FETCH_RATES.ERROR,
      payload: { test: 123 }
    };

    expect(ratesReducer(undefined, action)).toEqual({
      ...initialRatesState,
      requestStatus: HTTP_REQUEST_STATUS.ERRORED
    });
  });
});
