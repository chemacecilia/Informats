import React from 'react';
import styles from './ArticleModal.module.css';
import type { Noticia } from '../../types';
import { AccessibleDialog } from '../AccessibleDialog/AccessibleDialog';
import { useAccessibility } from '../../context/AccessibilityContext';

interface ArticleModalProps {
  noticia: Noticia | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ noticia, isOpen, onClose }) => {
  const { speak, stopSpeech, isSpeaking } = useAccessibility();

  if (!noticia) return null;

  const handleAudioToggle = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      const textToRead = `${noticia.titulo}. Resumen: ${noticia.resumenSencillo}. ${
        noticia.pasosActuar ? `Pasos a seguir: ${noticia.pasosActuar.join('. ')}` : ''
      }`;
      speak(textToRead);
    }
  };

  const handleClose = () => {
    stopSpeech();
    onClose();
  };

  return (
    <AccessibleDialog
      isOpen={isOpen}
      onClose={handleClose}
      title={noticia.titulo}
      footer={
        <>
          {noticia.enlaceOficial && (
            <a
              href={noticia.enlaceOficial}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.audioButton}
              aria-label="Abrir enlace oficial en nueva pestaña"
            >
              Enlace oficial ↗
            </a>
          )}
          <button
            type="button"
            className={styles.audioButton}
            onClick={handleClose}
            aria-label="Cerrar lectura de la noticia"
          >
            Cerrar
          </button>
        </>
      }
    >
      <img
        src={noticia.imagenUrl}
        alt={noticia.imagenAlt}
        className={styles.articleImage}
      />

      <div className={styles.tagsRow}>
        {noticia.categorias.map((cat) => (
          <span key={cat} className={styles.tagBadge}>
            {cat}
          </span>
        ))}
        <span className={styles.evidenciaBadge}>✓ {noticia.estadoEvidencia}</span>
      </div>

      <div className={styles.summaryBox}>
        <span className={styles.summaryTitle}>Resumen claro y directo:</span>
        <p className={styles.summaryText}>{noticia.resumenSencillo}</p>
        <button
          type="button"
          onClick={handleAudioToggle}
          className={styles.audioButton}
          aria-label={isSpeaking ? 'Detener lectura en voz alta' : 'Escuchar resumen en voz alta'}
        >
          {isSpeaking ? '⏹️ Detener lectura' : '🔊 Escuchar resumen'}
        </button>
      </div>

      <div className={styles.mainContent}>
        <p>{noticia.contenido}</p>
      </div>

      {noticia.pasosActuar && noticia.pasosActuar.length > 0 && (
        <div className={styles.stepsSection}>
          <h4 className={styles.stepsTitle}>Pasos claros para actuar:</h4>
          <ol className={styles.stepsList}>
            {noticia.pasosActuar.map((paso, idx) => (
              <li key={idx}>{paso}</li>
            ))}
          </ol>
        </div>
      )}

      <div className={styles.sourceInfo}>
        <strong>Organismo fuente:</strong> {noticia.organismoFuente}
      </div>

      <div className={styles.demoNotice}>
        Nota de demostración: este contenido ha sido estructurado para la pantalla de inicio de Informats.
      </div>
    </AccessibleDialog>
  );
};
