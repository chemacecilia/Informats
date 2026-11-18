import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar component', () => {
  it('renders question balloon and input with placeholder', () => {
    render(
      <SearchBar
        searchQuery=""
        onSearchChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    expect(screen.getByText('¿Qué quieres saber hoy?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribir o hablar')).toBeInTheDocument();
  });

  it('allows user to type search queries and triggers onSearchChange', async () => {
    const handleSearchChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchBar
        searchQuery=""
        onSearchChange={handleSearchChange}
        onClear={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Escribir o hablar');
    await user.type(input, 'pension');

    expect(handleSearchChange).toHaveBeenCalled();
  });

  it('shows clear button when query is present and triggers onClear on click', async () => {
    const handleClear = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchBar
        searchQuery="luz"
        onSearchChange={vi.fn()}
        onClear={handleClear}
      />
    );

    const clearBtn = screen.getByRole('button', { name: /borrar texto/i });
    expect(clearBtn).toBeInTheDocument();

    await user.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('informs user if speech recognition is not supported in environment', async () => {
    const user = userEvent.setup();

    render(
      <SearchBar
        searchQuery=""
        onSearchChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const micBtn = screen.getByRole('button', { name: /micrófono/i });
    await user.click(micBtn);

    expect(
      screen.getByText(/no está admitido en este navegador/i)
    ).toBeInTheDocument();
  });
});
