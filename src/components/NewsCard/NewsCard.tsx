import React from 'react';
import styles from './NewsCard.module.css';
import type { Noticia } from '../../types';
import { LikeButton } from '../LikeButton/LikeButton';
import iconArrowRight from '../../assets/icon-arrow-right.svg';

interface NewsCardProps {
  noticia: Noticia;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (id: string) => void;
  onRead: (noticia: Noticia) => void;
  isFirst?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  noticia,
  isLiked,
  likeCount,
  onToggleLike,
  onRead,
  isFirst = false,
}) => {
  return (
    <article className={styles.cardContainer} aria-labelledby={`title-${noticia.id}`}>
      <div
        className={`${styles.thumbnailWrapper} ${
          isFirst ? styles.thumbnailWrapperLarge : ''
        }`}
      >
        <img
          src={noticia.imagenUrl}
          alt={noticia.imagenAlt}
          className={styles.thumbnail}
          loading={isFirst ? 'eager' : 'lazy'}
        />
      </div>

      <LikeButton
        newsId={noticia.id}
        isLiked={isLiked}
        count={likeCount}
        onToggle={onToggleLike}
        newsTitle={noticia.titulo}
      />

      <div className={styles.tagsContainer} aria-label="Categorías de la noticia">
        {noticia.categorias.map((cat) => (
          <span key={cat} className={styles.tagBadge}>
            {cat}
          </span>
        ))}
      </div>

      <h3
        id={`title-${noticia.id}`}
        className={`${styles.newsTitle} ${isFirst ? styles.newsTitleLarge : ''}`}
      >
        {noticia.titulo}
      </h3>

      <button
        type="button"
        className={styles.leerAccion}
        onClick={() => onRead(noticia)}
        aria-label={`Leer noticia completa: ${noticia.titulo}`}
      >
        <span className={styles.leerTexto}>leer +</span>
        <img src={iconArrowRight} alt="" className={styles.arrowRightIcon} aria-hidden="true" />
      </button>

      <div className={styles.cardSeparator} role="separator" />
    </article>
  );
};
