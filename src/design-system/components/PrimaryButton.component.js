import React from 'react';
import { css } from '@styled-system/css';

import { Box, Text } from './primitive-components';

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
