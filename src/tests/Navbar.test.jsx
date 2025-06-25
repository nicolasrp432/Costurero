import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const NavbarWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Componente Navbar', () => {
  beforeEach(() => {
    // Resetear scroll antes de cada test (por si acaso)
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });
  });

  it('renderiza el logo correctamente', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    expect(screen.getByText('El Costurero')).toBeInTheDocument();
  });

  it('renderiza los enlaces principales de navegación', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const enlaces = [
      'Inicio',
      'Servicios',
      'Proceso',
      'Galería',
      'Precios',
      'Nosotros',
      'Clases',
      'Contacto'
    ];
    enlaces.forEach(texto => {
      expect(screen.getAllByText(texto).length).toBeGreaterThan(0);
    });
  });

  it('abre el menú móvil al hacer click en el botón hamburguesa', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const botonHamburguesa = screen.getByRole('button', { name: /toggle menu/i });
    const hamburguesaDiv = botonHamburguesa.querySelector('.hamburger');
    expect(hamburguesaDiv).not.toHaveClass('active');
    fireEvent.click(botonHamburguesa);
    expect(hamburguesaDiv).toHaveClass('active');
  });

  it('cierra el menú móvil al hacer click en un enlace', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const botonHamburguesa = screen.getByRole('button', { name: /toggle menu/i });
    const hamburguesaDiv = botonHamburguesa.querySelector('.hamburger');
    fireEvent.click(botonHamburguesa);
    expect(hamburguesaDiv).toHaveClass('active');
    // Click en el enlace "Servicios" del menú móvil
    const serviciosLinks = screen.getAllByText('Servicios');
    fireEvent.click(serviciosLinks[1]);
    expect(hamburguesaDiv).not.toHaveClass('active');
  });
}); 