import { createStructuredSelector, createSelector } from 'reselect';
import { HTTP_REQUEST_STATUS } from '../../../core/connectors';

const selectRates = state => state.rates;

const selectFormattedRates = createSelector(selectRates, rates => {
  const lastUpdate = rates.lastUpdate
    ? new Date(rates.lastUpdate.replace(/-/g, '/')).toDateString('yyyy')
    : '';

  return {
    ...rates,
    lastUpdate
  };
});

const selectShouldShow = createSelector(selectRates, rates => ({
  loadButton:
    rates.requestStatus === HTTP_REQUEST_STATUS.NOT_STARTED ||
    rates.requestStatus === HTTP_REQUEST_STATUS.ERRORED,
  rates: rates.requestStatus === HTTP_REQUEST_STATUS.SUCCEED,
  loading: rates.requestStatus === HTTP_REQUEST_STATUS.IN_PROGRESS
}));

export const ratesSelector = createStructuredSelector({
  rates: selectFormattedRates,
  shouldShow: selectShouldShow
});
