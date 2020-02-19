import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../primitive-components';

export const Heading2 = ({ children, ...props }) => (
  <Text {...props} fontSize={4} as="h2">
    {children}
  </Text>
);

Heading2.propTypes = {
  ...Text.propTypes,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
