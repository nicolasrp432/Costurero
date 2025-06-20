import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from '../components/ContactForm/ContactForm';

describe('ContactForm', () => {
  it('envía el formulario correctamente y muestra mensaje de éxito', async () => {
    render(<ContactForm />);

    // Completa los campos obligatorios
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'juan@email.com' } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: 'Consulta' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: '¡Hola! Quiero información.' } });

    // Acepta la política de privacidad
    fireEvent.click(screen.getByLabelText(/política de privacidad/i));

    // Envía el formulario
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // Espera a que aparezca el mensaje de éxito
    await waitFor(() =>
      expect(screen.getByText(/mensaje enviado correctamente/i)).toBeInTheDocument()
    );
  });
});
