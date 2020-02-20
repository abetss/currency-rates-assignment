import React from 'react';
import { mount } from 'enzyme';
import { App } from '../app';
import { configureStore } from '../app/store';
import { theme } from '../design-system';
import * as httpUtils from '../core/connectors/http.utils.js';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));
const debug = (obj, title = '') => {
  console.log(title, obj.debug());
};

const findAllRatesListElements = wrapper => {
  const loadButton = wrapper.find('PrimaryButton').first();
  const ratesList = wrapper.find('[data-test="rates-list"]').first();
  const loading = wrapper.find('Loading').first();
  const heading1 = wrapper.find('Heading1').first();
  const ratesBase = wrapper.find('[data-test="rates-base"]').first();
  const lastUpdate = wrapper.find('[data-test="rates-date"]').first();

  return { loadButton, ratesList, loading, heading1, ratesBase, lastUpdate };
};

describe('Rates integration tests', () => {
  const cleanUp = () => {
    httpUtils.httpGet.mockClear();
  };

  describe('when user loads the home page', () => {
    const store = configureStore();
    const render = props => mount(<App store={store} theme={theme} />);
    const wrapper = render({});
    const rates = wrapper.find('[data-test="rates"]').first();
    const { loadButton, ratesList, loading, heading1, ratesBase, lastUpdate } = findAllRatesListElements(rates);

    afterAll(() => {
      cleanUp();
      wrapper.unmount();
    });

    it(`user should only see the rates header and the load button`, async () => {
      const visibilities = [
        heading1.exists(),
        ratesBase.exists(),
        lastUpdate.exists(),
        loadButton.exists(),
        loading.exists(),
        ratesList.exists()
      ];

      expect(visibilities).toEqual([true, false, false, true, false, false]);
    });

    it(`load button text should be Load rates`, async () => {
      expect(loadButton.text()).toBe('Load rates');
    });
  });

  describe('when user has clicked on the fetch button and the rating request is in progress', () => {
    const store = configureStore();
    const render = props => mount(<App store={store} theme={theme} />);
    const wrapper = render({});

    const rates_initialView = wrapper.find('[data-test="rates"]').first();
    rates_initialView.find('PrimaryButton').simulate('click');
    const rates = wrapper.find('[data-test="rates"]').first();

    const { loadButton, ratesList, loading, heading1, ratesBase, lastUpdate } = findAllRatesListElements(rates);

    afterAll(() => {
      cleanUp();
      wrapper.unmount();
    });

    it(`user should only see the loading indicator`, async () => {
      const visibilities = [
        heading1.exists(),
        ratesBase.exists(),
        lastUpdate.exists(),
        loadButton.exists(),
        loading.exists(),
        ratesList.exists()
      ];

      expect(visibilities).toEqual([true, false, false, false, true, false]);
    });
  });

  describe('when user has clicked on the fetch button and the rating request has returned successfully', () => {
    let wrapper, rates;
    const mockRatesResponse = {
      rates: {
        CAD: 1.4345,
        HKD: 8.4024,
        ISK: 137.1
      },
      base: 'EUR',
      date: '2020-02-20'
    };

    beforeAll(async () => {
      jest.spyOn(httpUtils, 'httpGet').mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(mockRatesResponse);
        });
      });

      const store = configureStore();
      const render = props => mount(<App store={store} theme={theme} />);
      const wrapper = render({});

      const rates_initialView = wrapper.find('[data-test="rates"]').first();
      rates_initialView.find('PrimaryButton').simulate('click');

      await flushPromises();
      wrapper.update();

      rates = wrapper.find('[data-test="rates"]').first();
    });

    afterAll(() => {
      cleanUp();
      wrapper.unmount();
    });

    it('should make only one GET conversion rates request', async () => {
      expect(httpUtils.httpGet).toHaveBeenCalledTimes(1);
    });

    it('user should see all rates from the response', async () => {
      const { ratesList } = findAllRatesListElements(rates);
      const currencies = ratesList.find('Currency');
      expect(currencies.length).toBe(3);

      Object.keys(mockRatesResponse.rates).forEach((key, index) => {
        expect(
          currencies
            .at(index)
            .text()
            .includes(key)
        ).toBeTruthy();

        expect(
          currencies
            .at(index)
            .text()
            .includes(mockRatesResponse.rates[key])
        ).toBeTruthy();
      });
    });

    it('user should the rates base currency', () => {
      const { ratesBase } = findAllRatesListElements(rates);
      expect(ratesBase.exists).toBeTruthy();
      expect(ratesBase.text().includes(mockRatesResponse.base)).toBeTruthy();
    });

    it('user should see the rates last update in "weekday Mon dd yyyy format"', () => {
      const { lastUpdate } = findAllRatesListElements(rates);
      expect(lastUpdate.exists).toBeTruthy();
      expect(lastUpdate.text().includes('Thu Feb 20 2020')).toBeTruthy();
    });

    it(`user should only see rates list, rates base currency and rates last update date`, async () => {
      const { loadButton, ratesList, loading, heading1, ratesBase, lastUpdate } = findAllRatesListElements(rates);

      const visibilities = [
        heading1.exists(),
        ratesBase.exists(),
        lastUpdate.exists(),
        loadButton.exists(),
        loading.exists(),
        ratesList.exists()
      ];

      expect(visibilities).toEqual([true, true, true, false, false, true]);
    });
  });

  describe('when user has clicked on the button and the rating request has failed', () => {
    let wrapper, rates;
    let modal, errorModal;

    beforeAll(async () => {
      jest.spyOn(httpUtils, 'httpGet').mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject({
            error: 'Request failed'
          });
        });
      });

      const store = configureStore();
      const render = props => mount(<App store={store} theme={theme} />);
      wrapper = render({});

      rates = wrapper.find('[data-test="rates"]').first();
      rates.find('PrimaryButton').simulate('click');

      await flushPromises();
      wrapper.update();

      rates = wrapper.find('[data-test="rates"]').first();
      modal = wrapper.find('[data-test="modal"]').first();
      errorModal = modal.find('[data-test="error-modal"]').first();
    });

    afterAll(() => {
      cleanUp();
      wrapper.unmount();
    });

    it('user should see the error modal', () => {
      expect(errorModal.exists()).toBe(true);
    });

    it('user should see the expected text relating to rates http request failing', () => {
      expect(
        errorModal.text().includes('Something went wrong getting the rates information. Please try again!')
      ).toBeTruthy();
    });

    it('app should make only one GET conversion rates request', () => {
      expect(httpUtils.httpGet).toHaveBeenCalledTimes(1);
    });

    describe('when user click on the modal close button', () => {
      beforeAll(() => {
        const closeButton = errorModal.find('[data-test="error-modal-close-btn"] span').first();
        closeButton.simulate('click');

        modal = wrapper.find('[data-test="modal"]').first();
        errorModal = modal.find('[data-test="error-modal"]').first();
      });

      it('user should not see the error modal', () => {
        expect(errorModal.exists()).toBe(false);
      });

      it(`user should only see the rates header and load rate button`, async () => {
        const { loadButton, ratesList, loading, heading1, ratesBase, lastUpdate } = findAllRatesListElements(rates);

        const visibilities = [
          heading1.exists(),
          ratesBase.exists(),
          lastUpdate.exists(),
          loadButton.exists(),
          loading.exists(),
          ratesList.exists()
        ];

        expect(visibilities).toEqual([true, false, false, true, false, false]);
      });
    });
  });
});
