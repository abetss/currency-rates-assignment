import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import { RatesList } from '../features/rates/components';

const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <RatesList />
    </Provider>
  );
};
