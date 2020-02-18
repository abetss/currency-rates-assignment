import styled from 'styled-components';
import {
  layout,
  typography,
  color,
  space,
  position,
  compose
} from 'styled-system';
import propTypes from '@styled-system/prop-types';
import { themeGet } from '@styled-system/theme-get';

export const Text = styled('span')(
  props => ({
    margin: 0,
    fontFamily: themeGet('fontFamily.regular')(props),
    lineHeight: themeGet('lineHeights.copy')(props),
    fontWeight: themeGet('fontWeights.2')(props),
    display: 'block'
  }),
  compose(layout, typography, color, space, position)
);

Text.propTypes = {
  ...propTypes.typography,
  ...propTypes.layout,
  ...propTypes.color,
  ...propTypes.space,
  ...propTypes.position
};
