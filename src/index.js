import React from 'react';
import ReactDOM from 'react-dom';
import { App, configureStore } from './app';
import { theme } from './design-system';

const store = configureStore();

const renderApp = () => ReactDOM.render(<App store={store} theme={theme} />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./app/App', renderApp);
}

renderApp();
