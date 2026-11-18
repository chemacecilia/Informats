import React from 'react';
import styles from './IncibeFooter.module.css';
import iconPhone from '../../assets/icon-phone.svg';

export const IncibeFooter: React.FC = () => {
  return (
    <footer className={styles.footerContainer} role="contentinfo" aria-label="Información institucional de INCIBE">
      <h2 className={styles.incibeTitle}>INCIBE</h2>
      <p className={styles.incibeSubtitle}>Instituto Nacional de Ciberseguridad</p>

      <h3 className={styles.helpQuestion}>¿Necesitas ayuda en internet?</h3>
      <p className={styles.helpDescription}>
        Orientación ante fraudes, mensajes sospechosos y dudas de seguridad digital.
      </p>

      <a
        href="tel:017"
        className={styles.callButton}
        aria-label="Llamar al 017 - teléfono gratuito de ciberseguridad"
      >
        <img src={iconPhone} alt="" className={styles.phoneIcon} aria-hidden="true" />
        <span>Llamar al 017</span>
      </a>

      <div className={styles.serviceInfo}>
        <p>Servicio gratuito y confidencial.</p>
        <p>Todos los días, de 8:00 a 23:00.</p>
        <p>No es un teléfono de emergencias.</p>
      </div>

      <a
        href="https://www.incibe.es/linea-de-ayuda-en-ciberseguridad"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.moreInfoLink}
        aria-label="Más información en el sitio oficial de incibe.es (se abre en nueva pestaña)"
      >
        Más información en incibe.es
      </a>
    </footer>
  );
};
