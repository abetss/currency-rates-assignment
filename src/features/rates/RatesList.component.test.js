import React from 'react';

import { mount } from 'enzyme';
import { RatesList } from './RatesList.component';

const createIsElementVisible = (reference, elementName) => (wrapper, shouldSee) => {
  it(`${elementName} visibility should be ${shouldSee}`, () => {
    const element = wrapper.find(reference).first();
    if (shouldSee) {
      expect(element.exists()).toBeTruthy();
    } else {
      expect(element.exists()).toBeFalsy();
    }
  });
};

const isLoadButtonVisible = createIsElementVisible('PrimaryButton', 'Load button');
const isRatesListVisible = createIsElementVisible('[data-test="rates-list"]', 'Rates List');
const isLoadingVisible = createIsElementVisible('Loading', 'Loading');

describe('RatesList', () => {
  const render = props =>
    mount(
      <RatesList
        fetchRates={() => {}}
        rates={{ list: [], baseCurrency: '', lastUpdate: '' }}
        shouldShow={{
          loadButton: false,
          rates: false,
          loading: false
        }}
        {...props}
      />
    );

  describe('when only load button is visible', () => {
    const wrapper = render({
      shouldShow: {
        loadButton: true,
        rates: false,
        loading: false
      }
    });

    isLoadButtonVisible(wrapper, true);
    isRatesListVisible(wrapper, false);
    isLoadingVisible(wrapper, false);

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('when only loading is visible', () => {
    const wrapper = render({
      shouldShow: {
        loadButton: false,
        rates: false,
        loading: true
      }
    });

    isLoadButtonVisible(wrapper, false);
    isRatesListVisible(wrapper, false);
    isLoadingVisible(wrapper, true);

    afterAll(() => {
      wrapper.unmount();
    });
  });

  describe('when only rates are visible and there is rates information', () => {
    const mockRates = {
      list: [
        { currency: 'CAD', rate: 1.4345 },
        { currency: 'HKD', rate: 8.4024 },
        { currency: 'ISK', rate: 137.7 }
      ],
      baseCurrency: 'CAD',
      lastUpdate: '22 date 1020'
    };
    const wrapper = render({
      rates: mockRates,
      shouldShow: {
        loadButton: false,
        rates: true,
        loading: false
      }
    });

    isLoadButtonVisible(wrapper, false);
    isRatesListVisible(wrapper, true);
    isLoadingVisible(wrapper, false);

    it('displays all the given rates as list of Currencies', () => {
      const currencies = wrapper.find('[data-test="rates-list"]').find('Currency');
      expect(currencies.length).toBe(3);

      mockRates.list.forEach((mockRate, index) => {
        expect(
          currencies
            .at(index)
            .text()
            .includes(mockRate.currency)
        ).toBeTruthy();

        expect(
          currencies
            .at(index)
            .text()
            .includes(mockRate.rate)
        ).toBeTruthy();
      });
    });

    it('displayss base currency', () => {
      const baseCurrency = wrapper.find('[data-test="rates-base"]').first();
      expect(baseCurrency.exists).toBeTruthy();
      expect(baseCurrency.text().includes(mockRates.baseCurrency)).toBeTruthy();
    });

    it('displays base currency', () => {
      const baseCurrency = wrapper.find('[data-test="rates-date"]').first();
      expect(baseCurrency.exists).toBeTruthy();
      expect(baseCurrency.text().includes(mockRates.lastUpdate)).toBeTruthy();
    });

    afterAll(() => {
      wrapper.unmount();
    });
  });
});
