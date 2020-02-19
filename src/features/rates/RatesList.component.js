import React from 'react';
import { Flex, Box, Heading1, PrimaryButton, PrimaryText, Subtitle, Loading } from '../../design-system';
import { Currency } from './components/Currency.component';

export const RatesList = ({ fetchRates, rates: { list, baseCurrency, lastUpdate }, shouldShow }) => {
  return (
    <Flex justifyContent="center" m={2} data-test="rates">
      <Box width={4}>
        <Flex flexDirection="column" mb={3}>
          <Heading1>Exchange Rates</Heading1>
          {shouldShow.rates && (
            <>
              <Flex mt={-1} data-test="rates-base">
                <PrimaryText>Base:</PrimaryText>
                <PrimaryText ml={1}>{baseCurrency}</PrimaryText>
              </Flex>
              <Flex data-test="rates-date">
                <Subtitle>Last update:</Subtitle>
                <Subtitle ml={1}>{lastUpdate}</Subtitle>
              </Flex>
            </>
          )}
        </Flex>

        {shouldShow.loadButton && <PrimaryButton title="Load rates" onClick={fetchRates} />}
        {shouldShow.loading && <Loading title="Loading rates" />}
        {shouldShow.rates && (
          <Flex flexDirection="column" textAlign="center" data-test="rates-list">
            {list.map(({ currency, rate }, index, array) => (
              <Currency
                currency={currency}
                rate={rate}
                withBackground={index % 2 === 0}
                widthBorderTop={index !== 0}
                key={`${currency}-currency-${index}`}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
