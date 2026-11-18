import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';
import iconSearch from '../../assets/icon-search.svg';
import iconMic from '../../assets/icon-mic.svg';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  resultCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClear,
  resultCount,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [speechWarning, setSpeechWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleVoiceResult = (text: string) => {
    setInputValue(text);
    onSearchChange(text);
  };

  const { isListening, isSupported, error: speechError, startListening, stopListening } =
    useSpeechRecognition(handleVoiceResult);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
    inputRef.current?.focus();
  };

  const handleMicClick = () => {
    if (!isSupported) {
      setSpeechWarning(
        'El reconocimiento de voz por micrófono no está admitido en este navegador. Puedes escribir tu consulta en el recuadro.'
      );
      return;
    }
    setSpeechWarning(null);
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <section className={styles.searchWrapper} aria-label="Buscador de contenidos">
      <div className={styles.globoConsulta}>
        <h2 className={styles.globoTitulo}>¿Qué quieres saber hoy?</h2>
      </div>

      <form onSubmit={handleSubmit} role="search" aria-label="Búsqueda por texto o voz">
        <div className={styles.inputCard}>
          <button
            type="submit"
            className={styles.iconBtn}
            aria-label="Buscar"
            title="Pulsar para buscar"
          >
            <img src={iconSearch} alt="" className={styles.searchIcon} aria-hidden="true" />
          </button>

          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Escribir o hablar"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onSearchChange(e.target.value);
            }}
            aria-label="Campo de búsqueda: escribir o hablar"
          />

          {inputValue.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className={`${styles.iconBtn} ${styles.clearBtn}`}
              aria-label="Borrar texto de búsqueda"
              title="Borrar búsqueda"
            >
              ✕
            </button>
          )}

          <button
            type="button"
            onClick={handleMicClick}
            className={`${styles.iconBtn} ${isListening ? styles.listeningActive : ''}`}
            aria-label={
              isListening
                ? 'Detener escucha por voz'
                : 'Activar búsqueda por voz mediante micrófono'
            }
            title={
              isSupported
                ? isListening
                  ? 'Escuchando... Pulsa para detener'
                  : 'Buscar por voz'
                : 'Reconocimiento de voz no soportado'
            }
          >
            <img src={iconMic} alt="" className={styles.micIcon} aria-hidden="true" />
          </button>
        </div>
      </form>

      {isListening && (
        <div className={styles.listeningFeedback} role="status" aria-live="polite">
          <span>🎙️ Escuchando... Habla ahora con claridad</span>
          <button
            type="button"
            onClick={stopListening}
            className={styles.iconBtn}
            aria-label="Detener escucha"
          >
            ⏹️
          </button>
        </div>
      )}

      {(speechError || speechWarning) && (
        <div className={styles.speechErrorAlert} role="alert">
          {speechError || speechWarning}
        </div>
      )}

      {searchQuery && (
        <div className={styles.activeSearchBadge} role="status">
          <span>
            Búsqueda activa: <strong>«{searchQuery}»</strong>
          </span>
          {typeof resultCount === 'number' && (
            <span>{resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}</span>
          )}
        </div>
      )}

      <div className={styles.homeIndicatorZone} aria-hidden="true">
        <div className={styles.homeIndicator} />
      </div>
    </section>
  );
};
