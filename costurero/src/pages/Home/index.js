import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../../components/Hero/Hero';
import Testimonials from '../../components/Testimonials/Testimonials';
import Button from '../../components/Button/Button';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section */}
      <section className="section why-choose-us">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Por qué elegirnos</h2>
            <p className="section-subtitle">
              En El Costurero somos apasionados por la confección de calidad y la atención personalizada
            </p>
          </motion.div>

          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Calidad Artesanal</h3>
              <p>
                Cada pieza que confeccionamos y cada arreglo que realizamos lleva la dedicación y el cuidado 
                de un equipo con años de experiencia en la alta costura.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <div className="feature-icon">
                <i className="fas fa-tshirt"></i>
              </div>
              <h3>Personalización</h3>
              <p>
                Adaptamos cada prenda a tus medidas exactas y preferencias personales, garantizando 
                que cada pieza sea única y perfecta para ti.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Experiencia</h3>
              <p>
                Más de 15 años en el sector nos avalan, aplicando técnicas tradicionales combinadas 
                con las últimas tendencias en moda y confección.
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.3 }}}
            >
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Sostenibilidad</h3>
              <p>
                Comprometidos con el medio ambiente, fomentamos la reutilización y transformación 
                de prendas, reduciendo el impacto ambiental de la moda.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="section services-carousel">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Descubre todo lo que podemos hacer para ti en nuestro taller
            </p>
          </motion.div>

          <div className="services-grid">
            <motion.div 
              className="service-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="service-image">
                <img src="/path-to-image/arreglos.jpg" alt="Arreglos y Transformaciones" />
                <div className="service-overlay">
                  <Button to="/servicios#arreglos" type="white-outline">Ver Más</Button>
                </div>
              </div>
              <h3>Arreglos y Transformaciones</h3>
              <p>
                Adaptamos tus prendas favoritas, dándoles una nueva vida y ajustándolas perfectamente a ti.
              </p>
            </motion.div>

            <motion.div 
              className="service-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.1 }}}
            >
              <div className="service-image">
                <img src="/path-to-image/confeccion.jpg" alt="Confección a Medida" />
                <div className="service-overlay">
                  <Button to="/servicios#confeccion" type="white-outline">Ver Más</Button>
                </div>
              </div>
              <h3>Confección a Medida</h3>
              <p>
                Creamos prendas únicas diseñadas y confeccionadas específicamente para ti.
              </p>
            </motion.div>

            <motion.div 
              className="service-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.2 }}}
            >
              <div className="service-image">
                <img src="/path-to-image/novia.jpg" alt="Novia e Invitada" />
                <div className="service-overlay">
                  <Button to="/servicios#novia" type="white-outline">Ver Más</Button>
                </div>
              </div>
              <h3>Novia e Invitada</h3>
              <p>
                Vestidos espectaculares para los momentos más especiales, con un acabado impecable.
              </p>
            </motion.div>

            <motion.div 
              className="service-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{...fadeInUp, transition: { duration: 0.6, delay: 0.3 }}}
            >
              <div className="service-image">
                <img src="/path-to-image/hogar.jpg" alt="Textil Hogar" />
                <div className="service-overlay">
                  <Button to="/servicios#hogar" type="white-outline">Ver Más</Button>
                </div>
              </div>
              <h3>Textil Hogar</h3>
              <p>
                Cortinas, cojines y todo tipo de complementos textiles para tu hogar.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-5">
            <Button to="/servicios" size="large">Ver Todos Los Servicios</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <section className="section cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>
              Contáctanos hoy mismo para solicitar un presupuesto sin compromiso o concertar una cita 
              en nuestro taller. Estaremos encantados de ayudarte a hacer realidad tu visión.
            </p>
            <div className="cta-buttons">
              <Button to="/contacto" size="large">Solicitar Presupuesto</Button>
              <Button to="/contacto#cita" type="outline" size="large">Concertar Cita</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
