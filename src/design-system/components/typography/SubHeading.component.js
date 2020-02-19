import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../primitive-components';

export const SubHeading = ({ children, ...props }) => (
  <Text {...props} fontSize={2} as="h4">
    {children}
  </Text>
);

SubHeading.propTypes = {
  ...Text.propTypes,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
