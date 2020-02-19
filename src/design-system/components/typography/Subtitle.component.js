import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../primitive-components';

export const Subtitle = ({ children, ...props }) => (
  <Text {...props} fontSize={1} lineHeight="solid" color="on-surface-muted">
    {children}
  </Text>
);

Subtitle.propTypes = {
  ...Text.propTypes,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
