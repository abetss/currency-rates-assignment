import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders todo', () => {
  const { getByText } = render(<App />);
  const ratingsPage = getByText(/Exchange Rates/i);

  expect(ratingsPage).toBeInTheDocument();
});
