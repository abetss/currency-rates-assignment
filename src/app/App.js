import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { configureStore } from './store';
import { GlobalStyle } from './GlobalStyle';

import { theme } from '../design-system';
import { RatesListContainer } from '../features/rates';

const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RatesListContainer />
      </ThemeProvider>
    </Provider>
  );
};
