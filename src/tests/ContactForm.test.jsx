import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

    // Envía el formulario (ajustar el texto del botón según el formulario)
    // El botón puede decir 'Enviar Mensaje', 'Solicitar Cita', etc.
    const submitButton = screen.getByRole('button', { name: /enviar mensaje|enviar|solicitar cita|consultar estado/i });
    fireEvent.click(submitButton);

    // Espera a que aparezca el mensaje de éxito
    await waitFor(() =>
      expect(screen.getByText(/Mensaje enviado correctamente. Nos pondremos en contacto contigo a la mayor brevedad./i)).toBeInTheDocument()
    );
  });
});
