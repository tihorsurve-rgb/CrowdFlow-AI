import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OpsDashboard from '../src/pages/OpsDashboard';

describe('OpsDashboard', () => {
  it('renders dashboard title', () => {
    render(<OpsDashboard />);
    expect(screen.getByText(/Operations Command/i)).toBeInTheDocument();
  });

  it('updates deploy staff button after click', () => {
    render(<OpsDashboard />);
    const button = screen.getByRole('button', { name: /deploy staff/i });
    fireEvent.click(button);
    expect(screen.getByText(/Staff Deployed/i)).toBeInTheDocument();
  });

  it('updates reroute crowd button after click', () => {
    render(<OpsDashboard />);
    const button = screen.getByRole('button', { name: /reroute crowd/i });
    fireEvent.click(button);
    expect(screen.getByText(/Reroute Active/i)).toBeInTheDocument();
  });
});