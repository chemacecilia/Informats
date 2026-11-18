import React from 'react';
import styles from './TopicFilters.module.css';
import type { Categoria } from '../../types';
import { CATEGORIAS_DISPONIBLES } from '../../data/noticias';

interface TopicFiltersProps {
  selectedTopics: Categoria[];
  onToggleTopic: (topic: Categoria) => void;
  onClearTopics: () => void;
}

export const TopicFilters: React.FC<TopicFiltersProps> = ({
  selectedTopics,
  onToggleTopic,
  onClearTopics,
}) => {
  return (
    <section className={styles.topicsSection} aria-label="Filtro por temas">
      <div className={styles.topicsHeaderRow}>
        <h2 className={styles.sectionTitle}>Explorar por temas</h2>
        {selectedTopics.length > 0 && (
          <button
            type="button"
            onClick={onClearTopics}
            className={styles.resetBtn}
            aria-label="Limpiar temas seleccionados"
          >
            Limpiar temas ({selectedTopics.length})
          </button>
        )}
      </div>

      <div className={styles.pillGrid} role="group" aria-label="Lista de temas">
        {CATEGORIAS_DISPONIBLES.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              className={`${styles.topicPill} ${isSelected ? styles.topicPillActive : ''}`}
              onClick={() => onToggleTopic(topic)}
              aria-pressed={isSelected}
              aria-label={`Tema ${topic}${isSelected ? ', seleccionado' : ''}`}
            >
              {topic}
            </button>
          );
        })}
      </div>
    </section>
  );
};
