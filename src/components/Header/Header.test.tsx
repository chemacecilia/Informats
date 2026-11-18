import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

describe('Header component', () => {
  it('renders logo and accessible buttons', () => {
    render(
      <Header
        onOpenAccessibility={vi.fn()}
        onOpenAccount={vi.fn()}
        onVolver={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /Informats/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /accesibilidad/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cuenta/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument();
  });

  it('triggers onOpenAccessibility when clicking accessibility button', async () => {
    const handleOpenA11y = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        onOpenAccessibility={handleOpenA11y}
        onOpenAccount={vi.fn()}
        onVolver={vi.fn()}
      />
    );

    const a11yBtn = screen.getByRole('button', { name: /accesibilidad/i });
    await user.click(a11yBtn);

    expect(handleOpenA11y).toHaveBeenCalledTimes(1);
  });

  it('triggers onOpenAccount when clicking account button', async () => {
    const handleOpenAccount = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        onOpenAccessibility={vi.fn()}
        onOpenAccount={handleOpenAccount}
        onVolver={vi.fn()}
      />
    );

    const accountBtn = screen.getByRole('button', { name: /cuenta/i });
    await user.click(accountBtn);

    expect(handleOpenAccount).toHaveBeenCalledTimes(1);
  });

  it('triggers onVolver when clicking volver button', async () => {
    const handleVolver = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        onOpenAccessibility={vi.fn()}
        onOpenAccount={vi.fn()}
        onVolver={handleVolver}
      />
    );

    const volverBtn = screen.getByRole('button', { name: /volver/i });
    await user.click(volverBtn);

    expect(handleVolver).toHaveBeenCalledTimes(1);
  });
});
