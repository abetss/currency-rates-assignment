import { assocPath } from 'ramda';
import { ratesSelector } from './rates.selector';
import { initialRatesState } from './rates.reducer';
import { HTTP_REQUEST_STATUS } from '../../../core/connectors';

describe('ratesSelector', () => {
  const mockState_initial = { rates: { ...initialRatesState } };

  it('transforms the lastUpdate to "Weekday Mon dd yyyy" format', () => {
    const mockState = assocPath(
      ['rates', 'lastUpdate'],
      '2020-02-17',
      mockState_initial
    );
    expect(ratesSelector(mockState).rates.lastUpdate).toEqual(
      'Mon Feb 17 2020'
    );
  });

  it('transforms an null lastUpdate to empty string', () => {
    expect(ratesSelector(mockState_initial).rates.lastUpdate).toEqual('');
  });

  describe.each`
    requestStatus                      | showLoadButton | showRates | showLoading
    ${HTTP_REQUEST_STATUS.NOT_STARTED} | ${true}        | ${false}  | ${false}
    ${HTTP_REQUEST_STATUS.IN_PROGRESS} | ${false}       | ${false}  | ${true}
    ${HTTP_REQUEST_STATUS.SUCCEED}     | ${false}       | ${true}   | ${false}
    ${HTTP_REQUEST_STATUS.ERRORED}     | ${true}        | ${false}  | ${false}
  `(
    'when fetch rates request is $requestStatus',
    ({ requestStatus, showLoadButton, showRates, showLoading }) => {
      const mockState = assocPath(
        ['rates', 'requestStatus'],
        requestStatus,
        mockState_initial
      );

      it(`shouldShow.loadButton should be ${showLoadButton}`, () => {
        expect(ratesSelector(mockState).shouldShow.loadButton).toBe(
          showLoadButton
        );
      });

      it(`shouldShow.rates should be ${showRates}`, () => {
        expect(ratesSelector(mockState).shouldShow.rates).toBe(showRates);
      });

      it(`shouldShow.loading should be ${showLoading}`, () => {
        expect(ratesSelector(mockState).shouldShow.loading).toBe(showLoading);
      });
    }
  );
});
