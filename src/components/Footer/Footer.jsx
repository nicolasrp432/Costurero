import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="footer-title">El Costurero</h3>
            <p>
              Taller de costura y confección profesional con años de experiencia creando piezas únicas 
              y ofreciendo servicios de la más alta calidad para nuestros clientes.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3 className="footer-title">Enlaces rápidos</h3>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/proceso">Proceso</Link></li>
              <li><Link to="/galeria">Galería</Link></li>
              <li><Link to="/precios">Precios</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer-section services">
            <h3 className="footer-title">Nuestros servicios</h3>
            <ul>
              <li><Link to="/servicios#arreglos">Arreglos y Transformaciones</Link></li>
              <li><Link to="/servicios#confeccion">Confección a Medida</Link></li>
              <li><Link to="/servicios#novia">Novia e Invitada</Link></li>
              <li><Link to="/servicios#abrigos">Abrigos de Piel</Link></li>
              <li><Link to="/servicios#uniformes">Uniformes y Batas</Link></li>
              <li><Link to="/servicios#fiesta">Trajes de Fiesta</Link></li>
              <li><Link to="/servicios#hogar">Textil Hogar</Link></li>
              <li><Link to="/servicios#clases">Clases de Patronaje</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3 className="footer-title">Contacto</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Dirección: Calle Ejemplo 123, 28000 Madrid</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+34 91 123 45 67</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>info@elcosturero.es</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Horario: Lun-Vie: 10:00-19:00, Sáb: 10:00-14:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} El Costurero. Todos los derechos reservados.</p>
            <div className="footer-bottom-links">
              <Link to="/privacidad">Política de Privacidad</Link>
              <Link to="/terminos">Términos y Condiciones</Link>
              <Link to="/cookies">Política de Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
