import React from 'react';
import { Flex, PrimaryText, PrimaryButton, Heading2 } from '../../../design-system';

export const ErrorModal = ({ message, onCloseButtonClick }) => (
  <Flex flexDirection="column" width={5}>
    <Heading2>Error!</Heading2>
    <PrimaryText>{message}</PrimaryText>
    <Flex justifyContent="flex-end">
      <PrimaryButton title="Close" mt={3} width={3} onClick={onCloseButtonClick} data-test="error-modal-close-btn" />
    </Flex>
  </Flex>
);
