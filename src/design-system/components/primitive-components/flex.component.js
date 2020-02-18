import { createElement } from 'react';
import { Box } from './box.component';

export const Flex = props => createElement(Box, { ...props, display: 'flex' });

Flex.propTypes = Box.propTypes;
