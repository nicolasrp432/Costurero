import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

// Mock window.scrollY
const mockScroll = (scrollY) => {
  Object.defineProperty(window, 'scrollY', {
    value: scrollY,
    writable: true
  });
};

// Wrapper component for Router context
const NavbarWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    mockScroll(0);
  });

  it('renders the logo text correctly', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    expect(screen.getByText('El Costurero')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const expectedLinks = [
      'Inicio',
      'Servicios',
      'Proceso',
      'Galería',
      'Precios',
      'Nosotros',
      'Calendario',
      'Contacto'
    ];

    expectedLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  it('toggles mobile menu when hamburger is clicked', async () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const hamburger = screen.getByRole('button', { name: /toggle menu/i }) || 
                     document.querySelector('.hamburger');
    
    // Initial state - menu should be closed
    expect(hamburger).not.toHaveClass('active');
    
    // Click to open menu
    fireEvent.click(hamburger);
    expect(hamburger).toHaveClass('active');
    
    // Click to close menu
    fireEvent.click(hamburger);
    expect(hamburger).not.toHaveClass('active');
  });

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const hamburger = screen.getByRole('button', { name: /toggle menu/i }) || 
                     document.querySelector('.hamburger');
    
    // Open menu
    fireEvent.click(hamburger);
    expect(hamburger).toHaveClass('active');
    
    // Click a link
    fireEvent.click(screen.getByText('Servicios'));
    expect(hamburger).not.toHaveClass('active');
  });

  it('adds scrolled class when window is scrolled down', async () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const navbar = document.querySelector('.navbar');
    
    // Initial state
    expect(navbar).not.toHaveClass('scrolled');
    
    // Simulate scroll
    mockScroll(51);
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
    
    await waitFor(() => {
      expect(navbar).toHaveClass('scrolled');
    });
  });

  it('removes scrolled class when window is scrolled back to top', async () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const navbar = document.querySelector('.navbar');
    
    // Scroll down first
    mockScroll(51);
    window.dispatchEvent(new Event('scroll'));
    
    await waitFor(() => {
      expect(navbar).toHaveClass('scrolled');
    });
    
    // Scroll back up
    mockScroll(0);
    window.dispatchEvent(new Event('scroll'));
    
    await waitFor(() => {
      expect(navbar).not.toHaveClass('scrolled');
    });
  });

  it('renders contact button with special styling', () => {
    render(<Navbar />, { wrapper: NavbarWrapper });
    const contactLink = screen.getByText('Contacto');
    expect(contactLink).toHaveClass('contact-btn');
  });
}); 