import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // 使用 getAllByText 匹配多个元素
  const viteElements = screen.getAllByText(/Vite/i);
  expect(viteElements.length).toBeGreaterThan(0);
});

test('displays counter button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /count is/i });
  expect(button).toBeInTheDocument();
});