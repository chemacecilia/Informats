import { useState, useMemo, useCallback } from 'react';
import type { Noticia, Categoria } from '../types';
import { NOTICIAS_INICIALES } from '../data/noticias';
import { getStoredLikes, saveStoredLikes } from '../services/storage';
import { normalizeText } from '../utils/normalize';

export interface UseNewsFilterReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTopics: Categoria[];
  toggleTopic: (topic: Categoria) => void;
  clearTopics: () => void;
  resetAll: () => void;
  filteredNews: Noticia[];
  likedMap: Record<string, boolean>;
  likeCounts: Record<string, number>;
  toggleLike: (newsId: string) => void;
  isFiltered: boolean;
}

export function useNewsFilter(): UseNewsFilterReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<Categoria[]>([]);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(getStoredLikes);

  const toggleTopic = useCallback((topic: Categoria) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }, []);

  const clearTopics = useCallback(() => {
    setSelectedTopics([]);
  }, []);

  const resetAll = useCallback(() => {
    setSearchQuery('');
    setSelectedTopics([]);
  }, []);

  const toggleLike = useCallback((newsId: string) => {
    setLikedMap((prev) => {
      const isCurrentlyLiked = Boolean(prev[newsId]);
      const next = {
        ...prev,
        [newsId]: !isCurrentlyLiked,
      };
      saveStoredLikes(next);
      return next;
    });
  }, []);

  const likeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of NOTICIAS_INICIALES) {
      const isLiked = Boolean(likedMap[item.id]);
      counts[item.id] = item.likesIniciales + (isLiked ? 1 : 0);
    }
    return counts;
  }, [likedMap]);

  const filteredNews = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);

    return NOTICIAS_INICIALES.filter((noticia) => {
      // Filtro por temas
      if (selectedTopics.length > 0) {
        const matchesTopic = noticia.categorias.some((cat) => selectedTopics.includes(cat));
        if (!matchesTopic) return false;
      }

      // Filtro por búsqueda de texto
      if (normalizedQuery) {
        const titleMatch = normalizeText(noticia.titulo).includes(normalizedQuery);
        const summaryMatch = normalizeText(noticia.resumenSencillo).includes(normalizedQuery);
        const contentMatch = normalizeText(noticia.contenido).includes(normalizedQuery);
        const catMatch = noticia.categorias.some((cat) =>
          normalizeText(cat).includes(normalizedQuery)
        );

        if (!titleMatch && !summaryMatch && !contentMatch && !catMatch) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTopics]);

  const isFiltered = Boolean(searchQuery.trim() || selectedTopics.length > 0);

  return {
    searchQuery,
    setSearchQuery,
    selectedTopics,
    toggleTopic,
    clearTopics,
    resetAll,
    filteredNews,
    likedMap,
    likeCounts,
    toggleLike,
    isFiltered,
  };
}
