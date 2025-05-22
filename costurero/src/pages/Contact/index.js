import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ContactForm from '../../components/ContactForm/ContactForm';
import Button from '../../components/Button/Button';
import './Contact.css';

const Contact = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('general');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if there's a hash in the URL and set the active tab accordingly
    if (location.hash) {
      const hash = location.hash.substring(1); // Remove the '#' character
      if (['cita', 'tracking', 'clases'].includes(hash)) {
        setActiveTab(hash === 'cita' ? 'appointment' : hash);
      }
      
      // Scroll to the contact form section
      setTimeout(() => {
        const element = document.getElementById('contact-tabs');
        if (element) {
          const yOffset = -100; // Adjust this value as needed
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Contacto</h1>
            <p>
              Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier 
              consulta, presupuesto o cita que necesites.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <motion.div 
              className="contact-info-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="contact-info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Dirección</h3>
              <p>Calle Ejemplo 123<br />28000 Madrid, España</p>
              <a 
                href="https://maps.google.com/?q=Calle+Ejemplo+123+Madrid+España" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-info-link"
              >
                Ver en Google Maps
              </a>
            </motion.div>

            <motion.div 
              className="contact-info-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <div className="contact-info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3>Teléfono</h3>
              <p>+34 91 123 45 67<br />+34 600 123 456</p>
              <a 
                href="tel:+34911234567" 
                className="contact-info-link"
              >
                Llamar ahora
              </a>
            </motion.div>

            <motion.div 
              className="contact-info-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="contact-info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>info@elcosturero.es<br />citas@elcosturero.es</p>
              <a 
                href="mailto:info@elcosturero.es" 
                className="contact-info-link"
              >
                Enviar email
              </a>
            </motion.div>

            <motion.div 
              className="contact-info-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.3 }}}
            >
              <div className="contact-info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Horario</h3>
              <p>Lun-Vie: 10:00-19:00<br />Sáb: 10:00-14:00</p>
              <a 
                href="#cita" 
                className="contact-info-link"
                onClick={() => handleTabChange('appointment')}
              >
                Reservar cita
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          {/* This would be replaced with an actual Google Maps embed */}
          <div className="map-placeholder">
            <div className="map-overlay"></div>
            <div className="map-content">
              <h3>¡Encuéntranos aquí!</h3>
              <p>Puedes visitarnos en nuestra ubicación física o contactarnos a través de nuestros canales digitales.</p>
              <a 
                href="https://maps.google.com/?q=Calle+Ejemplo+123+Madrid+España" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="map-btn"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Envíanos un mensaje</h2>
            <p className="section-subtitle">
              Estamos aquí para responder todas tus preguntas y ayudarte con tus necesidades
            </p>
          </motion.div>

          {/* Contact Tabs */}
          <div id="contact-tabs" className="contact-tabs">
            <div className="tabs-header">
              <button 
                className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => handleTabChange('general')}
              >
                <i className="fas fa-envelope"></i>
                <span>Contacto General</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'appointment' ? 'active' : ''}`}
                onClick={() => handleTabChange('appointment')}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>Solicitar Cita</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'tracking' ? 'active' : ''}`}
                onClick={() => handleTabChange('tracking')}
              >
                <i className="fas fa-search"></i>
                <span>Seguimiento</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'clases' ? 'active' : ''}`}
                onClick={() => handleTabChange('clases')}
              >
                <i className="fas fa-graduation-cap"></i>
                <span>Clases</span>
              </button>
            </div>

            <div className="tabs-content">
              <div className={`tab-panel ${activeTab === 'general' ? 'active' : ''}`}>
                <div className="tab-panel-content">
                  <div className="form-intro">
                    <h3>Contacto General</h3>
                    <p>Utiliza este formulario para cualquier consulta general sobre nuestros servicios, precios o disponibilidad.</p>
                  </div>
                  <ContactForm type="general" />
                </div>
              </div>

              <div className={`tab-panel ${activeTab === 'appointment' ? 'active' : ''}`}>
                <div className="tab-panel-content">
                  <div className="form-intro">
                    <h3>Solicitar Cita</h3>
                    <p>Reserva una cita con nuestros profesionales para la toma de medidas, consultas personalizadas o pruebas.</p>
                  </div>
                  <ContactForm type="appointment" />
                </div>
              </div>

              <div className={`tab-panel ${activeTab === 'tracking' ? 'active' : ''}`}>
                <div className="tab-panel-content">
                  <div className="form-intro">
                    <h3>Seguimiento de Pedidos</h3>
                    <p>Consulta el estado de tu pedido o proyecto utilizando el número de referencia que te proporcionamos.</p>
                  </div>
                  <ContactForm type="tracking" />
                </div>
              </div>

              <div className={`tab-panel ${activeTab === 'clases' ? 'active' : ''}`}>
                <div className="tab-panel-content">
                  <div className="form-intro">
                    <h3>Información sobre Clases</h3>
                    <p>Solicita información sobre nuestras clases de patronaje y costura, horarios, precios y disponibilidad.</p>
                  </div>
                  <ContactForm type="general" />
                  
                  <div className="clases-info">
                    <h4>Horarios de Clases</h4>
                    <div className="clases-schedule">
                      <div className="schedule-item">
                        <div className="schedule-day">Lunes y Miércoles</div>
                        <div className="schedule-time">17:00 - 19:00</div>
                        <div className="schedule-level">Nivel Principiante</div>
                      </div>
                      <div className="schedule-item">
                        <div className="schedule-day">Martes y Jueves</div>
                        <div className="schedule-time">10:00 - 12:00</div>
                        <div className="schedule-level">Nivel Intermedio</div>
                      </div>
                      <div className="schedule-item">
                        <div className="schedule-day">Martes y Jueves</div>
                        <div className="schedule-time">18:00 - 20:00</div>
                        <div className="schedule-level">Nivel Avanzado</div>
                      </div>
                      <div className="schedule-item">
                        <div className="schedule-day">Sábados</div>
                        <div className="schedule-time">10:00 - 13:00</div>
                        <div className="schedule-level">Taller Libre</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-media-section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Síguenos en redes sociales</h2>
            <p className="section-subtitle">
              Mantente al día con nuestras últimas creaciones, consejos y noticias
            </p>
          </motion.div>

          <div className="social-media-links">
            <motion.a 
              href="https://facebook.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </motion.a>
            
            <motion.a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </motion.a>
            
            <motion.a 
              href="https://pinterest.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <i className="fab fa-pinterest-p"></i>
              <span>Pinterest</span>
            </motion.a>
            
            <motion.a 
              href="https://youtube.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.3 }}}
            >
              <i className="fab fa-youtube"></i>
              <span>YouTube</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <motion.div 
              className="newsletter-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2>Suscríbete a nuestra newsletter</h2>
              <p>
                Recibe noticias sobre nuestras ofertas especiales, nuevos servicios y 
                consejos exclusivos sobre moda y cuidado de prendas.
              </p>
            </motion.div>

            <motion.div 
              className="newsletter-form"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <form>
                <input 
                  type="email" 
                  placeholder="Tu dirección de email" 
                  required 
                />
                <Button type="secondary">Suscribirse</Button>
              </form>
              <p className="privacy-notice">
                Al suscribirte, aceptas nuestra <a href="/privacidad">Política de Privacidad</a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
