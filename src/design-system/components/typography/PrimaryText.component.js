import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../primitive-components';
import { layoutProps } from '../../utils/propTypes.constants';

export const PrimaryText = ({ children, ...props }) => (
  <Text {...props} fontSize={2} color="on-surface">
    {children}
  </Text>
);

PrimaryText.propTypes = {
  ...Text.propTypes,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ...layoutProps
};
