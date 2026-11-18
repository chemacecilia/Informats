import type { PreferenciasAccesibilidad, UsuarioDemo } from '../types';

const LIKES_STORAGE_KEY = 'informats_liked_news_v1';
const ACCESSIBILITY_STORAGE_KEY = 'informats_accessibility_v1';
const USER_STORAGE_KEY = 'informats_user_v1';

export const DEFAULT_PREFERENCIAS: PreferenciasAccesibilidad = {
  tamanoLetra: 'grande',
  altoContraste: false,
  lecturaAsistida: true,
  velocidadVoz: 0.9,
};

export const DEFAULT_USER: UsuarioDemo = {
  id: 'usr-demo-01',
  nombre: 'Carmen Martínez',
  email: 'carmen.martinez@ejemplo.es',
  noticiasGuardadas: ['noticia-01'],
};

export function getStoredLikes(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (err) {
    console.warn('Error reading likes from localStorage:', err);
    return {};
  }
}

export function saveStoredLikes(likes: Record<string, boolean>): void {
  try {
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes));
  } catch (err) {
    console.warn('Error saving likes to localStorage:', err);
  }
}

export function getStoredAccessibility(): PreferenciasAccesibilidad {
  try {
    const raw = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCIAS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PREFERENCIAS,
      ...parsed,
    };
  } catch (err) {
    console.warn('Error reading accessibility from localStorage:', err);
    return DEFAULT_PREFERENCIAS;
  }
}

export function saveStoredAccessibility(prefs: PreferenciasAccesibilidad): void {
  try {
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.warn('Error saving accessibility to localStorage:', err);
  }
}

export function getStoredUser(): UsuarioDemo {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return DEFAULT_USER;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_USER,
      ...parsed,
    };
  } catch (err) {
    console.warn('Error reading user from localStorage:', err);
    return DEFAULT_USER;
  }
}

export function saveStoredUser(user: UsuarioDemo): void {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.warn('Error saving user to localStorage:', err);
  }
}
