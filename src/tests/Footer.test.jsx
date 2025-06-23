import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const FooterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Footer Component', () => {
  it('renders the company name', () => {
    render(<Footer />, { wrapper: FooterWrapper });
    expect(screen.getByText(/el costurero/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />, { wrapper: FooterWrapper });
    // Test for common contact elements - adjust these based on your actual footer content
    expect(screen.getByText(/contacto/i)).toBeInTheDocument();
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />, { wrapper: FooterWrapper });
    // Test for social media links - adjust these based on your actual footer content
    const socialLinks = screen.getAllByRole('link', { name: /facebook|instagram|twitter/i });
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    render(<Footer />, { wrapper: FooterWrapper });
    const expectedLinks = [
      'Inicio',
      'Servicios',
      'Proceso',
      'Galería',
      'Precios',
      'Nosotros',
      'Contacto'
    ];

    expectedLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  it('renders the copyright notice', () => {
    render(<Footer />, { wrapper: FooterWrapper });
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}.*el costurero`, 'i'))).toBeInTheDocument();
  });

  it('renders address information', () => {
    render(<Footer />, { wrapper: FooterWrapper });
    // Test for address information - adjust based on your actual footer content
    const addressSection = screen.getByRole('contentinfo');
    expect(addressSection).toBeInTheDocument();
    expect(screen.getByText(/dirección/i)).toBeInTheDocument();
  });

  it('renders business hours', () => {
    render(<Footer />, { wrapper: FooterWrapper });
    // Test for business hours - adjust based on your actual footer content
    expect(screen.getByText(/horario/i)).toBeInTheDocument();
  });
}); 