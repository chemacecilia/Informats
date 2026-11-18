import React from 'react';
import styles from './NewsSection.module.css';
import type { Noticia, Categoria } from '../../types';
import { NewsCard } from '../NewsCard/NewsCard';
import { TopicFilters } from '../TopicFilters/TopicFilters';
import { EmptyState } from '../EmptyState/EmptyState';

interface NewsSectionProps {
  news: Noticia[];
  likedMap: Record<string, boolean>;
  likeCounts: Record<string, number>;
  onToggleLike: (id: string) => void;
  onReadNews: (noticia: Noticia) => void;
  selectedTopics: Categoria[];
  onToggleTopic: (topic: Categoria) => void;
  onClearTopics: () => void;
  onResetAll: () => void;
  searchQuery: string;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  likedMap,
  likeCounts,
  onToggleLike,
  onReadNews,
  selectedTopics,
  onToggleTopic,
  onClearTopics,
  onResetAll,
  searchQuery,
}) => {
  return (
    <main className={styles.sectionWrapper} id="main-content">
      <div className={styles.introBlock}>
        <h1 className={styles.mainTitle}>¿Qué está pasando?</h1>
        <p className={styles.subtitle}>Revisa nuestra selección de noticias:</p>
      </div>

      {news.length === 0 ? (
        <EmptyState onReset={onResetAll} query={searchQuery} />
      ) : (
        <div className={styles.cardsList} role="feed" aria-label="Noticias seleccionadas">
          {news.map((item, index) => (
            <NewsCard
              key={item.id}
              noticia={item}
              isLiked={Boolean(likedMap[item.id])}
              likeCount={likeCounts[item.id] ?? item.likesIniciales}
              onToggleLike={onToggleLike}
              onRead={onReadNews}
              isFirst={index === 0}
            />
          ))}
        </div>
      )}

      <TopicFilters
        selectedTopics={selectedTopics}
        onToggleTopic={onToggleTopic}
        onClearTopics={onClearTopics}
      />

      <p className={styles.footerNote}>
        Estas son las 4 noticias seleccionadas para ti. Explora otros temas o haz tu pregunta.
      </p>
    </main>
  );
};
