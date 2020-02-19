import styled from 'styled-components';
import { Box } from './Box.component';

export const Flex = styled(Box)({
  display: 'flex'
})

Flex.propTypes = Box.propTypes;
