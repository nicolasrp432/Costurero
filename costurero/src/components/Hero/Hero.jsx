import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import './Hero.css';


// Hero background image will need to be added to your assets folder
const Hero = () => {
  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="./src/assets/hero-video.mp4" type="video/mp4" />
        {/* Add additional source elements for different video formats if needed */}
      </video>
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transformamos tus ideas en piezas únicas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Taller de costura y confección profesional con años de experiencia y dedicación a la artesanía textil de alta calidad
          </motion.p>
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button to="/servicios" size="large">Nuestros Servicios</Button>
            <Button to="/contacto" type="outline" size="large">Solicitar Presupuesto</Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-scroll-indicator">
        <motion.div 
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5 
          }}
        >
          <i className="fas fa-chevron-down"></i>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
