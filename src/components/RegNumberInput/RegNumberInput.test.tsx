import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import RegNumberInput from './RegNumberInput'

describe('RegNumberInput Component', () => {
  test('renders input and submit button', () => {
    render(<RegNumberInput value="" onChange={() => {}} />);
    expect(screen.getByLabelText('registration number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('sanitizes input to uppercase and removes special characters', () => {
    const handleChange = vi.fn();
    render(<RegNumberInput value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('ABC123');
    fireEvent.change(input, { target: { value: "ab@#c123!" } });
    expect(handleChange).toHaveBeenCalledWith("ABC123");
  });

  test('shows error message on empty input when submitted', () => {
    render(<RegNumberInput value="" onChange={() => {}} onSubmit={() => {}} />);
    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);
    expect(screen.getByText(/Registration number is required/i)).toBeInTheDocument();
  });

  test('shows error message for invalid format', () => {
    render(<RegNumberInput value="ABC12" onChange={() => {}} onSubmit={() => {}} />);
    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);
    expect(screen.getByText(/Invalid format/i)).toBeInTheDocument();
  });

  test('calls onSubmit when valid registration number is provided', () => {
    const handleSubmit = vi.fn();
    render(<RegNumberInput value="ABC123" onChange={() => {}} onSubmit={handleSubmit} />);
    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
