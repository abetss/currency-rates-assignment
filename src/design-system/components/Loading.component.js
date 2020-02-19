import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryText } from './typography';
import { layoutProps } from '../utils/propTypes.constants';

export const Loading = ({ title = 'loading' }) => {
  return <PrimaryText mt={3}>{title}</PrimaryText>;
};

Loading.propTypes = {
  title: PropTypes.string,
  ...layoutProps
};
