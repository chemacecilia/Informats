import { useState, useEffect, useCallback, useRef } from 'react';

// Declaración de tipos para SpeechRecognition en navegadores que la implementan
interface SpeechRecognitionEventLike extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionLike, ev: SpeechRecognitionEventLike) => void) | null;
  onerror: ((this: SpeechRecognitionLike, ev: SpeechRecognitionErrorEventLike) => void) | null;
  onend: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(onResult?: (text: string) => void): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isSupported =
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    const recognition = new SpeechRec();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const resultText = event.results[0]?.[0]?.transcript ?? '';
      setTranscript(resultText);
      if (onResult && resultText) {
        onResult(resultText);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
      let friendlyError = 'Ocurrió un error con el micrófono.';
      if (event.error === 'not-allowed') {
        friendlyError = 'Permiso denegado para usar el micrófono. Actívalo en tu navegador.';
      } else if (event.error === 'no-speech') {
        friendlyError = 'No se detectó voz. Por favor, inténtalo de nuevo.';
      } else if (event.error === 'network') {
        friendlyError = 'Error de conexión al procesar el reconocimiento de voz.';
      }
      setError(friendlyError);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // Ignorar si ya estaba cerrado
      }
    };
  }, [isSupported, onResult]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('El reconocimiento de voz no es compatible con este navegador.');
      return;
    }
    setError(null);
    setTranscript('');
    try {
      recognitionRef.current?.start();
    } catch (err) {
      console.warn('Error starting speech recognition:', err);
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignorar
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}
