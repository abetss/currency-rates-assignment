import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './GlobalStyle';

import { RatesListContainer } from '../features/rates';
import { ModalContainer } from '../features/modal';

export const App = ({ store, theme }) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RatesListContainer />
        <ModalContainer />
      </ThemeProvider>
    </Provider>
  );
};
