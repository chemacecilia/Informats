import React from 'react';
import styles from './Header.module.css';
import iconAccessibility from '../../assets/icon-accessibility.svg';
import iconAccount from '../../assets/icon-account.svg';
import iconArrowLeft from '../../assets/icon-arrow-left.svg';

interface HeaderProps {
  onOpenAccessibility: () => void;
  onOpenAccount: () => void;
  onVolver?: () => void;
  showVolver?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAccessibility,
  onOpenAccount,
  onVolver,
  showVolver = true,
}) => {
  const handleVolverClick = () => {
    if (onVolver) {
      onVolver();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={styles.headerContainer} role="banner">
      <div className={styles.topRow}>
        <button
          type="button"
          onClick={handleLogoClick}
          className={styles.logoButton}
          aria-label="Informats - Inicio"
        >
          Informats
        </button>

        <div className={styles.actionsGroup}>
          <button
            type="button"
            onClick={onOpenAccessibility}
            className={styles.headerActionBtn}
            aria-label="Abrir panel de opciones de accesibilidad"
          >
            <img src={iconAccessibility} alt="" className={styles.actionIcon} aria-hidden="true" />
            <span className={styles.actionLabel}>Accesibilidad</span>
          </button>

          <button
            type="button"
            onClick={onOpenAccount}
            className={styles.headerActionBtn}
            aria-label="Abrir información de mi cuenta"
          >
            <img src={iconAccount} alt="" className={styles.actionIcon} aria-hidden="true" />
            <span className={styles.actionLabel}>Cuenta</span>
          </button>
        </div>
      </div>

      <div className={styles.separator} role="separator" />

      {showVolver && (
        <div className={styles.volverRow}>
          <button
            type="button"
            onClick={handleVolverClick}
            className={styles.volverButton}
            aria-label="Volver a la vista anterior o arriba"
          >
            <img src={iconArrowLeft} alt="" className={styles.volverIcon} aria-hidden="true" />
            <span>Volver</span>
          </button>
        </div>
      )}
    </header>
  );
};
