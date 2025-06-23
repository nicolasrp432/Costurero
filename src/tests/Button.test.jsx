import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Button from '../components/Button/Button';

// Wrapper component for Router context
const ButtonWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Button Component', () => {
  it('renders a regular button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    render(<Button size="small">Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('btn-small');
  });

  it('applies correct type classes', () => {
    render(<Button type="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('btn-secondary');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a Link component when "to" prop is provided', () => {
    render(
      <ButtonWrapper>
        <Button to="/some-path">Navigate</Button>
      </ButtonWrapper>
    );
    const link = screen.getByRole('link', { name: /navigate/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/some-path');
  });

  it('renders as an external link when "href" prop is provided', () => {
    render(<Button href="https://example.com">External Link</Button>);
    const link = screen.getByRole('link', { name: /external link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByRole('button', { name: /full width button/i });
    expect(button).toHaveClass('btn-full');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });
}); 