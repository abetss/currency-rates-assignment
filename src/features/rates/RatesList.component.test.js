import React from 'react';

import { mount } from 'enzyme';
import { RatesList } from './RatesList.component';

const createAssertElement = (reference, elementName) => (wrapper, { visible, containedText }) => {
  if (visible && !containedText) {
    it(`${elementName} visibility should be ${visible}`, async () => {
      const element = wrapper.find(reference).first();
      expect(element.exists()).toBe(visible);
    });
  }

  if (containedText) {
    it(`${elementName} should contain expected text`, async () => {
      const element = wrapper.find(reference).first();
      expect(element.exists()).toBeTruthy();
      expect(
        element
          .text()
          .toLowerCase()
          .includes(containedText.toLowerCase())
      ).toBeTruthy();
    });
  }
};

const assertLoadButton = createAssertElement('PrimaryButton', 'Load button');
const assertRatesList = createAssertElement('[data-test="rates-list"]', 'Rates List');
const assertLoading = createAssertElement('Loading', 'Loading');
const assertHeader = createAssertElement('Heading1', 'header');
const assertRatesBase = createAssertElement('[data-test="rates-base"]', 'Rates base');
const assertLastUpdate = createAssertElement('[data-test="rates-date"]', 'Last update');

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

    assertHeader(wrapper, { visible: true, containedText: 'Exchange Rates' });
    assertLoadButton(wrapper, { visible: true, containedText: 'Load Rates' });
    assertRatesList(wrapper, { visible: false });
    assertLoading(wrapper, { visible: false });

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

    assertHeader(wrapper, { visible: true, containedText: 'Exchange Rates' });
    assertLoadButton(wrapper, { visible: false });
    assertRatesList(wrapper, { visible: false });
    assertLoading(wrapper, { visible: true });

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

    assertHeader(wrapper, { visible: true, containedText: 'Exchange Rates' });
    assertLoadButton(wrapper, { visible: false });
    assertRatesList(wrapper, { visible: true });
    assertLoading(wrapper, { visible: false });
    assertRatesBase(wrapper, { visible: true, containedText: mockRates.baseCurrency });
    assertLastUpdate(wrapper, { visible: true, containedText: mockRates.lastUpdate });

    it('displays all the given rates as pair of currency and its rate', () => {
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

    afterAll(() => {
      wrapper.unmount();
    });
  });
});
