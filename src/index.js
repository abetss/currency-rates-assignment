import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

const renderApp = () =>
  ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./app/App', renderApp);
}

renderApp();
