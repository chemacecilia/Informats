import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IncibeFooter } from './IncibeFooter';

describe('IncibeFooter component', () => {
  it('renders institutional information and contact details', () => {
    render(<IncibeFooter />);

    expect(screen.getByText('INCIBE')).toBeInTheDocument();
    expect(
      screen.getByText('Instituto Nacional de Ciberseguridad')
    ).toBeInTheDocument();
    expect(screen.getByText('¿Necesitas ayuda en internet?')).toBeInTheDocument();
    expect(
      screen.getByText(/Orientación ante fraudes, mensajes sospechosos/i)
    ).toBeInTheDocument();
  });

  it('renders phone link with tel:017', () => {
    render(<IncibeFooter />);

    const phoneLink = screen.getByRole('link', { name: /llamar al/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:017');
  });

  it('renders link to incibe.es with target blank and rel security attributes', () => {
    render(<IncibeFooter />);

    const incibeLink = screen.getByRole('link', { name: /incibe\.es/i });
    expect(incibeLink).toHaveAttribute('href', 'https://www.incibe.es/linea-de-ayuda-en-ciberseguridad');
    expect(incibeLink).toHaveAttribute('target', '_blank');
    expect(incibeLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
