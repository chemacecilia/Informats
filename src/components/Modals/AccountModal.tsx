import React from 'react';
import { AccessibleDialog } from '../AccessibleDialog/AccessibleDialog';
import { getStoredUser } from '../../services/storage';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedLikesCount: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  savedLikesCount,
}) => {
  const user = getStoredUser();

  return (
    <AccessibleDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Mi cuenta"
      footer={
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
          aria-label="Entendido"
        >
          Entendido
        </button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: '#eaf0e8',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-green)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 600,
            }}
            aria-hidden="true"
          >
            {user.nombre.charAt(0)}
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-primary-green)' }}>
              {user.nombre}
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>{user.email}</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-primary-green)' }}>
            Actividad en Informats
          </h4>
          <p style={{ fontSize: '16px', color: 'var(--color-text-dark)' }}>
            Noticias marcadas con «Me gusta»: <strong>{savedLikesCount}</strong>
          </p>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Tus «me gusta» y preferencias de lectura se guardan de forma segura en este dispositivo.
          </p>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
          Información contextual: esta vista previa confirma tu sesión sin interrumpir la lectura ni salir de la pantalla principal.
        </p>
      </div>
    </AccessibleDialog>
  );
};
