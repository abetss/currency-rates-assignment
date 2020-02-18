import React from 'react';
import { Flex, Box, Heading1, PrimaryButton } from '../../../design-system';

export const RatesList = () => {
  return (
    <Flex justifyContent="center" m={2} data-test="rates">
      <Box width={4}>
        <Flex flexDirection="column" height={2} mb={3}>
          <Heading1>Exchange Rates</Heading1>
        </Flex>

        <PrimaryButton title="Load rates" />
      </Box>
    </Flex>
  );
};
