import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div 
          className="not-found-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="not-found-icon">
            <span>404</span>
          </div>
          <h1>Página no encontrada</h1>
          <p>
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
            Te invitamos a volver a nuestra página de inicio o explorar nuestros servicios.
          </p>
          <div className="not-found-actions">
            <Button to="/" type="primary" size="large">Volver al Inicio</Button>
            <Button to="/servicios" type="outline" size="large">Ver Nuestros Servicios</Button>
          </div>

          <div className="quick-links">
            <h3>Enlaces rápidos</h3>
            <div className="links-grid">
              <Link to="/servicios" className="quick-link">
                <i className="fas fa-scissors"></i>
                <span>Servicios</span>
              </Link>
              <Link to="/proceso" className="quick-link">
                <i className="fas fa-tasks"></i>
                <span>Proceso</span>
              </Link>
              <Link to="/galeria" className="quick-link">
                <i className="fas fa-images"></i>
                <span>Galería</span>
              </Link>
              <Link to="/precios" className="quick-link">
                <i className="fas fa-tag"></i>
                <span>Precios</span>
              </Link>
              <Link to="/contacto" className="quick-link">
                <i className="fas fa-envelope"></i>
                <span>Contacto</span>
              </Link>
              <Link to="/nosotros" className="quick-link">
                <i className="fas fa-user-friends"></i>
                <span>Nosotros</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
