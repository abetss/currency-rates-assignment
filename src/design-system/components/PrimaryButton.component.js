import React from 'react';
import { css } from '@styled-system/css';
import PropTypes from 'prop-types';

import { Box, Text } from './primitive-components';
import { layoutProps } from '../utils/propTypes.constants';

export const PrimaryButton = ({ title, onClick, ...props }) => (
  <Box
    width="4"
    {...props}
    bg="primary"
    borderRadius={1}
    textAlign="center"
    css={css({
      cursor: 'pointer',
      '&:hover': {
        bg: 'primary-variant'
      },
      '&:focus': {
        outline: 'none'
      }
    })}
    onClick={onClick}
    as="button"
  >
    <Text color="on-primary" fontSize={3} lineHeight="title">
      {title}
    </Text>
  </Box>
);

PrimaryButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  ...layoutProps
};
