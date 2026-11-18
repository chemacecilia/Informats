import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LikeButton } from './LikeButton';

describe('LikeButton component', () => {
  it('renders like count and accessible label', () => {
    render(
      <LikeButton
        newsId="news-1"
        isLiked={false}
        count={128}
        onToggle={vi.fn()}
        newsTitle="SMS de tu banco"
      />
    );

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('me gusta')).toBeInTheDocument();
  });

  it('reflects active state when isLiked is true', () => {
    render(
      <LikeButton
        newsId="news-1"
        isLiked={true}
        count={129}
        onToggle={vi.fn()}
        newsTitle="SMS de tu banco"
      />
    );

    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('129')).toBeInTheDocument();
  });

  it('calls onToggle with newsId on click', async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <LikeButton
        newsId="news-1"
        isLiked={false}
        count={128}
        onToggle={handleToggle}
        newsTitle="SMS de tu banco"
      />
    );

    const btn = screen.getByRole('button');
    await user.click(btn);

    expect(handleToggle).toHaveBeenCalledWith('news-1');
  });
});
