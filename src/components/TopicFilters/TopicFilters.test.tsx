import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TopicFilters } from './TopicFilters';

describe('TopicFilters component', () => {
  it('renders all 11 categories', () => {
    render(
      <TopicFilters
        selectedTopics={[]}
        onToggleTopic={vi.fn()}
        onClearTopics={vi.fn()}
      />
    );

    const expectedTopics = [
      'España',
      'Internacional',
      'Valencia',
      'Economía',
      'Mundo Digital',
      'Deporte',
      'Política',
      'Cultura',
      'Sociedad',
      'Salud',
      'Trámites',
    ];

    for (const topic of expectedTopics) {
      expect(screen.getByRole('button', { name: new RegExp(topic, 'i') })).toBeInTheDocument();
    }
  });

  it('triggers onToggleTopic when clicking a category pill', async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <TopicFilters
        selectedTopics={[]}
        onToggleTopic={handleToggle}
        onClearTopics={vi.fn()}
      />
    );

    const valenciaBtn = screen.getByRole('button', { name: /valencia/i });
    await user.click(valenciaBtn);

    expect(handleToggle).toHaveBeenCalledWith('Valencia');
  });

  it('shows clear topics button when one or more topics are selected', async () => {
    const handleClear = vi.fn();
    const user = userEvent.setup();

    render(
      <TopicFilters
        selectedTopics={['Valencia', 'Salud']}
        onToggleTopic={vi.fn()}
        onClearTopics={handleClear}
      />
    );

    const clearBtn = screen.getByRole('button', { name: /limpiar temas/i });
    expect(clearBtn).toBeInTheDocument();

    await user.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
