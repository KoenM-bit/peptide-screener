import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './AppWithValidation';

describe('App Integration', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('should not crash with validation provider', () => {
    // Just test that the app renders without throwing
    expect(() => render(<App />)).not.toThrow();
  });
});