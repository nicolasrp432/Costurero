import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Gallery from '../../components/Gallery/Gallery';
import Button from '../../components/Button/Button';
import './Gallery.css';

const GalleryPage = () => {
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
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="gallery-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Galería de Trabajos</h1>
            <p>
              Descubre nuestra selección de proyectos realizados, desde transformaciones 
              y arreglos hasta confecciones a medida y creaciones exclusivas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <Gallery initialCategory="all" />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section gallery-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2>¿Te gustaría tener un trabajo similar?</h2>
            <p>
              En El Costurero podemos ayudarte a hacer realidad tu visión. Ya sea para una 
              ocasión especial, una transformación de una prenda favorita o un proyecto 
              completamente personalizado.
            </p>
            <div className="cta-buttons">
              <Button to="/contacto" size="large">Contactar Ahora</Button>
              <Button to="/servicios" type="outline" size="large">Ver Servicios</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
