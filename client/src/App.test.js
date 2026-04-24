import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./app/router/AppRouter', () => ({
  AppRouter: () => <div>Mocked router content</div>,
}));

test('renders auth call to action', () => {
  render(<App />);

  expect(screen.getByText(/mocked router content/i)).toBeInTheDocument();
});
