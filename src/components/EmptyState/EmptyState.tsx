import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  onReset: () => void;
  query?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset, query }) => {
  return (
    <div className={styles.emptyContainer} role="status" aria-live="polite">
      <div className={styles.emptyIcon} aria-hidden="true">
        🔍
      </div>
      <h3 className={styles.emptyTitle}>No encontramos noticias</h3>
      <p className={styles.emptyDesc}>
        {query ? (
          <>
            No hay resultados para <strong>«{query}»</strong>.
          </>
        ) : (
          'No hay noticias que coincidan con los temas seleccionados.'
        )}
      </p>
      <button
        type="button"
        onClick={onReset}
        className={styles.resetButton}
        aria-label="Restablecer filtros y ver todas las noticias"
      >
        Restablecer filtros
      </button>
    </div>
  );
};
