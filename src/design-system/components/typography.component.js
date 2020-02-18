import React from 'react';
import PropTypes from 'prop-types';

import { Text } from './primitive-components';

export const Heading1 = ({ children, ...props }) => (
  <Text {...props} fontSize={5} as="h1">
    {children}
  </Text>
);

Heading1.propTypes = {
  ...Text.propTypes,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
