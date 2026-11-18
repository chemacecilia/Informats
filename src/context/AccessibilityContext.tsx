import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { PreferenciasAccesibilidad, TamanoLetra } from '../types';
import {
  getStoredAccessibility,
  saveStoredAccessibility,
  DEFAULT_PREFERENCIAS,
} from '../services/storage';

interface AccessibilityContextType extends PreferenciasAccesibilidad {
  setTamanoLetra: (tamano: TamanoLetra) => void;
  setAltoContraste: (activado: boolean) => void;
  setLecturaAsistida: (activada: boolean) => void;
  setVelocidadVoz: (velocidad: number) => void;
  restablecerAjustes: () => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferencias, setPreferencias] = useState<PreferenciasAccesibilidad>(getStoredAccessibility);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    saveStoredAccessibility(preferencias);

    const root = document.documentElement;
    root.setAttribute('data-tamano-letra', preferencias.tamanoLetra);
    root.setAttribute('data-alto-contraste', preferencias.altoContraste ? 'true' : 'false');

    if (preferencias.altoContraste) {
      document.body.classList.add('alto-contraste');
    } else {
      document.body.classList.remove('alto-contraste');
    }

    document.body.classList.remove('letra-mediana', 'letra-grande', 'letra-muy-grande');
    if (preferencias.tamanoLetra === 'mediana') {
      document.body.classList.add('letra-mediana');
    } else if (preferencias.tamanoLetra === 'muy_grande') {
      document.body.classList.add('letra-muy-grande');
    } else {
      document.body.classList.add('letra-grande');
    }
  }, [preferencias]);

  const setTamanoLetra = useCallback((tamanoLetra: TamanoLetra) => {
    setPreferencias((prev) => ({ ...prev, tamanoLetra }));
  }, []);

  const setAltoContraste = useCallback((altoContraste: boolean) => {
    setPreferencias((prev) => ({ ...prev, altoContraste }));
  }, []);

  const setLecturaAsistida = useCallback((lecturaAsistida: boolean) => {
    setPreferencias((prev) => ({ ...prev, lecturaAsistida }));
  }, []);

  const setVelocidadVoz = useCallback((velocidadVoz: number) => {
    setPreferencias((prev) => ({ ...prev, velocidadVoz }));
  }, []);

  const restablecerAjustes = useCallback(() => {
    setPreferencias(DEFAULT_PREFERENCIAS);
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!preferencias.lecturaAsistida) return;
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = preferencias.velocidadVoz;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [preferencias.lecturaAsistida, preferencias.velocidadVoz]
  );

  return (
    <AccessibilityContext.Provider
      value={{
        ...preferencias,
        setTamanoLetra,
        setAltoContraste,
        setLecturaAsistida,
        setVelocidadVoz,
        restablecerAjustes,
        speak,
        stopSpeech,
        isSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe utilizarse dentro de AccessibilityProvider');
  }
  return context;
}
