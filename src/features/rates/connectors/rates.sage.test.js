import { runSaga } from 'redux-saga';
import { fetchRates } from './rates.saga';
import * as httpUtils from '../../../core/connectors/http.utils';
import { FETCH_RATES, RATES_ENDPOINTS } from './rates.connectors.constants';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('rates.saga -> fetchRates', () => {
  let resolveApiCall;
  let rejectApiCall;
  let dispatched = [];

  const cleanUp = () => {
    httpUtils.httpGet.mockClear();
    dispatched = [];
  };

  jest.spyOn(httpUtils, 'httpGet').mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolveApiCall = resolve;
      rejectApiCall = reject;
    });
  });

  describe('when FETCH_RATES.START is dispatched and fetch api has not resolved', () => {
    beforeAll(async () => {
      runSaga(
        {
          dispatch: action => dispatched.push(action)
        },
        fetchRates
      );
    });

    afterAll(cleanUp);

    it('should dispatch a FETCH_RATES.IN_PROGRESS action', async () => {
      expect(dispatched[0]).toEqual({ type: FETCH_RATES.IN_PROGRESS });
    });

    it('should make an api call to the correct end point', async () => {
      expect(httpUtils.httpGet).toHaveBeenCalledWith(RATES_ENDPOINTS.LATEST);
    });

    it('should make the api call once', async () => {
      expect(httpUtils.httpGet).toHaveBeenCalledTimes(1);
    });

    it('should not dispatch any other action', () => {
      expect(dispatched.length).toBe(1);
    });
  });

  describe('when FETCH_RATES.START is dispatched and fetch api has resolved with an expected response', () => {
    const mockResponse = {
      rates: {
        CAD: 1.4345,
        HKD: 8.4024,
        ISK: 137.7
      },
      base: 'EUR',
      date: '2020-02-18'
    };

    beforeEach(async () => {
      runSaga(
        {
          dispatch: action => dispatched.push(action)
        },
        fetchRates
      );
    });

    afterEach(cleanUp);

    it('should dispatch FETCH_RATES.SUCCESS action', async () => {
      resolveApiCall(mockResponse);
      await flushPromises();

      expect(dispatched[1].type).toEqual(FETCH_RATES.SUCCESS);
    });

    it(`should transform response to a payload with lastUpdate, baseCurrency and list of currencies
            when response has ratings`, async () => {
      resolveApiCall(mockResponse);
      await flushPromises();

      expect(dispatched[1].payload).toEqual({
        lastUpdate: mockResponse.date,
        baseCurrency: mockResponse.base,
        list: [
          { currency: 'CAD', rate: 1.4345 },
          { currency: 'HKD', rate: 8.4024 },
          { currency: 'ISK', rate: 137.7 }
        ]
      });
    });

    it(`should transform response to a payload with lastUpdate, baseCurrency and empty list of currencies
          when response doesn't have any rating`, async () => {
      resolveApiCall({ ...mockResponse, rates: {} });
      await flushPromises();

      expect(dispatched[1].payload).toEqual({
        lastUpdate: mockResponse.date,
        baseCurrency: mockResponse.base,
        list: []
      });
    });
  });

  describe('when FETCH_RATES.START is dispatched and fetch api has failed', () => {
    const error = new Error('some error');

    beforeAll(async () => {
      runSaga(
        {
          dispatch: action => dispatched.push(action)
        },
        fetchRates
      );
    });

    afterAll(cleanUp);

    it('should dispatch FETCH_RATES.SUCCESS action', async () => {
      rejectApiCall(error);
      await flushPromises();

      expect(dispatched[1]).toEqual({
        type: FETCH_RATES.ERROR,
        payload: { error }
      });
    });

    cleanUp();
  });
});
