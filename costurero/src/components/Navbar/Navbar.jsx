import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking on a link
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            <h1>El Costurero</h1>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/servicios" className={({ isActive }) => isActive ? 'active' : ''}>
                Servicios
              </NavLink>
            </li>
            <li>
              <NavLink to="/proceso" className={({ isActive }) => isActive ? 'active' : ''}>
                Proceso
              </NavLink>
            </li>
            <li>
              <NavLink to="/galeria" className={({ isActive }) => isActive ? 'active' : ''}>
                Galería
              </NavLink>
            </li>
            <li>
              <NavLink to="/precios" className={({ isActive }) => isActive ? 'active' : ''}>
                Precios
              </NavLink>
            </li>
            <li>
              <NavLink to="/nosotros" className={({ isActive }) => isActive ? 'active' : ''}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className="contact-btn">
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav 
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="mobile-nav-links">
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink to="/" onClick={closeMenu}>
                    Inicio
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <NavLink to="/servicios" onClick={closeMenu}>
                    Servicios
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <NavLink to="/proceso" onClick={closeMenu}>
                    Proceso
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <NavLink to="/galeria" onClick={closeMenu}>
                    Galería
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <NavLink to="/precios" onClick={closeMenu}>
                    Precios
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <NavLink to="/nosotros" onClick={closeMenu}>
                    Nosotros
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <NavLink to="/contacto" onClick={closeMenu} className="mobile-contact-btn">
                    Contacto
                  </NavLink>
                </motion.li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
