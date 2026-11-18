import React from 'react';
import styles from './AccessibilityModal.module.css';
import { AccessibleDialog } from '../AccessibleDialog/AccessibleDialog';
import { useAccessibility } from '../../context/AccessibilityContext';
import type { TamanoLetra } from '../../types';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  const {
    tamanoLetra,
    setTamanoLetra,
    altoContraste,
    setAltoContraste,
    lecturaAsistida,
    setLecturaAsistida,
    velocidadVoz,
    setVelocidadVoz,
    restablecerAjustes,
    speak,
    stopSpeech,
    isSpeaking,
  } = useAccessibility();

  const handleTestAudio = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      speak('Esta es una prueba de lectura por voz para la aplicación Informats. Hoy, con claridad.');
    }
  };

  return (
    <AccessibleDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Accesibilidad · A tu manera"
      footer={
        <>
          <button
            type="button"
            onClick={restablecerAjustes}
            style={{
              background: 'transparent',
              border: 'none',
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              fontSize: '15px',
              marginRight: 'auto',
            }}
            aria-label="Restablecer valores predeterminados"
          >
            Restablecer valores
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              minHeight: '48px',
              padding: '10px 24px',
              backgroundColor: 'var(--color-primary-green)',
              color: '#ffffff',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '17px',
              cursor: 'pointer',
            }}
            aria-label="Guardar ajustes"
          >
            Guardar ajustes
          </button>
        </>
      }
    >
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionTitle}>Tamaño de letra</h3>
        <p className={styles.sectionDesc}>
          Selecciona el tamaño de texto con el que leas más cómodamente.
        </p>

        <div className={styles.optionsGroup} role="radiogroup" aria-label="Tamaño de letra">
          {(
            [
              { id: 'mediana', label: 'Mediana (compacta)' },
              { id: 'grande', label: 'Grande (recomendada)' },
              { id: 'muy_grande', label: 'Muy grande' },
            ] as const
          ).map((item) => {
            const isSelected = tamanoLetra === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setTamanoLetra(item.id as TamanoLetra)}
                className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
              >
                <span>{item.label}</span>
                {isSelected && <span className={styles.checkIndicator}>✓</span>}
              </button>
            );
          })}
        </div>

        <div className={styles.previewBox} aria-hidden="true">
          <div className={styles.previewLabel}>Muestra en vivo:</div>
          <p className={styles.previewText}>
            SMS de tu banco: señales de alerta y cómo protegerte
          </p>
        </div>
      </div>

      <div className={styles.separator} role="separator" />

      <div className={styles.sectionBlock}>
        <div className={styles.toggleRow}>
          <div>
            <h3 className={styles.sectionTitle}>Alto contraste</h3>
            <p className={styles.sectionDesc}>
              Bordes y colores más oscuros para facilitar la diferenciación de elementos.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={altoContraste}
            aria-label="Activar o desactivar alto contraste"
            onClick={() => setAltoContraste(!altoContraste)}
            className={`${styles.toggleSwitch} ${altoContraste ? styles.toggleSwitchActive : ''}`}
          >
            <div className={styles.toggleKnob} />
          </button>
        </div>
      </div>

      <div className={styles.separator} role="separator" />

      <div className={styles.sectionBlock}>
        <div className={styles.toggleRow}>
          <div>
            <h3 className={styles.sectionTitle}>Lectura asistida por voz</h3>
            <p className={styles.sectionDesc}>
              Permite que la aplicación lea los titulares y resúmenes en voz alta.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={lecturaAsistida}
            aria-label="Activar o desactivar lectura asistida por voz"
            onClick={() => setLecturaAsistida(!lecturaAsistida)}
            className={`${styles.toggleSwitch} ${
              lecturaAsistida ? styles.toggleSwitchActive : ''
            }`}
          >
            <div className={styles.toggleKnob} />
          </button>
        </div>

        {lecturaAsistida && (
          <>
            <p className={styles.sectionDesc} style={{ marginTop: '8px' }}>
              Velocidad de locución:
            </p>
            <div className={styles.optionsGroup} role="radiogroup" aria-label="Velocidad de voz">
              {[
                { speed: 0.75, label: 'Pausada (0.75x)' },
                { speed: 0.9, label: 'Normal (0.90x)' },
                { speed: 1.0, label: 'Rápida (1.0x)' },
              ].map((item) => {
                const isSelected = Math.abs(velocidadVoz - item.speed) < 0.05;
                return (
                  <button
                    key={item.speed}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setVelocidadVoz(item.speed)}
                    className={`${styles.optionCard} ${
                      isSelected ? styles.optionCardSelected : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && <span className={styles.checkIndicator}>✓</span>}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleTestAudio}
              className={styles.testAudioBtn}
              aria-label="Probar voz de muestra"
            >
              {isSpeaking ? '⏹️ Detener prueba de audio' : '🔊 Probar voz de muestra'}
            </button>
          </>
        )}
      </div>
    </AccessibleDialog>
  );
};
