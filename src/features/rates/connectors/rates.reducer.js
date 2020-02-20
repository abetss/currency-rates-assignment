import { HTTP_REQUEST_STATUS } from '../../../core/connectors';
import { FETCH_RATES } from '../../../core/rates';

export const initialRatesState = {
  list: [],
  baseCurrency: '',
  lastUpdate: null,
  requestStatus: HTTP_REQUEST_STATUS.NOT_STARTED
};

export const ratesReducer = (state = initialRatesState, action) => {
  switch (action.type) {
    case FETCH_RATES.IN_PROGRESS:
      return {
        ...state,
        requestStatus: HTTP_REQUEST_STATUS.IN_PROGRESS
      };
    case FETCH_RATES.SUCCESS:
      return { ...action.payload, requestStatus: HTTP_REQUEST_STATUS.SUCCEED };
    case FETCH_RATES.ERROR:
      return {
        ...initialRatesState,
        requestStatus: HTTP_REQUEST_STATUS.ERRORED
      };
    default:
      return state;
  }
};
