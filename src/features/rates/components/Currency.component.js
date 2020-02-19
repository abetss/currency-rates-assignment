import React from 'react';
import { Flex, PrimaryText } from '../../../design-system';

export const Currency = ({
  currency,
  rate,
  withBackground,
  widthBorderTop
}) => {
  return (
    <Flex
      borderTop={widthBorderTop && 1}
      borderColor={widthBorderTop && 'primary-variant'}
      bg={withBackground ? 'surface' : 'background'}
    >
      <Flex
        width={4}
        px={1}
        py={0}
        justifyContent="space-between"
        textAlign="left"
      >
        <PrimaryText>{currency}</PrimaryText>
        <PrimaryText>{rate}</PrimaryText>
      </Flex>
    </Flex>
  );
};
