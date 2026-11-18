import React from 'react';
import styles from './LikeButton.module.css';

interface LikeButtonProps {
  newsId: string;
  isLiked: boolean;
  count: number;
  onToggle: (newsId: string) => void;
  newsTitle?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  newsId,
  isLiked,
  count,
  onToggle,
  newsTitle,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(newsId);
  };

  const accessibleLabel = `${
    isLiked ? 'Quitar me gusta de' : 'Dar me gusta a'
  } ${newsTitle ? `«${newsTitle}»` : 'esta noticia'}. Total: ${count} me gusta.`;

  return (
    <button
      type="button"
      className={`${styles.likeButton} ${isLiked ? styles.isLiked : ''}`}
      onClick={handleClick}
      aria-label={accessibleLabel}
      aria-pressed={isLiked}
      title={isLiked ? 'Pulsar para desmarcar' : 'Pulsar para indicar que te gusta'}
    >
      <svg
        className={`${styles.heartIcon} ${isLiked ? styles.heartActive : ''}`}
        width="22"
        height="19"
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M19.8154 2.12186C19.3043 1.60786 18.6966 1.19996 18.0273 0.921625C17.358 0.643288 16.6403 0.5 15.9154 0.5C15.1906 0.5 14.4728 0.643288 13.8035 0.921625C13.1342 1.19996 12.5266 1.60786 12.0154 2.12186L11.0154 3.22186L9.91543 2.12186C8.88109 1.08751 7.47822 0.506423 6.01543 0.506423C4.55265 0.506423 3.14978 1.08751 2.11543 2.12186C1.08109 3.1562 0.5 4.55907 0.5 6.02186C0.5 7.48464 1.08109 8.88751 2.11543 9.92186L11.0154 18.5219L19.8154 9.92186C20.3294 9.41074 20.7373 8.80305 21.0157 8.13375C21.294 7.46445 21.4373 6.74673 21.4373 6.02186C21.4373 5.29699 21.294 4.57926 21.0157 3.90996C20.7373 3.24066 20.3294 2.63298 19.8154 2.12186Z"
          fill={isLiked ? '#185641' : 'none'}
          stroke={isLiked ? '#185641' : '#536159'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.likeCount}>{count}</span>
      <span className={styles.likeLabel}>me gusta</span>
    </button>
  );
};
